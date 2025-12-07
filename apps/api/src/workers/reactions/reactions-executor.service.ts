import { Injectable, Logger } from '@nestjs/common';
import { Areas } from '../../generated/graphql';

@Injectable()
export class ReactionExecutor {
  private readonly logger = new Logger(ReactionExecutor.name);

  constructor() {}

  async execute(area: Areas, actionData: any) {
    this.logger.log(`⚡ Executing reaction '${area.reaction.name}' for area '${area.name}'.`);

    try {
      switch (area.reaction.name) {
        case 'send_webhook_message':
          await this.sendDiscordWebhook(area, actionData);
          break;
        default:
          throw new Error(`Reaction '${area.reaction.name}' is not implemented.`);
      }
    } catch (error) {
      this.logger.error(`❌ Failed to execute reaction for area '${area.name}':`, error);
    }
  }

  private async sendDiscordWebhook(area: Areas, actionData: any) {
    if (!area.reaction_config) {
      throw new Error('Reaction configuration is missing.');
    }

    const webhookUrl = area.reaction_config.webhook_url;
    if (!webhookUrl) {
      throw new Error('Discord webhook URL is not configured.');
    }

    const template = area.reaction_config.message_template || 'Event triggered with data: {{subject}}';
    const message = this.replaceVariables(template, actionData);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message, username: 'AREA Bot' }),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed with status ${response.status}: ${response.statusText}`);
    }
    this.logger.log('✅ Discord notification sent successfully.');
  }

  private replaceVariables(template: string, data: any): string {
    let result = template;
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\{\\{${escapedKey}\\}\\}`, 'g');
        result = result.replace(regex, String(data[key]));
      }
    }
    return result;
  }
}