import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { VariableReplacer } from '../../../utils/replaceVariables';

export interface SlackReactionConfig extends Areas {
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
export class SlackWebhookHandler {
  private readonly logger = new Logger(SlackWebhookHandler.name);

  async sendWebhookMessage(
    area: SlackReactionConfig,
    actionData: ActionData,
  ) {
    if (!area.reaction_config) {
      throw new Error('Reaction configuration is missing.');
    }

    if (
      typeof area.reaction_config !== 'object' ||
      !area.reaction_config.webhook_url
    ) {
      throw new Error('Slack webhook URL is not configured.');
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
          text: message,
          username: area.reaction_config.username || 'Area Bot',
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Slack webhook failed with status ${response.status}: ${errorBody || response.statusText}`,
        );
      }

      this.logger.log('Slack notification sent successfully.');
    } catch (error) {
      this.logger.error(
        `Failed to send Slack webhook notification: ${error}`,
      );
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}