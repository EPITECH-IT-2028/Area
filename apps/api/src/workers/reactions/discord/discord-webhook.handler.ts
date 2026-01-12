import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { VariableReplacer } from '../../../utils/replaceVariables';

export interface DiscordReactionConfig extends Areas {
  reaction_config?: {
    webhook_url: string;
    message_template?: string;
    username?: string;
  };
}

export interface ActionData {
  [key: string]: string | number | boolean | null | undefined;
}

@Injectable()
export class DiscordWebhookHandler {
  private readonly logger = new Logger(DiscordWebhookHandler.name);

  async sendWebhookMessage(
    area: DiscordReactionConfig,
    actionData: ActionData,
  ) {
    if (!area.reaction_config) {
      throw new Error('Reaction configuration is missing.');
    }

    if (
      typeof area.reaction_config !== 'object' ||
      !area.reaction_config.webhook_url
    ) {
      throw new Error('Discord webhook URL is not configured.');
    }

    const webhookUrl = area.reaction_config.webhook_url;

    const template =
      area.reaction_config.message_template ||
      'Hello,\n\nThis is an automated notification from AREA.\n\n{{data}}\n\nBest regards,\nAREA Team';
    const message = VariableReplacer.replaceVariables(template, actionData);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: message,
          username: area.reaction_config.username || 'Area Bot',
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `Discord webhook failed with status ${response.status}: ${response.statusText}`,
        );
      }

      this.logger.log('Discord notification sent successfully.');
    } catch (error) {
      this.logger.error(
        `Failed to send Discord webhook notification: ${error}`,
      );
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
