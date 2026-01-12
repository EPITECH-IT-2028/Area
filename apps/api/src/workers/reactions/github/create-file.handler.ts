import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { GithubService } from 'src/workers/services/github.service';
import { VariableReplacer } from '../../../utils/replaceVariables';

export interface ActionData {
  [key: string]: string | number | boolean | null | undefined;
}

@Injectable()
export class GithubCreateFileHandler {
  private readonly logger = new Logger(GithubCreateFileHandler.name);

  constructor(private readonly githubService: GithubService) {}

  async createFile(area: Areas, actionData: ActionData) {
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

    const filePath = area.reaction_config['file_path'];
    if (!filePath || typeof filePath !== 'string') {
      throw new Error('Reaction config must include "file_path".');
    }

    const contentTemplate = area.reaction_config['content_template'] ?? '{{data}}';
    const commitMessageTemplate =
      area.reaction_config['commit_message_template'] ?? 'AREA: update {{file_path}}';
    const branch = area.reaction_config['branch'];

    const content = VariableReplacer.replaceVariables(contentTemplate, { ...actionData, file_path: filePath });
    const commitMessage = VariableReplacer.replaceVariables(commitMessageTemplate, { ...actionData, file_path: filePath });

    try {
      const result = await this.githubService.createOrUpdateFile(
        githubService.access_token,
        repo,
        filePath,
        content,
        commitMessage,
        branch,
      );
      this.logger.log(`Created/updated file ${filePath} in ${repo}`);
      return result;
    } catch (err) {
      this.logger.error('Error creating/updating GitHub file:', err);
      throw err;
    }
  }
}