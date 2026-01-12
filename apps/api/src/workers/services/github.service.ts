
import { Injectable, Logger } from '@nestjs/common';
import { Maybe } from 'src/generated/graphql';

export interface GitHubFetchConfig {
  repository: string;
  branch?: string;
}

export interface GitHubCommitAuthor {
  name: string;
  email: string;
  date: string;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    author: GitHubCommitAuthor;
    message: string;
  };
  html_url: string;
}

export interface GitHubCommitsApiResponse extends Array<GitHubCommit> {}

export interface CommitData {
  sha: string;
  author: string;
  message: string;
  url: string;
  date: string;
}

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private readonly REQUEST_TIMEOUT_MS = 10000;

  async fetchNewCommits(
    token: string,
    config: GitHubFetchConfig,
    lastTriggeredStr: Maybe<string> | undefined,
  ): Promise<CommitData[]> {
    const repo = config.repository;
    const branch = config.branch || 'main';

    const sinceDate = lastTriggeredStr
      ? new Date(lastTriggeredStr)
      : new Date(Date.now() - 5 * 60 * 1000);

    const sinceIso = sinceDate.toISOString();

    this.logger.log(`[GitHub] Fetching commits for ${repo} on ${branch} since ${sinceIso}`);

    try {
      const url = `https://api.github.com/repos/${repo}/commits?sha=${branch}&since=${sinceIso}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT_MS);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        this.logger.error(`GitHub API Error (${response.status}): ${errText}`);
        return [];
      }

      const data: GitHubCommitsApiResponse = await response.json();

      if (!Array.isArray(data) || data.length === 0) return [];

      const commits: CommitData[] = [];

      for (const item of data) {
        const commitDate = new Date(item.commit.author.date);
        if (commitDate.getTime() > sinceDate.getTime()) {
          commits.push({
            sha: item.sha,
            author: item.commit.author.name,
            message: item.commit.message,
            url: item.html_url,
            date: item.commit.author.date,
          });
        }
      }

      return commits;
    } catch (error) {
      if ((error as any)?.name === 'AbortError') {
        this.logger.error(`GitHub API request timed out after ${this.REQUEST_TIMEOUT_MS}ms for ${repo}`);
      } else {
        this.logger.error('Network error fetching GitHub commits:', error);
      }
      return [];
    }
  }

  async fetchNewPullRequests(
    token: string,
    repository: string,
    lastTriggeredStr: Maybe<string> | undefined,
  ): Promise<Array<{ number: number; title: string; body?: string | null; user: { login: string }; html_url: string; created_at: string }>> {
    const perPage = 50;
    const [owner, repo] = repository.split('/');
    if (!owner || !repo) {
      this.logger.error(`[GitHub] Invalid repository '${repository}'`);
      return [];
    }

    const sinceDate = lastTriggeredStr
      ? new Date(lastTriggeredStr)
      : new Date(Date.now() - 5 * 60 * 1000);
    const sinceIso = sinceDate.toISOString();

    this.logger.log(`[GitHub] Fetching pull requests for ${repository} since ${sinceIso}`);

    try {
      let page = 1;
      const found: Array<{ number: number; title: string; body?: string | null; user: { login: string }; html_url: string; created_at: string }> = [];

      while (true) {
        const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&sort=created&direction=asc&per_page=${perPage}&page=${page}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT_MS);

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          this.logger.error(`[GitHub] PRs fetch error ${res.status}: ${txt}`);
          break;
        }

        const data = (await res.json()) as any[];

        if (!Array.isArray(data) || data.length === 0) break;

        for (const item of data) {
          const createdAt = item.created_at;
          if (!createdAt) continue;

          if (new Date(createdAt).getTime() <= new Date(sinceIso).getTime()) {
            continue;
          }

          found.push({
            number: item.number,
            title: item.title,
            body: item.body ?? null,
            user: { login: item.user?.login },
            html_url: item.html_url,
            created_at: item.created_at,
          });
        }

        if (data.length < perPage) break;
        page += 1;
        if (page > 10) break;
      }

      found.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      return found;
    } catch (error) {
      if ((error as any)?.name === 'AbortError') {
        this.logger.error(`[GitHub] PRs request timed out after ${this.REQUEST_TIMEOUT_MS}ms for ${repository}`);
      } else {
        this.logger.error('[GitHub] Network error fetching PRs:', error);
      }
      return [];
    }
  }

  async createIssue(token: string, repository: string, title: string, body?: string): Promise<any> {
    const url = `https://api.github.com/repos/${repository}/issues`;
    const controller = new AbortController();
    const timeout = 10000;
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
        signal: controller.signal,
      });
      clearTimeout(id);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`GitHub API createIssue error ${res.status}: ${txt}`);
      }
      return await res.json();
    } catch (error) {
      if ((error as any)?.name === 'AbortError') {
        throw new Error(`GitHub createIssue timed out after ${timeout}ms`);
      }
      throw error;
    }
  }

  async createOrUpdateFile(
    token: string,
    repository: string,
    path: string,
    content: string,
    message: string,
    branch?: string,
  ): Promise<any> {
    const encodedPath = encodeURIComponent(path);
    const url = `https://api.github.com/repos/${repository}/contents/${encodedPath}`;
    const controller = new AbortController();
    const timeout = 10000;
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const getUrl = branch ? `${url}?ref=${encodeURIComponent(branch)}` : url;
      const getRes = await fetch(getUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        signal: controller.signal,
      });

      let sha: string | undefined;
      if (getRes.ok) {
        const existing = await getRes.json();
        sha = existing.sha;
      } else if (getRes.status === 404) {
      } else if (getRes.status === 401 || getRes.status === 403) {
        const txt = await getRes.text();
        throw new Error(`GitHub preflight failed (${getRes.status}): ${txt}`);
      }

      const body = {
        message,
        content: Buffer.from(content, 'utf8').toString('base64'),
        ...(branch ? { branch } : {}),
        ...(sha ? { sha } : {}),
      } as any;

      const putRes = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(id);

      if (!putRes.ok) {
        const txt = await putRes.text();
        throw new Error(`GitHub createOrUpdateFile error ${putRes.status}: ${txt}`);
      }

      return await putRes.json();
    } catch (error) {
      if ((error as any)?.name === 'AbortError') {
        throw new Error(`GitHub createOrUpdateFile timed out after ${timeout}ms`);
      }
      throw error;
    }
  }
}