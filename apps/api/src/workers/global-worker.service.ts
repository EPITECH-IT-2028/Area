import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AreasService } from 'src/areas/areas.service';
import { Areas } from 'src/generated/graphql';
import { IActionWorker } from './interfaces/worker.interface';
import { EmailWorker } from './actions/email/email.worker';
import { GithubWorker } from './actions/commit/github.worker';

@Injectable()
export class GlobalWorkerService {
  private readonly logger = new Logger(GlobalWorkerService.name);

  private readonly actionWorkers = new Map<string, IActionWorker>();

  constructor(
    private readonly areasService: AreasService,
    private readonly emailWorker: EmailWorker,
    private readonly githubWorker: GithubWorker,
  ) {
    this.actionWorkers.set('new_email', this.emailWorker);
    this.actionWorkers.set('new_commit_push', this.githubWorker);
    const registered = [...this.actionWorkers.keys()].join(', ');
    this.logger.log(`Registered action workers: ${registered}`);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async processAllAreas() {
    this.logger.log('Starting global worker cycle...');

    try {
      let areas: Areas[];
      try {
        areas = await this.areasService.getAllActiveAreas();
      } catch (error) {
        if (error instanceof NotFoundException) {
          this.logger.log('No active areas found');
          return;
        }
        throw error;
      }

      this.logger.log(`Found ${areas.length} active areas`);

      const areasByAction = this.groupAreasByAction(areas);

      for (const [actionName, actionAreas] of areasByAction.entries()) {
        await this.dispatchToWorker(actionName, actionAreas);
      }

      this.logger.log('Global worker cycle completed');
    } catch (error) {
      this.logger.error('Error in global worker:', error);
    }
  }

  private groupAreasByAction(areas: Areas[]): Map<string, Areas[]> {
    const grouped = new Map<string, Areas[]>();

    for (const area of areas) {
      const actionName = area.action.name;

      if (!grouped.has(actionName)) {
        grouped.set(actionName, []);
      }

      grouped.get(actionName)!.push(area);
    }

    return grouped;
  }

  private async dispatchToWorker(actionName: string, areas: Areas[]) {
    const worker = this.actionWorkers.get(actionName);

    if (!worker) {
      const available = [...this.actionWorkers.keys()].join(', ');
      this.logger.warn(`No worker registered for action: ${actionName}. Available workers: ${available}`);
      return;
    }

    this.logger.log(
      `Dispatching ${areas.length} areas to ${actionName} worker`,
    );

    try {
      await worker.process(areas);
    } catch (error) {
      this.logger.error(`Error in ${actionName} worker:`, error);
    }
  }
}
