import { Injectable, ConflictException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  Profile,
  StrategyOptionsWithRequest,
} from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserServicesService } from '../../user-services/user-services.service';
import { Request } from 'express';
import { parseOAuthState } from 'src/utils/parsePlatform';
import type { Users } from 'src/generated/graphql';

interface ExtendedStrategyOptions extends StrategyOptionsWithRequest {
  accessType?: string;
  prompt?: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly userServicesService: UserServicesService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/gmail.modify',
      ],
      accessType: 'offline',
      prompt: 'consent',
      passReqToCallback: true,
    } as ExtendedStrategyOptions);
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const oauthState = parseOAuthState(req);
    const { platform, mode, userId } = oauthState;

    const { name, emails } = profile;

    const email = emails && emails.length > 0 ? emails[0].value : null;

    if (!email) {
      throw new Error('No email found in Google profile');
    }

    let user: Users;

    if (mode === 'link' && userId) {
      const foundUser = await this.usersService.findOne(userId);

      if (!foundUser) {
        throw new Error('Authenticated user not found');
      }

      user = foundUser;
    } else {
      const foundUser = await this.usersService.findByEmail(email);

      if (!foundUser) {
        user = await this.usersService.create({
          email,
          name:
            name?.givenName && name?.familyName
              ? `${name.givenName} ${name.familyName}`
              : email.split('@')[0],
          password: null,
        });
      } else {
        user = foundUser;
      }
    }

    const googleService =
      await this.userServicesService.getServiceByName('google');

    if (googleService) {
      if (mode === 'link') {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser && existingUser.id !== userId) {
          await this.userServicesService.deleteByUserAndService(
            existingUser.id,
            googleService.id,
          );
        }
      }

      await this.userServicesService.createOrUpdate({
        userId: user.id,
        serviceId: googleService.id,
        accessToken,
        refreshToken,
        tokenExpiry: new Date(Date.now() + 3600 * 1000).toISOString(),
        credentials: {
          profile: {
            id: profile.id,
            displayName: profile.displayName,
            emails: profile.emails,
          },
        },
      });
    } else {
      throw new Error('Google service not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name || '',
      platform,
      mode,
    };
  }
}