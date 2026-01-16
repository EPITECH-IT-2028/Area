import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { VariableReplacer } from '../../../utils/replaceVariables';

export interface PipedreamReactionConfig extends Areas {
  reaction_config?: {
    webhook_url: string;
    message_template?: string;
  };
}

export interface ActionData {
  [key: string]: string | number | boolean | null | undefined;
}

@Injectable()
export class PipedreamWebhookHandler {
  private readonly logger = new Logger(PipedreamWebhookHandler.name);

  async sendWebhookMessage(
    area: PipedreamReactionConfig,
    actionData: ActionData,
  ) {
    if (!area.reaction_config?.webhook_url) {
      throw new Error('Pipedream webhook URL is not configured.');
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
          success: true,
          source: 'AREA_ENGINE',
          message: message,
          details: actionData,
          fired_at: new Date().toISOString(),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Pipedream webhook failed with status ${response.status}: ${errorText}`,
        );
      }

      this.logger.log('Data successfully sent to Pipedream.');
    } catch (error) {
      this.logger.error(
        `Failed to send Pipedream webhook notification: ${error.message}`,
      );
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}