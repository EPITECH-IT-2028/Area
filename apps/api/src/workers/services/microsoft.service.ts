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

export interface SendEmailPayload {
  to: string;
  subject: string;
  body: string;
}

@Injectable()
export class OutlookService {
  private readonly logger = new Logger(OutlookService.name);
  private readonly GRAPH_API_BASE = 'https://graph.microsoft.com/v1.0';
  private readonly MAX_RESULTS = 5;

  async fetchNewEmails(
    token: string,
    config: EmailFetchConfig,
  ): Promise<EmailData[]> {
    const filter = this.buildFilterQuery(config);

    try {
      const url = `${this.GRAPH_API_BASE}/me/messages?$filter=${encodeURIComponent(
        filter,
      )}&$top=${this.MAX_RESULTS}&$select=id,from,subject,bodyPreview`;

      const response = await fetch(url, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Outlook API Error ${response.status}: ${errorText}`);
        return [];
      }

      const data = await response.json();

      if (!data.value || data.value.length === 0) {
        return [];
      }

      return data.value.map((msg: any) => ({
        id: msg.id,
        from: msg.from?.emailAddress?.address || 'Unknown',
        subject: msg.subject || 'No Subject',
        snippet: msg.bodyPreview || '',
      }));
    } catch (error) {
      this.logger.error('Critical error inside Outlook fetchNewEmails:', error);
      return [];
    }
  }

  async markAsRead(token: string, messageId: string): Promise<void> {
    try {
      const url = `${this.GRAPH_API_BASE}/me/messages/${messageId}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isRead: true,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Failed to mark Outlook message as read: ${errorText}`);
        return;
      }

      this.logger.log(`Outlook Message ${messageId} marked as READ.`);
    } catch (error) {
      this.logger.error(`Error marking Outlook message ${messageId} as read:`, error);
    }
  }

  async sendEmail(
    token: string,
    payload: SendEmailPayload
  ): Promise<void> {
    try {
      const url = `${this.GRAPH_API_BASE}/me/sendMail`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            subject: payload.subject,
            body: {
              contentType: 'Text',
              content: payload.body,
            },
            toRecipients: [
              {
                emailAddress: {
                  address: payload.to,
                },
              },
            ],
          },
          saveToSentItems: 'true',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Failed to send Outlook email: ${errorText}`);
        throw new Error(`Outlook API error: ${errorText}`);
      }
      this.logger.log(`Outlook email sent to ${payload.to}.`);
    } catch (error) {
      this.logger.error('Network error while sending Outlook email:', error);
      throw error;
    }
  }

  private buildFilterQuery(config: EmailFetchConfig): string {
    const filters: string[] = ['isRead eq false'];

    if (config.from) {
      filters.push(`from/emailAddress/address eq '${config.from}'`);
    }
    if (config.subject_contains) {
      filters.push(`subject contains '${config.subject_contains}'`);
    }

    if (filters.length === 1) {
      return filters[0];
    }

    return filters.join(' and ');
  }
}