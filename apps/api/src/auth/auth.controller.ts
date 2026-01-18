import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import type { Response } from 'express';
import { AuthService, AuthResponse } from './auth.service';
import { GoogleOauthGuard } from './guards/google-auth.guard';
import { GithubOauthGuard } from './guards/github-auth.guard';
import { GoogleLinkGuard } from './guards/google-link.guard';
import { GithubLinkGuard } from './guards/github-link.guard';
import { MicrosoftLinkGuard } from './guards/microsoft-link.guard';
import { DiscordLinkGuard } from './guards/discord-link.guard';
import { Request } from 'express';
import { MicrosoftOauthGuard } from './guards/microsoft-auth.guard';
import { DiscordOauthGuard } from './guards/discord-auth.guard';

class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

interface RequestWithUser extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    platform?: string;
    mode?: 'login' | 'link';
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return {
      success: true,
      data: result,
      message: 'User registered successfully',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      success: true,
      data: result,
      message: 'Login successful',
    };
  }

  // ========== LOGIN ROUTES ==========

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  googleAuthCallback(
    @Req() req: RequestWithUser,
    @Res({ passthrough: false }) res: Response,
  ): void {
    const platform = req.user?.platform || 'web';
    this.handleOAuthCallback(
      req,
      res,
      platform,
      this.authService.googleLogin.bind(this.authService),
    );
  }

  @Get('github')
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}

  @Get('github/callback')
  @UseGuards(GithubOauthGuard)
  githubAuthCallback(
    @Req() req: RequestWithUser,
    @Res({ passthrough: false }) res: Response,
  ): void {
    const platform = req.user?.platform || 'web';

    this.handleOAuthCallback(
      req,
      res,
      platform,
      this.authService.githubLogin.bind(this.authService),
    );
  }

  @Get('microsoft')
  @UseGuards(MicrosoftOauthGuard)
  async microsoftAuth() {}

  @Get('microsoft/callback')
  @UseGuards(MicrosoftOauthGuard)
  microsoftAuthCallback(
    @Req() req: RequestWithUser,
    @Res({ passthrough: false }) res: Response,
  ): void {
    const platform = req.user?.platform || 'web';

    this.handleOAuthCallback(
      req,
      res,
      platform,
      this.authService.microsoftLogin.bind(this.authService),
    );
  }

  @Get('discord')
  @UseGuards(DiscordOauthGuard)
  async discordAuth() {}

  @Get('discord/callback')
  @UseGuards(DiscordOauthGuard)
  discordAuthCallback(
    @Req() req: RequestWithUser,
    @Res({ passthrough: false }) res: Response,
  ): void {
    const platform = req.user?.platform || 'web';

    this.handleOAuthCallback(
      req,
      res,
      platform,
      this.authService.discordLogin.bind(this.authService),
    );
  }

  /* LINKS */

  @Get('link/google')
  @UseGuards(GoogleLinkGuard)
  async linkGoogleAuth() {}

  @Get('link/google/callback')
  @UseGuards(GoogleLinkGuard)
  linkGoogleAuthCallback(
    @Req() req: RequestWithUser,
    @Res({ passthrough: false }) res: Response,
  ): void {
    this.handleLinkCallback(req, res, 'Google');
  }

  @Get('link/github')
  @UseGuards(GithubLinkGuard)
  async linkGithubAuth() {}

  @Get('link/github/callback')
  @UseGuards(GithubLinkGuard)
  linkGithubAuthCallback(
    @Req() req: RequestWithUser,
    @Res({ passthrough: false }) res: Response,
  ): void {
    this.handleLinkCallback(req, res, 'GitHub');
  }

  @Get('link/microsoft')
  @UseGuards(MicrosoftLinkGuard)
  async linkMicrosoftAuth() {}

  @Get('link/microsoft/callback')
  @UseGuards(MicrosoftLinkGuard)
  linkMicrosoftAuthCallback(
    @Req() req: RequestWithUser,
    @Res({ passthrough: false }) res: Response,
  ): void {
    this.handleLinkCallback(req, res, 'Microsoft');
  }

  @Get('link/discord')
  @UseGuards(DiscordLinkGuard)
  async linkDiscordAuth() {}

  @Get('link/discord/callback')
  @UseGuards(DiscordLinkGuard)
  linkDiscordAuthCallback(
    @Req() req: RequestWithUser,
    @Res({ passthrough: false }) res: Response,
  ): void {
    this.handleLinkCallback(req, res, 'Discord');
  }

  private handleOAuthCallback(
    req: RequestWithUser,
    res: Response,
    platform: string | undefined,
    loginMethod: (user: RequestWithUser['user']) => AuthResponse,
  ) {
    if (!req.user) {
      redirectToApp(
        platform || 'web',
        res,
        '',
        'Authentication failed, no user information found',
      );
      return;
    }

    try {
      const result = loginMethod(req.user);
      if (!result || !result.access_token) {
        redirectToApp(
          platform || 'web',
          res,
          '',
          'Login failed, could not generate access token',
        );
        return;
      }
      redirectToApp(platform || 'web', res, result.access_token);
    } catch (error) {
      console.error('OAuth login error:', error);
      redirectToApp(
        platform || 'web',
        res,
        '',
        'An error occurred during login',
      );
    }
  }

  private handleLinkCallback(
    req: RequestWithUser,
    res: Response,
    serviceName: string,
  ) {
    const platform = req.user?.platform || 'web';

    if (!req.user) {
      redirectToApp(
        platform,
        res,
        '',
        `Failed to link ${serviceName} account`,
        true,
      );
      return;
    }

    try {
      redirectToApp(
        platform,
        res,
        '',
        undefined,
        true,
        `${serviceName} account linked successfully`,
      );
    } catch (error) {
      console.error(`Error linking ${serviceName}:`, error);
      redirectToApp(
        platform,
        res,
        '',
        `An error occurred while linking ${serviceName}`,
        true,
      );
    }
  }
}

function redirectToApp(
  platform: string,
  res: Response,
  token: string,
  error?: string,
  isLink: boolean = false,
  success?: string,
) {
  if (!['web', 'mobile'].includes(platform)) {
    platform = 'web';
  }

  const params = new URLSearchParams();

  if (error) {
    params.append('error', error);
  }

  if (token) {
    params.append('token', token);
  }

  if (success) {
    params.append('success', success);
  }

  if (isLink) {
    params.append('action', 'link');
  }

  const queryString = params.toString();

  if (platform === 'mobile') {
    const frontendScheme = process.env.FRONTEND_MOBILE_SCHEME || 'area://';
    return res.redirect(`${frontendScheme}auth/callback?${queryString}`);
  }

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8081';
  return res.redirect(`${frontendUrl}/auth/callback?${queryString}`);
}
