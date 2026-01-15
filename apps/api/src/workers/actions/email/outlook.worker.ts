import { Injectable, Logger } from '@nestjs/common';
import { ReactionExecutor } from '../../reactions/reactions-executor.service';
import { Areas } from 'src/generated/graphql';
import { OAuthService } from '../../services/oauth.service';
import { OutlookService } from '../../services/microsoft.service';
import { IActionWorker } from 'src/workers/interfaces/worker.interface';

@Injectable()
export class OutlookWorker implements IActionWorker {
  private readonly logger = new Logger(OutlookWorker.name);

  constructor(
    private readonly oauthService: OAuthService,
    private readonly outlookService: OutlookService,
    private readonly reactionExecutor: ReactionExecutor,
  ) {}

  async process(areas: Areas[]): Promise<void> {
    this.logger.log(`Processing ${areas.length} Outlook-related areas.`);
    for (const area of areas) {
      await this.processArea(area);
    }
  }

  private async processArea(area: Areas): Promise<void> {
    try {
      const microsoftService = area.user.user_services.find(
        (us) => us.service.name === 'microsoft',
      );

      if (!microsoftService) {
        this.logger.warn(
          `No Microsoft service connection found for area '${area.name}'. Skipping.`,
        );
        return;
      }

      const token = await this.oauthService.getValidAccessToken(
        microsoftService,
        area.name,
      );

      if (!token) {
        this.logger.error(
          `[${area.name}] Failed to obtain a valid Microsoft access token. Skipping.`,
        );
        return;
      }

      const emails = await this.outlookService.fetchNewEmails(
        token,
        area.action_config ?? {},
      );

      this.logger.log(
        `[${area.name}] Found ${emails.length} new Outlook email(s).`,
      );

      for (const email of emails) {
        this.logger.log(
          `[${area.name}] Processing Outlook email from "${email.from}" with subject "${email.subject}"`,
        );

        await this.reactionExecutor.execute(area, email);

        // await this.outlookService.markAsRead(token, email.id);
      }
    } catch (error) {
      this.logger.error(`Error processing Outlook area '${area.name}':`, error);
    }
  }
}