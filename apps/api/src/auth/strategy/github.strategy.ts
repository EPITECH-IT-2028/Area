import { Injectable, ConflictException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserServicesService } from '../../user-services/user-services.service';
import { Request } from 'express';
import { parseOAuthState } from 'src/utils/parsePlatform';
import type { Users } from 'src/generated/graphql';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly userServicesService: UserServicesService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email', 'public_repo'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const oauthState = parseOAuthState(req);
    const { platform, mode, userId } = oauthState;

    const { displayName, emails, username } = profile;

    const email = emails && emails.length > 0 ? emails[0].value : null;
    if (!email) {
      throw new Error('No email found in GitHub profile');
    }

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
          'This GitHub account is already linked to another user',
        );
      }
    } else {
      const foundUser = await this.usersService.findByEmail(email);

      if (!foundUser) {
        user = await this.usersService.create({
          email,
          name: displayName || username || email.split('@')[0],
          password: null,
        });
      } else {
        user = foundUser;
      }
    }

    const githubService =
      await this.userServicesService.getServiceByName('github');

    if (githubService) {
      await this.userServicesService.createOrUpdate({
        userId: user.id,
        serviceId: githubService.id,
        accessToken,
        refreshToken: refreshToken || null,
        tokenExpiry: null, // GitHub tokens do not expire
        credentials: {
          profile: {
            id: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            emails: profile.emails,
          },
        },
      });
    } else {
      throw new Error('GitHub service not found');
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
