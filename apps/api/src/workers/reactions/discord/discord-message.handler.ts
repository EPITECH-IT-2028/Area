import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { OAuthService } from '../../services/oauth.service';
import { DiscordService } from '../../services/discord.service';
import { VariableReplacer } from '../../../utils/replaceVariables';
import { ConfigService } from '@nestjs/config';

export interface DiscordMessageReactionConfig extends Areas {
  reaction_config?: {
    channel_id?: string;
    message_template?: string;
  };
}

export interface ActionData {
  [key: string]: string | number | boolean | null | undefined;
}

@Injectable()
export class SendDiscordMessageHandler {
  private readonly logger = new Logger(SendDiscordMessageHandler.name);

  constructor(
    private readonly oauthService: OAuthService,
    private readonly discordService: DiscordService,
    private readonly configService: ConfigService,
  ) {}

  async handle(area: DiscordMessageReactionConfig, actionData: ActionData) {
    if (!area.reaction_config) {
      throw new Error('Reaction configuration is missing.');
    }

    const discordServiceEntry = area.user.user_services.find(
      (us) => us.service.name === 'discord',
    );

    if (!discordServiceEntry) {
      throw new Error('No Discord service connection found for user.');
    }

    const token = await this.oauthService.getValidAccessToken(
      discordServiceEntry,
      area.name,
    );

    if (!token) {
      throw new Error('Failed to obtain a valid Discord access token.');
    }

    const template =
      area.reaction_config.message_template ||
      'Notification AREA : Un événement a été détecté !\n{{data}}';
    
    const message = VariableReplacer.replaceVariables(template, actionData);

    try {
      if (area.reaction_config.channel_id) {
        await this.sendMessageToChannel(token, area.reaction_config.channel_id, message);
      } else {
        let credentials = discordServiceEntry.credentials;

        if (typeof credentials === 'string') {
          credentials = JSON.parse(credentials);
        }

        const discordUserId = (credentials as any)?.profile?.id;

        if (!discordUserId) {
          throw new Error('Discord User ID not found in stored credentials.');
        }

        await this.discordService.sendDirectMessage(token, discordUserId, message);
      }

      this.logger.log(`[${area.name}] Discord message sent successfully.`);
    } catch (error) {
      this.logger.error(`[${area.name}] Failed to send Discord message: ${error}`);
      throw error;
    }
  }

  private async sendMessageToChannel(token: string, channelId: string, content: string) {

    const botToken = this.configService.get<string>('DISCORD_BOT_TOKEN');
    if (!botToken) {
      throw new Error('Discord bot token is not configured.');
    }

    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Discord API error: ${err}`);
    }
  }
}