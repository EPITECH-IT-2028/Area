import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '../graphql/graphql.module';
import { AreasModule } from '../areas/areas.module';

import { GlobalWorkerService } from './global-worker.service';
import { EmailWorker } from './actions/email/email.worker';
import { OAuthService } from './services/oauth.service';
import { GmailService } from './services/gmail.service';
import { ReactionExecutor } from './reactions/reactions-executor.service';
import { DiscordWebhookHandler } from './reactions/discord/discord-webhook.handler';
import { GithubWorker } from './actions/commit/github.worker';
import { GithubService } from './services/github.service';

@Module({
  imports: [ScheduleModule.forRoot(), GraphQLModule, AreasModule],
  providers: [
    GlobalWorkerService,
    EmailWorker,
    GmailService,
    OAuthService,
    GithubWorker,
    GithubService,
    ReactionExecutor,
    DiscordWebhookHandler,
  ],
})
export class WorkersModule {}
