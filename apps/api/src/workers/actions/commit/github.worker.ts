import { Injectable, Logger } from '@nestjs/common';
import { Areas } from '../../../generated/graphql';
import { ReactionExecutor } from '../../reactions/reactions-executor.service';
import { GithubService} from '../../services/github.service';

@Injectable()
export class GithubWorker {
  private readonly logger = new Logger(GithubWorker.name);

  constructor(
    private readonly reactionExecutor: ReactionExecutor,
    private readonly githubService: GithubService,
  ) {}

  async process(areas: Areas[]) {
    this.logger.log(`🐙 Processing ${areas.length} github-push related areas.`);
    for (const area of areas) {
      await this.processArea(area);
    }
  }

  private async processArea(area: Areas) {
    try {
      const githubService = area.user.user_services.find(
        (us) => us.service.name === 'github',
      );

      if (!githubService || !githubService.access_token) {
        this.logger.warn(`[${area.name}] No GitHub token found. Skipping.`);
        return;
      }

      const config = area.action_config || {};
      if (!config.repository) {
        this.logger.error(`[${area.name}] Missing 'repository' in config.`);
        return;
      }

      const commits = await this.githubService.fetchNewCommits(
        githubService.access_token,
        config,
        area.last_triggered,
      );

      if (commits.length > 0) {
        this.logger.log(`[${area.name}] 🐙 Found ${commits.length} new commits.`);
        
        for (const commit of commits) {
          await this.reactionExecutor.execute(area, commit);
        }
      }
    } catch (error) {
      this.logger.error(`[${area.name}] Error processing GitHub area:`, error);
    }
  }
}
