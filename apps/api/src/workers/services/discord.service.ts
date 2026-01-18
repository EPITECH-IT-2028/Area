import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface DiscordMessage {
  id: string;
  channel_id: string;
  content: string;
  timestamp: string;
  author: {
    id: string;
    username: string;
    global_name: string | null;
  };
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

@Injectable()
export class DiscordService {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger(DiscordService.name);
  private readonly API_URL = 'https://discord.com/api/v10';
  private readonly REQUEST_TIMEOUT_MS = 10000;

  async fetchRecentMessages(
    token: string,
    channelId: string,
    limit = 5,
  ): Promise<DiscordMessage[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.REQUEST_TIMEOUT_MS,
    );

    const botToken = this.configService.get<string>('DISCORD_BOT_TOKEN');

    if (!botToken) {
      throw new Error('Discord bot token is not configured.');
    }

    try {
      const url = `${this.API_URL}/channels/${channelId}/messages?limit=${limit}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bot ${botToken}` },
        signal: controller.signal,
      });

      if (!response.ok) {
        const errText = await response.text();
        this.logger.error(
          `Discord API Error (Messages) ${response.status}: ${errText}`,
        );
        return [];
      }

      return await response.json();
    } catch (error) {
      this.handleError(error, `fetchRecentMessages for channel ${channelId}`);
      return [];
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async sendDirectMessage(
    token: string,
    userId: string,
    content: string,
  ): Promise<void> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.REQUEST_TIMEOUT_MS,
    );

    const botToken = this.configService.get<string>('DISCORD_BOT_TOKEN');

    if (!botToken) {
      throw new Error('Discord bot token is not configured.');
    }

    try {
      const channelRes = await fetch(`${this.API_URL}/users/@me/channels`, {
        method: 'POST',
        headers: {
          Authorization: `Bot ${botToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient_id: userId }),
        signal: controller.signal,
      });

      if (!channelRes.ok) {
        throw new Error(
          `Could not open DM channel: ${await channelRes.text()}`,
        );
      }

      const dmChannel = await channelRes.json();

      const messageRes = await fetch(
        `${this.API_URL}/channels/${dmChannel.id}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bot ${botToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
          signal: controller.signal,
        },
      );

      if (!messageRes.ok) {
        throw new Error(`Could not send message: ${await messageRes.text()}`);
      }

      this.logger.log(`Discord DM sent successfully to user ${userId}`);
    } catch (error) {
      this.handleError(error, `sendDirectMessage to ${userId}`);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private handleError(error: any, context: string) {
    if (error?.name === 'AbortError') {
      this.logger.error(
        `Discord API request timed out (${this.REQUEST_TIMEOUT_MS}ms) in ${context}`,
      );
    } else {
      this.logger.error(`Network error in DiscordService [${context}]:`, error);
    }
  }
}
