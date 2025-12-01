import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import type { Response } from 'express';
import { AuthService, AuthResponse } from './auth.service';
import { GoogleOauthGuard } from './guards/google-auth.guard';
import { GithubOauthGuard } from './guards/github-auth.guard';

class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
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
    @Req() req: any,
    @Res({ passthrough: false }) res: Response,
    @Query('platform') platform?: string,
  ): void {
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
    @Req() req: any,
    @Res({ passthrough: false }) res: Response,
    @Query('platform') platform?: string,
  ): void {
    this.handleOAuthCallback(
      req,
      res,
      platform,
      this.authService.githubLogin.bind(this.authService),
    );
  }

  private handleOAuthCallback(
    req: any,
    res: Response,
    platform: string | undefined,
    loginMethod: (user: any) => AuthResponse,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const result = loginMethod(req.user);
      if (!result || !result.access_token) {
        redirectToApp(
          platform || 'web',
          res,
          '',
          'Login failed, could not generate access token',
        );
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
