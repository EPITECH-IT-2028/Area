import { Injectable, Logger } from '@nestjs/common';
import { IActionWorker } from 'src/workers/interfaces/worker.interface';
import { Areas } from 'src/generated/graphql';
import { ReactionExecutor } from 'src/workers/reactions/reactions-executor.service';
import { DiscordService } from 'src/workers/services/discord.service'; // Votre nouveau service optimisé
import { GraphQLService } from 'src/graphql/graphql.service';
import { UpdateAreaLastTriggeredMutation } from 'src/graphql/queries/areas/areas';
import { OAuthService } from 'src/workers/services/oauth.service';

@Injectable()
export class DiscordMessageWorker implements IActionWorker {
  private readonly logger = new Logger(DiscordMessageWorker.name);

  constructor(
    private readonly reactionExecutor: ReactionExecutor,
    private readonly discordService: DiscordService,
    private readonly graphqlService: GraphQLService,
    private readonly oauthService: OAuthService,
  ) {}

  async process(areas: Areas[]): Promise<void> {
    this.logger.log(`Processing ${areas.length} Discord Message areas.`);
    for (const area of areas) {
      await this.processArea(area);
    }
  }

  private async processArea(area: Areas) {
    try {
      const discordServiceEntry = area.user.user_services.find(
        (us) => us.service.name === 'discord',
      );

      if (!discordServiceEntry) {
        this.logger.warn(`[${area.name}] No Discord connection found. Skipping.`);
        return;
      }

      const token = await this.oauthService.getValidAccessToken(
        discordServiceEntry,
        area.name,
      );

      if (!token) {
        this.logger.error(`[${area.name}] Failed to obtain a valid Discord token.`);
        return;
      }

      const cfg = (area.action_config || {}) as any;
      if (!cfg.channel_id) {
        this.logger.error(`[${area.name}] Missing 'channel_id' in action_config.`);
        return;
      }

      const messages = await this.discordService.fetchRecentMessages(
        token,
        cfg.channel_id,
        10
      );

      if (!messages || messages.length === 0) {
        return;
      }

      const lastTriggered = area.last_triggered ? new Date(area.last_triggered) : new Date(0);
      
      const newMessages = messages
        .filter(msg => new Date(msg.timestamp).getTime() > lastTriggered.getTime())
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      if (newMessages.length === 0) {
        this.logger.debug(`[${area.name}] No new Discord messages found since last trigger.`);
        return;
      }

      this.logger.log(`[${area.name}] Found ${newMessages.length} new message(s).`);

      for (const msg of newMessages) {
        try {
          if (cfg.author_id && msg.author.id !== cfg.author_id) {
            continue;
          }

          await this.reactionExecutor.execute(area, { 
            content: msg.content, 
            author: msg.author.username,
            channel_id: msg.channel_id,
            timestamp: msg.timestamp
          });

          try {
            const last = msg.timestamp;
            await this.graphqlService.adminMutation(UpdateAreaLastTriggeredMutation, {
              id: area.id,
              last_triggered: last,
            });
          } catch (err) {
            this.logger.error(`[${area.name}] Failed to update last_triggered:`, err);
          }
        } catch (err) {
          this.logger.error(`[${area.name}] Reaction failed for message ${msg.id}:`, err);
        }
      }
    } catch (error) {
      this.logger.error(`[${area.name}] Error processing Discord area:`, error);
    }
  }
}