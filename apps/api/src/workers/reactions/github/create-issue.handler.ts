import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { GithubService } from 'src/workers/services/github.service';

export interface ActionData {
  [key: string]: string | number | boolean | null | undefined;
}

@Injectable()
export class GithubCreateIssueHandler {
  private readonly logger = new Logger(GithubCreateIssueHandler.name);

  constructor(private readonly githubService: GithubService) {}

  async createIssue(area: Areas, actionData: ActionData) {
    if (!area.reaction_config) throw new Error('Reaction configuration missing.');

    const repo = area.reaction_config['repository'];
    if (!repo || typeof repo !== 'string') {
      throw new Error('Reaction config must include "repository" (owner/repo).');
    }

    const titleTemplate = area.reaction_config['title_template'] ?? 'New issue from AREA: {{name}}';
    const bodyTemplate = area.reaction_config['body_template'] ?? '{{data}}';

    const title = this.replaceVariables(titleTemplate, actionData);
    const body = this.replaceVariables(bodyTemplate, actionData);

    const githubConnection = area.user.user_services.find((us) => us.service.name === 'github');
    if (!githubConnection || !githubConnection.access_token) {
      throw new Error('No connected GitHub account found for the user.');
    }

    try {
      const issue = await this.githubService.createIssue(
        githubConnection.access_token,
        repo,
        title,
        body,
      );
      this.logger.log(`Created issue #${issue.number} in ${repo}`);
      return issue;
    } catch (err) {
      this.logger.error('Error creating GitHub issue:', err);
      throw err;
    }
  }

  private replaceVariables(template: string, data: ActionData): string {
    let s = template;
    for (const key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
      const v = data[key];
      const replacement = v === null || v === undefined ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
      const k = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      s = s.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), replacement);
    }

    return s.replace(/\{\{[^}]+\}\}/g, '');
  }
}