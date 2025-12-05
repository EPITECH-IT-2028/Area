import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GithubOauthGuard extends AuthGuard('github') {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const platform = request.query.platform || 'web';

    return {
      state: JSON.stringify({ platform }),
    };
  }
}
