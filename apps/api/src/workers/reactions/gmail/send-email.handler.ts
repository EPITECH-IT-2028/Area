import { Injectable, Logger } from '@nestjs/common';
import { Areas } from 'src/generated/graphql';
import { OAuthService } from '../../services/oauth.service';
import { GmailService } from '../../services/gmail.service';

export interface GmailReactionConfig extends Areas {
	reaction_config?: {
		to: string;
		subject?: string;
		body_template?: string;
	};
}

export interface ActionData {
	[key: string]: string | number | boolean | null | undefined;
}

@Injectable()
export class SendEmailHandler {
	private readonly logger = new Logger(SendEmailHandler.name);

	constructor(
		private readonly oauthService: OAuthService,
		private readonly gmailService: GmailService,
	) {}

	async sendEmail(area: GmailReactionConfig, actionData: ActionData) {
		if (!area.reaction_config) {
			throw new Error('Reaction configuration is missing.');
		}
		if (
			typeof area.reaction_config !== 'object' ||
			!area.reaction_config.to
		) {
			throw new Error('Recipient email (to) is not configured.');
		}

		const googleService = area.user.user_services.find(
			(us) => us.service.name === 'google',
		);
		if (!googleService) {
			throw new Error('No Google service connection found for user.');
		}

		const token = await this.oauthService.getValidAccessToken(
			googleService,
			area.name,
		);
		if (!token) {
			throw new Error('Failed to obtain a valid Google access token.');
		}

		const subject = area.reaction_config.subject || 'AREA Notification';
		const template =
			area.reaction_config.body_template ||
			'Hello,\n\nThis is an automated notification from AREA.\n\n{{data}}\n\nBest regards,\nAREA Team';
		const body = this.replaceVariables(template, actionData);

		try {
			await this.gmailService.sendEmail(token, {
				to: area.reaction_config.to,
				subject,
				body,
			});
			this.logger.log('Email sent successfully.');
		} catch (error) {
			this.logger.error(`Failed to send email: ${error}`);
			throw error;
		}
	}

	private replaceVariables(template: string, data: ActionData): string {
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
