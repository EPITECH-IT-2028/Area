import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UserServicesModule } from '../user-services/user-services.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { GithubStrategy } from './strategy/github.strategy';
import { MicrosoftStrategy } from './strategy/microsoft.strategy';
import { DiscordStrategy } from './strategy/discord.strategy';
import { GoogleLinkGuard } from './guards/google-link.guard';
import { GithubLinkGuard } from './guards/github-link.guard';
import { MicrosoftLinkGuard } from './guards/microsoft-link.guard';
import { DiscordLinkGuard } from './guards/discord-link.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    UserServicesModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    GithubStrategy,
    MicrosoftStrategy,
    DiscordStrategy,
    GoogleLinkGuard,
    GithubLinkGuard,
    MicrosoftLinkGuard,
    DiscordLinkGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
