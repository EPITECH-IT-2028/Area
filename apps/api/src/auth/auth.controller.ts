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
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const result = loginMethod(req.user);
    redirectToApp(platform || 'web', res, result.access_token);
  }
}

function redirectToApp(platform: string, res: Response, token: string) {
  if (!['web', 'mobile'].includes(platform)) {
    platform = 'web';
  }

  const encodedToken = encodeURIComponent(token);

  if (platform === 'mobile') {
    const frontendScheme = process.env.FRONTEND_MOBILE_SCHEME || 'area://';
    return res.redirect(`${frontendScheme}auth/callback?token=${encodedToken}`);
  }

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8081';
  return res.redirect(`${frontendUrl}/auth/callback?token=${encodedToken}`);
}
