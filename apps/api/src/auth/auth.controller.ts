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
import { ApiProperty } from '@nestjs/swagger';
import { AuthService, AuthResponse } from './auth.service';
import { GoogleOauthGuard } from './guards/google-auth.guard';
import { GithubOauthGuard } from './guards/github-auth.guard';
import { Request } from 'express';
import { MicrosoftOauthGuard } from './guards/microsoft-auth.guard';
import { DiscordOauthGuard } from './guards/discord-auth.guard';

class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd!',
    description: 'The password of the user (must be strong)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd!',
    description: 'The password of the user',
  })
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
}

function redirectToApp(
  platform: string,
  res: Response,
  token: string,
  error?: string,
) {
  if (!['web', 'mobile'].includes(platform)) {
    platform = 'web';
  }
  if (error) {
    if (platform === 'web') {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8081';
      return res.redirect(
        `${frontendUrl}/auth/callback?error=${encodeURIComponent(error)}`,
      );
    }
    const frontendScheme = process.env.FRONTEND_MOBILE_SCHEME || 'area://';
    return res.redirect(
      `${frontendScheme}auth/callback?error=${encodeURIComponent(error)}`,
    );
  }

  const encodedToken = encodeURIComponent(token);

  if (platform === 'mobile') {
    const frontendScheme = process.env.FRONTEND_MOBILE_SCHEME || 'area://';
    return res.redirect(`${frontendScheme}auth/callback?token=${encodedToken}`);
  }

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8081';
  return res.redirect(`${frontendUrl}/auth/callback?token=${encodedToken}`);
}
