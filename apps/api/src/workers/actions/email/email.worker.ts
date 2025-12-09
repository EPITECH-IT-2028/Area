import { Injectable, Logger } from '@nestjs/common';
import { ReactionExecutor } from '../../reactions/reactions-executor.service';
import { Areas } from 'src/generated/graphql';
import { OAuthService } from './oauth.service';
import { GmailService } from './gmail.service';
import { IActionWorker } from 'src/workers/interfaces/worker.interface';

@Injectable()
export class EmailWorker implements IActionWorker {
  private readonly logger = new Logger(EmailWorker.name);

  constructor(
    private readonly oauthService: OAuthService,
    private readonly gmailService: GmailService,
    private readonly reactionExecutor: ReactionExecutor,
  ) {}

  async process(areas: Areas[]): Promise<void> {
    this.logger.log(`Processing ${areas.length} email-related areas.`);
    for (const area of areas) {
      await this.processArea(area);
    }
  }

  private async processArea(area: Areas): Promise<void> {
    try {
      const googleService = area.user.user_services.find(
        (us) => us.service.name === 'google',
      );

      if (!googleService) {
        this.logger.warn(
          `No Google service connection found for area '${area.name}'. Skipping.`,
        );
        return;
      }

      if (!googleService.access_token) {
        this.logger.error(
          `[${area.name}] Google service is connected, but access_token is NULL. Skipping.`,
        );
        return;
      }

      const token = await this.oauthService.getValidAccessToken(
        googleService,
        area.name,
      );

      if (!token) {
        this.logger.error(
          `[${area.name}] Failed to obtain a valid access token. Skipping.`,
        );
        return;
      }

      const emails = await this.gmailService.fetchNewEmails(
        token,
        area.action_config ?? {},
      );

      this.logger.log(
        `[${area.name}] Found ${emails.length} new email(s) matching criteria.`,
      );

      for (const email of emails) {
        this.logger.log(
          `[${area.name}] Processing email from "${email.from}" with subject "${email.subject}"`,
        );

        await this.reactionExecutor.execute(area, email);

        await this.gmailService.markAsRead(token, email.id);
      }
    } catch (error) {
      this.logger.error(`Error processing area '${area.name}':`, error);
      throw error;
    }
  }
}
