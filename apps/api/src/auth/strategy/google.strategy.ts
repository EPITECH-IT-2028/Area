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
    params: any,
    profile: Profile,
  ): Promise<any> {
    const { name, emails } = profile;
    /* DEBUG */
    console.log('Google profile:', profile);
    console.log('Google params:', params);
    /* END DEBUG */

    console.log('Emails:', emails);
    console.log('Name:', name);

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
      const expiresAt = new Date(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        Date.now() + (params.expires_in || 3600) * 1000,
      ).toISOString();
      await this.userServicesService.createOrUpdate({
        userId: user.id,
        serviceId: googleService.id,
        accessToken,
        refreshToken,
        tokenExpiry: expiresAt,
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
