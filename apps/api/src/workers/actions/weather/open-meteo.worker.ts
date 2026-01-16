import { Injectable, Logger } from '@nestjs/common';
import { IActionWorker } from 'src/workers/interfaces/worker.interface';
import { Areas } from 'src/generated/graphql';
import { OpenMeteoService } from '../../services/open-meteo.service';
import { ReactionExecutor } from '../../reactions/reactions-executor.service';

interface WeatherActionConfig {
  latitude?: number;
  longitude?: number;
  condition?: { type: string; threshold: number };
}

@Injectable()
export class OpenMeteoWorker implements IActionWorker {
  private readonly logger = new Logger(OpenMeteoWorker.name);

  constructor(
    private readonly openMeteoService: OpenMeteoService,
    private readonly reactionExecutor: ReactionExecutor,
  ) {}

  async process(areas: Areas[]): Promise<void> {
    this.logger.log(`Processing ${areas.length} OpenMeteo area(s)`);

    for (const area of areas) {
      await this.processArea(area);
    }
  }

  private async processArea(area: Areas) {
    try {
      const cfg = (area.action_config as unknown as WeatherActionConfig) || {};

      if (
        typeof cfg.latitude !== 'number' ||
        typeof cfg.longitude !== 'number'
      ) {
        this.logger.warn(
          `[${area.name}] Missing latitude/longitude in action_config. Skipping.`,
        );
        return;
      }

      const weather = await this.openMeteoService.fetchCurrentWeather(
        cfg.latitude,
        cfg.longitude,
        { hourly: ['temperature_2m', 'precipitation'] },
      );

      if (!weather || !weather.current_weather) {
        this.logger.warn(`[${area.name}] Could not fetch current weather.`);
        return;
      }

      const temp = weather.current_weather.temperature;
      let matched = false;
      let matchedValue: number | null = null;

      if (cfg.condition) {
        const { type, threshold } = cfg.condition;

        if (type === 'temp_above') {
          matched = temp > threshold;
          matchedValue = temp;
        } else if (type === 'temp_below') {
          matched = temp < threshold;
          matchedValue = temp;
        } else {
          this.logger.warn(
            `[${area.name}] Unsupported condition type: ${type}`,
          );
        }
      } else {
        matched = true;
        matchedValue = temp;
      }

      if (matched) {
        this.logger.log(
          `[${area.name}] Condition matched (value=${matchedValue}). Executing reaction.`,
        );
        await this.reactionExecutor.execute(area, { weather, matchedValue });
      } else {
        this.logger.log(
          `[${area.name}] Condition not met (value=${matchedValue}).`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error processing OpenMeteo area '${area.name}':`,
        error,
      );
    }
  }
}