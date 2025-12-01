import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserServicesService } from '../../user-services/user-services.service';

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
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    const { displayName, emails, username } = profile;

    const email = emails && emails.length > 0 ? emails[0].value : null;
    if (!email) {
      return done(new Error('No email found in GitHub profile'), false);
    }

    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.create({
        email,
        name: displayName || username || email.split('@')[0],
        password: null,
      });
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
      return done(new Error('GitHub service not found'), false);
    }

    return done(null, user);
  }
}
