import { Injectable, Logger } from '@nestjs/common';

export interface OpenMeteoCurrentResponse {
  latitude: number;
  longitude: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;
  current_weather?: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
}

@Injectable()
export class OpenMeteoService {
  private readonly logger = new Logger(OpenMeteoService.name);
  private readonly BASE = 'https://api.open-meteo.com/v1/forecast';
  private readonly TIMEOUT = 8000;

  async fetchCurrentWeather(
    latitude: number,
    longitude: number,
    options?: { hourly?: string[]; daily?: string[]; timezone?: string },
  ): Promise<OpenMeteoCurrentResponse | null> {
    const params = new URLSearchParams();
    params.set('latitude', String(latitude));
    params.set('longitude', String(longitude));
    params.set('current_weather', 'true');
    params.set('timezone', options?.timezone ?? 'UTC');

    if (options?.hourly && options.hourly.length > 0) {
      params.set('hourly', options.hourly.join(','));
    }
    if (options?.daily && options.daily.length > 0) {
      params.set('daily', options.daily.join(','));
    }

    const url = `${this.BASE}?${params.toString()}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.TIMEOUT);

    try {
      const res = await fetch(url, { signal: controller.signal });

      clearTimeout(timeout);

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        this.logger.error(`OpenMeteo HTTP ${res.status}: ${text}`);
        return null;
      }

      const data = (await res.json()) as OpenMeteoCurrentResponse;
      return data;
    } catch (error) {
      if ((error as any).name === 'AbortError') {
        this.logger.error('OpenMeteo request aborted (timeout)');
      } else {
        this.logger.error('OpenMeteo fetch error:', error);
      }
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }
}
