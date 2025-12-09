import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User_Services } from '../../../generated/graphql';
import { UserServicesService } from 'src/user-services/user-services.service';

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
}

@Injectable()
export class OAuthService {
  private readonly logger = new Logger(OAuthService.name);
  private readonly OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
  private readonly TOKEN_EXPIRY_BUFFER_MS = 5 * 60 * 1000;

  constructor(
    private readonly configService: ConfigService,
    private readonly userServicesService: UserServicesService,
  ) {}

  async getValidAccessToken(
    userService: User_Services,
    contextName: string,
  ): Promise<string | null> {
    const logPrefix = `[${contextName}]`;

    if (!userService.access_token) {
      this.logger.error(
        `${logPrefix} Google service is connected, but access_token is NULL.`,
      );
      return null;
    }

    const now = new Date();
    const expiry = new Date(userService.token_expiry || 0);

    if (
      !userService.token_expiry ||
      isNaN(expiry.getTime()) ||
      expiry.getTime() - now.getTime() < this.TOKEN_EXPIRY_BUFFER_MS
    ) {
      this.logger.log(
        `${logPrefix} Token expired or expiring soon, refreshing...`,
      );
      return await this.refreshAccessToken(userService, contextName);
    }

    return userService.access_token;
  }

  private async refreshAccessToken(
    userService: User_Services,
    contextName: string,
  ): Promise<string | null> {
    const logPrefix = `[${contextName}]`;

    if (!userService.refresh_token) {
      this.logger.error(`${logPrefix} No refresh token available.`);
      return null;
    }

    try {
      const params = new URLSearchParams();
      params.append(
        'client_id',
        this.configService.getOrThrow('GOOGLE_CLIENT_ID'),
      );
      params.append(
        'client_secret',
        this.configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
      );
      params.append('refresh_token', userService.refresh_token);
      params.append('grant_type', 'refresh_token');

      const response = await fetch(this.OAUTH_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(
          `${logPrefix} Failed to refresh token. Status: ${response.status}, Error: ${errorText}`,
        );
        return null;
      }

      const data = (await response.json()) as GoogleTokenResponse;

      if (data.error) {
        this.logger.error(
          `${logPrefix} Failed to refresh token. Google API error: ${data.error_description || data.error}`,
        );
        return null;
      }

      if (!data.access_token) {
        this.logger.error(`${logPrefix} No access token in refresh response.`);
        return null;
      }

      /* Store the new token and its expiry */
      const newExpiry = new Date();
      newExpiry.setSeconds(newExpiry.getSeconds() + data.expires_in);

      await this.userServicesService.updateTokens(userService.id, {
        accessToken: data.access_token,
        tokenExpiry: newExpiry.toISOString(),
        refreshToken: userService.refresh_token,
      });

      userService.access_token = data.access_token;
      userService.token_expiry = newExpiry.toISOString();

      this.logger.log(
        `${logPrefix} Token refreshed successfully. New expiry: ${newExpiry.toISOString()}`,
      );
      return data.access_token;
    } catch (error) {
      this.logger.error(
        `${logPrefix} Network error during token refresh:`,
        error,
      );
      return null;
    }
  }
}
