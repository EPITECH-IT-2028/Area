import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class DiscordOauthGuard extends AuthGuard('discord') {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const platformParam = request.query.platform;
    const platform = ['web', 'mobile'].includes(platformParam as string)
      ? platformParam
      : 'web';

    return {
      state: JSON.stringify({ platform }),
    };
  }
}
