import { Injectable, Logger } from '@nestjs/common';

export interface EmailData {
  id: string;
  from: string;
  subject: string;
  snippet: string;
}

export interface EmailFetchConfig {
  from?: string;
  subject_contains?: string;
}

interface GmailMessage {
  id: string;
  threadId?: string;
}

interface GmailMessagesListResponse {
  messages?: GmailMessage[];
  nextPageToken?: string;
  resultSizeEstimate?: number;
}

interface GmailMessageHeader {
  name: string;
  value: string;
}

interface GmailMessagePayload {
  headers: GmailMessageHeader[];
  body?: {
    data?: string;
  };
}

interface GmailMessageResponse {
  id: string;
  threadId: string;
  labelIds?: string[];
  snippet: string;
  payload: GmailMessagePayload;
  internalDate?: string;
}

interface GmailModifyResponse {
  id: string;
  labelIds: string[];
}

@Injectable()
export class GmailService {
  private readonly logger = new Logger(GmailService.name);
  private readonly GMAIL_API_BASE = 'https://www.googleapis.com/gmail/v1';
  private readonly MAX_RESULTS = 5;

  async fetchNewEmails(
    token: string,
    config: EmailFetchConfig,
  ): Promise<EmailData[]> {
    const query = this.buildSearchQuery(config);

    try {
      const url = `${this.GMAIL_API_BASE}/users/me/messages?q=${encodeURIComponent(query)}&maxResults=${this.MAX_RESULTS}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(
          `Gmail API HTTP Error ${response.status}: ${errorText}`,
        );
        return [];
      }

      const data = (await response.json()) as GmailMessagesListResponse;

      if (!data.messages || data.messages.length === 0) {
        return [];
      }

      const emails: EmailData[] = [];

      for (const message of data.messages) {
        const emailData = await this.fetchEmailDetails(token, message.id);
        if (emailData) {
          emails.push(emailData);
        }
      }

      return emails;
    } catch (error) {
      this.logger.error('Critical error inside fetchNewEmails:', error);
      return [];
    }
  }

  async markAsRead(token: string, messageId: string): Promise<void> {
    try {
      const url = `${this.GMAIL_API_BASE}/users/me/messages/${messageId}/modify`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          removeLabelIds: ['UNREAD'],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(
          `Failed to mark message as read. Status: ${response.status}. Reason: ${errorText}`,
        );
        return;
      }

      const result = (await response.json()) as GmailModifyResponse;
      this.logger.log(`Message ${result.id} marked as READ.`);
    } catch (error) {
      this.logger.error(
        `Network error while marking message ${messageId} as read:`,
        error,
      );
    }
  }

  private buildSearchQuery(config: EmailFetchConfig): string {
    const query: string[] = [];

    if (config.from) {
      query.push(`from:${config.from}`);
    }
    if (config.subject_contains) {
      query.push(`subject:(${config.subject_contains})`);
    }
    query.push('is:unread');

    return query.join(' ');
  }

  private async fetchEmailDetails(
    token: string,
    messageId: string,
  ): Promise<EmailData | null> {
    try {
      const url = `${this.GMAIL_API_BASE}/users/me/messages/${messageId}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        this.logger.error(
          `Failed to fetch email ${messageId}: ${response.status}`,
        );
        return null;
      }

      const emailData = (await response.json()) as GmailMessageResponse;
      const headers = emailData.payload.headers;

      const fromHeader = headers.find((h) => h.name === 'From');
      const subjectHeader = headers.find((h) => h.name === 'Subject');

      return {
        id: emailData.id,
        from: fromHeader?.value || 'Unknown',
        subject: subjectHeader?.value || 'No Subject',
        snippet: emailData.snippet || '',
      };
    } catch (error) {
      this.logger.error(`Error fetching email ${messageId}:`, error);
      return null;
    }
  }
}
