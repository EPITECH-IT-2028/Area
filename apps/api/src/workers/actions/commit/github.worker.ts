import { Injectable, Logger } from '@nestjs/common';
import { Areas } from '../../../generated/graphql';
import { ReactionExecutor } from '../../reactions/reactions-executor.service';
import { GithubService} from '../../services/github.service';
import { GraphQLService } from '../../../graphql/graphql.service';
import { UpdateAreaLastTriggeredMutation } from 'src/graphql/queries/areas/areas';

@Injectable()
export class GithubWorker {
  private readonly logger = new Logger(GithubWorker.name);

  constructor(
    private readonly reactionExecutor: ReactionExecutor,
    private readonly githubService: GithubService,
    private readonly graphqlService: GraphQLService,
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
          try {
            await this.reactionExecutor.execute(area, commit);

            try {
              const last = commit.date ?? new Date().toISOString();
              await this.graphqlService.adminMutation(UpdateAreaLastTriggeredMutation, {
                id: area.id,
                last_triggered: last,
              });
              this.logger.log(`[${area.name}] Updated last_triggered to ${last} after commit ${commit.sha}`);
            } catch (err) {
              this.logger.error(`[${area.name}] Failed to update last_triggered after commit ${commit.sha}:`, err);
            }
          } catch (err) {
            this.logger.error(`[${area.name}] Reaction failed for commit ${commit.sha}:`, err);
          }
        }
      }
    } catch (error) {
      this.logger.error(`[${area.name}] Error processing GitHub area:`, error);
    }
  }
}
