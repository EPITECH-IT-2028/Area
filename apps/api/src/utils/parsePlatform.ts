import { Request } from 'express';

export function parsePlatformFromState(req: Request): string {
  let platform = 'web';
  try {
    const state = req.query.state;
    if (typeof state === 'string') {
      const parsed = JSON.parse(state) as { platform?: string };
      platform = parsed.platform || 'web';
    }
  } catch (e) {
    console.error('Error parsing OAuth state:', e);
  }
  return platform;
}
