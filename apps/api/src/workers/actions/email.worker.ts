import { Injectable, Logger } from '@nestjs/common';
import { GraphQLService } from '../../graphql/graphql.service';
import { ConfigService } from '@nestjs/config';
import { ReactionExecutor } from '../reactions/reactions-executor.service';
import { Areas } from '../../generated/graphql';

interface EmailData {
  id: string;
  from: string;
  subject: string;
  snippet: string;
}

@Injectable()
export class EmailWorker {
  private readonly logger = new Logger(EmailWorker.name);

  constructor(
    private readonly graphqlService: GraphQLService,
    private readonly configService: ConfigService,
    private readonly reactionExecutor: ReactionExecutor,
  ) {}

  async process(areas: Areas[]) {
    this.logger.log(`📧 Processing ${areas.length} email-related areas.`);
    for (const area of areas) {
      await this.processArea(area);
    }
  }

  private async processArea(area: Areas) {
    try {
      const googleService = area.user.user_services.find(
        (us) => us.service.name === 'google',
      );

      if (!googleService) {
        this.logger.warn(`No Google service connection found for area '${area.name}'. Skipping.`);
        return;
      }

      if (!googleService.access_token) {
        this.logger.error(`[${area.name}] Google service is connected, but access_token is NULL. Skipping.`);
        return;
      }

      const token = await this.getValidAccessToken(googleService, area.name);

      if (!token) {
        this.logger.error(`[${area.name}] Failed to obtain a valid access token. Skipping.`);
        return;
      }

      const emails = await this.fetchNewEmails(token, area.action_config);

      for (const email of emails) {
        await this.reactionExecutor.execute(area, email);

        await this.markAsRead(token, email.id);
      }
    } catch (error) {
      this.logger.error(`Error processing area '${area.name}':`, error);
    }
  }

  private async getValidAccessToken(userService: any, areaName: string): Promise<string | null> {
    const logPrefix = `[${areaName}]`;

    if (!userService.access_token) {
      this.logger.error(`${logPrefix} Google service is connected, but access_token is NULL.`);
      return null;
    }

    const now = new Date();
    const expiry = new Date(userService.token_expiry);

    if (!userService.token_expiry || isNaN(expiry.getTime()) || expiry.getTime() - now.getTime() < 5 * 60 * 1000) {
      return await this.refreshAccessToken(userService, areaName);
    }

    return userService.access_token;
  }

    private async refreshAccessToken(userService: any, areaName: string): Promise<string | null> {
    const logPrefix = `[${areaName}]`;

    if (!userService.refresh_token) {
      return null;
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: this.configService.get('GOOGLE_CLIENT_ID'),
          client_secret: this.configService.get('GOOGLE_CLIENT_SECRET'),
          refresh_token: userService.refresh_token,
          grant_type: 'refresh_token',
        }),
      });

      const data = await response.json();

      if (data.error) {
        this.logger.error(`${logPrefix} Failed to refresh token. Google API error: ${data.error_description}`);
        return null;
      }

      return data.access_token;
    } catch (error) {
      this.logger.error(`${logPrefix} Network error during token refresh:`, error);
      return null;
    }
  }

  private async fetchNewEmails(token: string, config: any): Promise<EmailData[]> {
    const query: string[] = [];
    if (config.from) query.push(`from:${config.from}`);
    if (config.subject_contains) {
      query.push(`subject:(${config.subject_contains})`);
    }
    query.push('is:unread');

    const queryString = query.join(' ');

    try {
      const response = await fetch(
        `https://www.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(queryString)}&maxResults=5`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`❌ Gmail API HTTP Error ${response.status}: ${errorText}`);
        return [];
      }

      const data = await response.json();

      if (!data.messages || data.messages.length === 0) {
        return [];
      }

      const emails: EmailData[] = [];
      for (const message of data.messages) {
        const emailResponse = await fetch(
            `https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
            { headers: { Authorization: `Bearer ${token}` } },
        );

        const emailData = await emailResponse.json();

        const headers = emailData.payload.headers;
        emails.push({
            id: emailData.id,
            from: headers.find((h: any) => h.name === 'From')?.value || 'Unknown',
            subject: headers.find((h: any) => h.name === 'Subject')?.value || 'No Subject',
            snippet: emailData.snippet,
        });
      }
      return emails;

    } catch (error) {
      this.logger.error('❌ Critical error inside fetchNewEmails:', error);
      return [];
    }
  }

  private async markAsRead(token: string, messageId: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            removeLabelIds: ['UNREAD'],
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`⚠️ Failed to mark message as read. Status: ${response.status}. Reason: ${errorText}`);
        return;
      }

      this.logger.log(`✅ Message ${messageId} marked as READ.`);
    } catch (error) {
      this.logger.error(`⚠️ Network error while marking message ${messageId} as read:`, error);
    }
  }
}