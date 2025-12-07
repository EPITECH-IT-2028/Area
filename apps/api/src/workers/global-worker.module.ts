import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '../graphql/graphql.module';
import { AreasModule } from '../areas/areas.module';

import { GlobalWorkerService } from './global-worker.service';
import { EmailWorker } from './actions/email.worker';
import { ReactionExecutor } from './reactions/reactions-executor.service';
// Importez d'autres workers ici (ex: GitHubWorker) si vous en avez

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule,
    AreasModule,
  ],
  providers: [
    GlobalWorkerService,
    EmailWorker,
    ReactionExecutor,
  ],
})
export class WorkersModule {}