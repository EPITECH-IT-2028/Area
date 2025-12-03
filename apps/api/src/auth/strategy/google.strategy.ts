import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserServicesService } from '../../user-services/user-services.service';

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
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { name, emails } = profile;

    const email = emails && emails.length > 0 ? emails[0].value : null;

    if (!email) {
      throw new Error('No email found in Google profile');
    }

    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.create({
        email,
        name:
          name?.givenName && name?.familyName
            ? `${name.givenName} ${name.familyName}`
            : email.split('@')[0],
        password: null,
      });
    }

    const googleService =
      await this.userServicesService.getServiceByName('google');

    if (googleService) {
      await this.userServicesService.createOrUpdate({
        userId: user.id,
        serviceId: googleService.id,
        accessToken,
        refreshToken,
        tokenExpiry: new Date(Date.now() + 3600 * 1000).toISOString(), // 1hour
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

    return user;
  }
}
