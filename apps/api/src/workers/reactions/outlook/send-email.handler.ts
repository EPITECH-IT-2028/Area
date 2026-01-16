import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { OAuthService } from '../../services/oauth.service';
import { OutlookService } from '../../services/microsoft.service';
import { VariableReplacer } from '../../../utils/replaceVariables';

export interface OutlookReactionConfig extends Areas {
  reaction_config?: {
    to: string;
    subject?: string;
    body_template?: string;
  };
}

export interface ActionData {
  [key: string]: string | number | boolean | null | undefined;
}

@Injectable()
export class SendOutlookEmailHandler {
  private readonly logger = new Logger(SendOutlookEmailHandler.name);

  constructor(
    private readonly oauthService: OAuthService,
    private readonly outlookService: OutlookService,
  ) {}

  async sendEmail(area: OutlookReactionConfig, actionData: ActionData) {
    if (!area.reaction_config) {
      throw new Error('Reaction configuration is missing.');
    }
    if (
      typeof area.reaction_config !== 'object' ||
      !area.reaction_config.to
    ) {
      throw new Error('Recipient email (to) is not configured.');
    }

    const microsoftService = area.user.user_services.find(
      (us) => us.service.name === 'microsoft',
    );
    if (!microsoftService) {
      throw new Error('No Microsoft service connection found for user.');
    }

    const token = await this.oauthService.getValidAccessToken(
      microsoftService,
      area.name,
    );
    if (!token) {
      throw new Error('Failed to obtain a valid Microsoft access token.');
    }

    const subject = area.reaction_config.subject || 'AREA Notification (Outlook)';
    const template =
      area.reaction_config.body_template ||
      'Hello,\n\nThis is an automated notification from AREA via Outlook.\n\n{{data}}\n\nBest regards,\nAREA Team';
    
    const body = VariableReplacer.replaceVariables(template, actionData);

    try {
      await this.outlookService.sendEmail(token, {
        to: area.reaction_config.to,
        subject,
        body,
      });
      this.logger.log(`[${area.name}] Outlook email sent successfully to ${area.reaction_config.to}.`);
    } catch (error) {
      this.logger.error(`[${area.name}] Failed to send Outlook email: ${error}`);
      throw error;
    }
  }
}