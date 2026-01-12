import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { GithubService } from 'src/workers/services/github.service';
import { VariableReplacer } from '../../../utils/replaceVariables';

export interface ActionData {
  [key: string]: string | number | boolean | null | undefined;
}

@Injectable()
export class GithubCreateIssueHandler {
  private readonly logger = new Logger(GithubCreateIssueHandler.name);

  constructor(private readonly githubService: GithubService) {}

  async createIssue(area: Areas, actionData: ActionData) {
    const githubService = area.user.user_services.find(
      (us) => us.service.name === 'github',
    );

    if (!githubService || !githubService.access_token) {
      this.logger.warn(`[${area.name}] No GitHub token found. Skipping.`);
      return;
    }

    const repo = area.reaction_config['repository'];
    if (!repo || typeof repo !== 'string') {
      throw new Error('Reaction config must include "repository" (owner/repo).');
    }

    const titleTemplate = area.reaction_config['title_template'] ?? 'New issue from AREA: {{name}}';
    const bodyTemplate = area.reaction_config['body_template'] ?? '{{data}}';

    const title = VariableReplacer.replaceVariables(titleTemplate, actionData);
    const body = VariableReplacer.replaceVariables(bodyTemplate, actionData);

    try {
      const issue = await this.githubService.createIssue(
        githubService.access_token,
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
}