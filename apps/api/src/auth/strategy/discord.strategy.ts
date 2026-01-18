/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, ConflictException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord-auth';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserServicesService } from '../../user-services/user-services.service';
import { Request } from 'express';
import { parseOAuthState } from 'src/utils/parsePlatform';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly userServicesService: UserServicesService,
  ) {
    super({
      clientId: configService.getOrThrow<string>('DISCORD_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('DISCORD_CLIENT_SECRET'),
      callbackUrl: configService.getOrThrow<string>('DISCORD_CALLBACK_URL'),
      scope: ['identify', 'email', 'guilds', 'messages.read'],
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

    const email = profile.email;

    if (!email) throw new Error('No email found in Discord profile');

    let user;

    if (mode === 'link' && userId) {
      user = await this.usersService.findOne(userId);

      if (!user) {
        throw new Error('Authenticated user not found');
      }

      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException(
          'This Discord account is already linked to another user',
        );
      }
    } else {
      user = await this.usersService.findByEmail(email);

      if (!user) {
        user = await this.usersService.create({
          email,
          name: profile.global_name || profile.username || email.split('@')[0],
          password: null,
        });
      }
    }

    const discordService =
      await this.userServicesService.getServiceByName('discord');

    if (discordService) {
      if (mode === 'link' && userId && user.id === userId) {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser && existingUser.id !== user.id) {
          await this.userServicesService.deleteByUserAndService(
            existingUser.id,
            discordService.id,
          );
        }
      }

      await this.userServicesService.createOrUpdate({
        userId: user.id,
        serviceId: discordService.id,
        accessToken,
        refreshToken,
        tokenExpiry: new Date(Date.now() + 3600 * 1000).toISOString(),
        credentials: {
          profile: {
            id: profile.id,
            username: profile.username,
          },
        },
      });
    } else {
      throw new Error('Discord service not found');
    }

    return {
      ...user,
      platform,
      mode,
    };
  }
}