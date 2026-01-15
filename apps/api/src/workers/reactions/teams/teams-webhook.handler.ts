import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { VariableReplacer } from '../../../utils/replaceVariables';

export interface TeamsReactionConfig extends Areas {
  reaction_config?: {
    webhook_url: string;
    message_template?: string;
  };
}

@Injectable()
export class TeamsWebhookHandler {
  private readonly logger = new Logger(TeamsWebhookHandler.name);

  async sendWebhookMessage(
    area: TeamsReactionConfig,
    actionData: any
  ) {
    if (!area.reaction_config?.webhook_url) {
      throw new Error('Teams webhook URL is not configured.');
    }

    const template =
      area.reaction_config.message_template ||
      'Hello,\n\nThis is an automated notification from AREA.\n\n{{data}}\n\nBest regards,\nAREA Team';

    const message = VariableReplacer.replaceVariables(template, actionData);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(area.reaction_config.webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: "message",
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              content: {
                type: "AdaptiveCard",
                body: [{ type: "TextBlock", text: message }],
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                version: "1.0"
              }
            }
          ]
        }),
      });

      if (!response.ok) throw new Error(`Teams failed: ${response.status}`);
      this.logger.log('Teams notification sent successfully.');
    } catch (error) {
      this.logger.error(`Failed to send Teams webhook: ${error}`);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}