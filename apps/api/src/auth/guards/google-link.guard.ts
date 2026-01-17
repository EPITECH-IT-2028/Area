import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

interface RequestWithUser extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

interface JwtPayload {
  sub: string;
  email: string;
  name?: string;
}

@Injectable()
export class GoogleLinkGuard extends AuthGuard('google') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (
      request.url.startsWith('/auth/link/google') &&
      !request.url.includes('callback')
    ) {
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException(
          'Authentication required to link service',
        );
      }

      try {
        const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
        request.user = {
          id: payload.sub,
          email: payload.email,
          name: payload.name || '',
        };
      } catch {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }

    const result = (await super.canActivate(context)) as boolean;
    return result;
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const platformParam = request.query.platform;
    const platform = ['web', 'mobile'].includes(platformParam as string)
      ? platformParam
      : 'web';

    const state = JSON.stringify({
      platform,
      mode: 'link',
      userId: request.user?.id,
    });

    return { state };
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
