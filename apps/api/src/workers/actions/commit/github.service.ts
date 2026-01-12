
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
export class GitHubService {
  private readonly logger = new Logger(GitHubService.name);

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
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

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
      this.logger.error('Network error fetching GitHub commits:', error);
      return [];
    }
  }
}