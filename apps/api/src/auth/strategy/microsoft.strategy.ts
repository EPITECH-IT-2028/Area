/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, ConflictException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserServicesService } from '../../user-services/user-services.service';
import { Request } from 'express';
import { parseOAuthState } from 'src/utils/parsePlatform';
import type { Users } from 'src/generated/graphql';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly userServicesService: UserServicesService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('MICROSOFT_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('MICROSOFT_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('MICROSOFT_CALLBACK_URL'),
      scope: [
        'user.read',
        'offline_access',
        'mail.read',
        'mail.send',
        'email',
        'openid',
      ],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    const oauthState = parseOAuthState(req);
    const { platform, mode, userId } = oauthState;

    const email =
      profile.emails && profile.emails.length > 0
        ? profile.emails[0].value
        : profile.userPrincipalName;

    if (!email) throw new Error('No email found in Microsoft profile');

    let user: Users;

    if (mode === 'link' && userId) {
      const foundUser = await this.usersService.findOne(userId);

      if (!foundUser) {
        throw new Error('Authenticated user not found');
      }

      user = foundUser;

      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException(
          'This Microsoft account is already linked to another user',
        );
      }
    } else {
      const foundUser = await this.usersService.findByEmail(email);

      if (!foundUser) {
        user = await this.usersService.create({
          email,
          name: profile.displayName || email.split('@')[0],
          password: null,
        });
      } else {
        user = foundUser;
      }
    }

    const msService =
      await this.userServicesService.getServiceByName('microsoft');

    if (msService) {
      if (mode === 'link') {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser && existingUser.id !== userId) {
          await this.userServicesService.deleteByUserAndService(
            existingUser.id,
            msService.id,
          );
        }
      }

      await this.userServicesService.createOrUpdate({
        userId: user.id,
        serviceId: msService.id,
        accessToken,
        refreshToken,
        tokenExpiry: new Date(Date.now() + 3600 * 1000).toISOString(),
        credentials: {
          profile: {
            id: profile.id,
            displayName: profile.displayName,
          },
        },
      });
    } else {
      throw new Error('Microsoft service not found');
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