import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GraphQLService } from '../graphql/graphql.service';
import gql from 'graphql-tag';
import { GetAllActiveAreasQuery } from 'src/graphql/queries/areas/areas';
import { AreasService } from 'src/areas/areas.service';
import { Areas } from 'src/generated/graphql';
import { EmailWorker } from './actions/email.worker';

@Injectable()
export class GlobalWorkerService {
  private readonly logger = new Logger(GlobalWorkerService.name);

  // Map des workers par type d'action
  private readonly actionWorkers = new Map<string, any>();

  constructor(
    private readonly graphqlService: GraphQLService,
    private readonly areasService: AreasService,
    private readonly emailWorker: EmailWorker,
  ) {
    // Enregistrer les workers par nom d'action
    this.actionWorkers.set('new_email', this.emailWorker);
    // this.actionWorkers.set('new_push', this.githubWorker);
    // this.actionWorkers.set('new_issue', this.githubWorker);
    // Ajouter d'autres mappings...
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async processAllAreas() {
    this.logger.log('🔄 Starting global worker cycle...');

    try {
      const areas = await this.areasService.getAllActiveAreas();
      this.logger.log(`📋 Found ${areas.length} active areas`);

      const areasByAction = this.groupAreasByAction(areas);

      for (const [actionName, actionAreas] of areasByAction.entries()) {
        await this.dispatchToWorker(actionName, actionAreas);
      }

      this.logger.log('✅ Global worker cycle completed');
    } catch (error) {
      this.logger.error('❌ Error in global worker:', error);
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
      this.logger.warn(`⚠️  No worker registered for action: ${actionName}`);
      return;
    }

    this.logger.log(`🚀 Dispatching ${areas.length} areas to ${actionName} worker`);

    try {
      await worker.process(areas);
    } catch (error) {
      this.logger.error(`❌ Error in ${actionName} worker:`, error);
    }
  }
}