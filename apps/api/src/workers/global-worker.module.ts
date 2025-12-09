import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '../graphql/graphql.module';
import { AreasModule } from '../areas/areas.module';

import { GlobalWorkerService } from './global-worker.service';
import { EmailWorker } from './actions/email/email.worker';
import { OAuthService } from './actions/email/oauth.service';
import { GmailService } from './actions/email/gmail.service';
import { ReactionExecutor } from './reactions/reactions-executor.service';
import { DiscordWebhookHandler } from './reactions/discord/discord-webhook.handler';

@Module({
  imports: [ScheduleModule.forRoot(), GraphQLModule, AreasModule],
  providers: [
    GlobalWorkerService,
    EmailWorker,
    OAuthService,
    GmailService,
    ReactionExecutor,
    DiscordWebhookHandler,
  ],
})
export class WorkersModule {}
