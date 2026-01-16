import { Injectable, Logger } from '@nestjs/common';
import { IActionWorker } from 'src/workers/interfaces/worker.interface';
import { Areas } from 'src/generated/graphql';
import { ReactionExecutor } from 'src/workers/reactions/reactions-executor.service';
import { GithubService } from 'src/workers/services/github.service';
import { GraphQLService } from 'src/graphql/graphql.service';
import { UpdateAreaLastTriggeredMutation } from 'src/graphql/queries/areas/areas';

@Injectable()
export class GithubPullRequestWorker implements IActionWorker {
  private readonly logger = new Logger(GithubPullRequestWorker.name);

  constructor(
    private readonly reactionExecutor: ReactionExecutor,
    private readonly githubService: GithubService,
    private readonly graphqlService: GraphQLService,
  ) {}

  async process(areas: Areas[]): Promise<void> {
    this.logger.log(`Processing ${areas.length} GitHub PR-related areas.`);
    for (const area of areas) {
      await this.processArea(area);
    }
  }

  private async processArea(area: Areas) {
    try {
      const githubServiceEntry = area.user.user_services.find(
        (us) => us.service.name === 'github',
      );

      if (!githubServiceEntry || !githubServiceEntry.access_token) {
        this.logger.warn(`[${area.name}] No GitHub token found. Skipping.`);
        return;
      }

      const cfg = (area.action_config || {}) as any;
      if (!cfg.repository) {
        this.logger.error(`[${area.name}] Missing 'repository' in action_config.`);
        return;
      }

      const prs = await this.githubService.fetchNewPullRequests(
        githubServiceEntry.access_token,
        cfg.repository,
        area.last_triggered,
      );

      if (!prs || prs.length === 0) {
        this.logger.debug(`[${area.name}] No new PRs found.`);
        return;
      }

      this.logger.log(`[${area.name}] Found ${prs.length} new PR(s).`);

      for (const pr of prs) {
        try {
          if (cfg.author && pr.user?.login !== cfg.author) {
            this.logger.debug(`[${area.name}] PR #${pr.number} skipped: author ${pr.user?.login} != ${cfg.author}`);
            continue;
          }

          await this.reactionExecutor.execute(area, { pr, repository: cfg.repository });

          try {
            const last = pr.created_at ?? new Date().toISOString();
            await this.graphqlService.adminMutation(UpdateAreaLastTriggeredMutation, {
              id: area.id,
              last_triggered: last,
            });
            this.logger.log(`[${area.name}] Updated last_triggered to ${last} after PR #${pr.number}`);
          } catch (err) {
            this.logger.error(`[${area.name}] Failed to update last_triggered after PR #${pr.number}:`, err);
          }
        } catch (err) {
          this.logger.error(`[${area.name}] Reaction failed for PR #${pr.number}:`, err);
        }
      }
    } catch (error) {
      this.logger.error(`[${area.name}] Error processing GitHub PR area:`, error);
    }
  }
}