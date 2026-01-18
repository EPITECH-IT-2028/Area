import { Request } from 'express';

export interface OAuthState {
  platform: string;
  mode?: 'login' | 'link';
  userId?: string;
}

export function parsePlatformFromState(req: Request): string {
  const state = parseOAuthState(req);
  return state.platform;
}

export function parseOAuthState(req: Request): OAuthState {
  const defaultState: OAuthState = { platform: 'web', mode: 'login' };

  try {
    const state = req.query.state;
    if (typeof state === 'string') {
      const parsed = JSON.parse(state) as Partial<OAuthState>;
      return {
        platform: parsed.platform || 'web',
        mode: parsed.mode || 'login',
        userId: parsed.userId,
      };
    }
  } catch (e) {
    console.error('Error parsing OAuth state:', e);
  }

  return defaultState;
}
