import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { DiscordWebhookHandler } from './discord/discord-webhook.handler';
import { SendEmailHandler } from './gmail/send-email.handler';

@Injectable()
export class ReactionExecutor {
  private readonly logger = new Logger(ReactionExecutor.name);

  constructor(
    private readonly discordWebhookHandler: DiscordWebhookHandler,
    private readonly sendEmailHandler: SendEmailHandler,
  ) {}

  async execute(area: Areas, actionData: any) {
    if (!actionData || typeof actionData !== 'object') {
      throw new Error('Invalid action data provided for reaction execution.');
    }
    this.logger.log(
      `Executing reaction '${area.reaction.name}' for area '${area.name}'.`,
    );

    try {
      switch (area.reaction.name) {
        case 'send_webhook_message':
          await this.discordWebhookHandler.sendWebhookMessage(area, actionData);
          break;
        case 'send_email':
          await this.sendEmailHandler.sendEmail(area as any, actionData as any);
          break;
        default:
          throw new Error(
            `Reaction '${area.reaction.name}' is not implemented.`,
          );
      }
    } catch (error) {
      this.logger.error(
        `Failed to execute reaction for area '${area.name}':`,
        error,
      );
      throw error;
    }
  }
}
