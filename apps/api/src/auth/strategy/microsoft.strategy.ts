import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserServicesService } from '../../user-services/user-services.service';
import { Request } from 'express';
import { parsePlatformFromState } from 'src/utils/parsePlatform';

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
      scope: ['user.read', 'offline_access', 'mail.read', 'mail.send', 'email', 'openid'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {

    const platform = parsePlatformFromState(req);
    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : profile.userPrincipalName;

    if (!email) throw new Error('No email found in Microsoft profile');

    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.create({
        email,
        name: profile.displayName || email.split('@')[0],
        password: null,
      });
    }

    const msService = await this.userServicesService.getServiceByName('microsoft');

    if (msService) {
      await this.userServicesService.createOrUpdate({
        userId: user.id,
        serviceId: msService.id,
        accessToken,
        refreshToken,
        tokenExpiry: new Date(Date.now() + 3600 * 1000).toISOString(),
        credentials: {
          profile: {
            id: profile.id,
            displayName: profile.displayName
          }
        },
      });
    }

    return {
      ...user,
      platform
    };
  }
}