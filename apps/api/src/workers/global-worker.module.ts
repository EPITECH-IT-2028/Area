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
import { SendEmailHandler } from './reactions/gmail/send-email.handler';
import { GithubWorker } from './actions/commit/github.worker';
import { GithubService } from './services/github.service';
import { GithubCreateIssueHandler } from './reactions/github/create-issue.handler';
import { GithubCreateFileHandler } from './reactions/github/create-file.handler';
import { OpenMeteoWorker } from './actions/weather/open-meteo.worker';
import { OpenMeteoService } from './services/open-meteo.service';
import { GithubPullRequestWorker } from './actions/pull_request/github-pr.worker';
import { OutlookService } from './services/microsoft.service';
import { OutlookWorker } from './actions/email/outlook.worker';
import { SendOutlookEmailHandler } from './reactions/outlook/send-email.handler';
import { DiscordService } from './services/discord.service';
import { DiscordMessageWorker } from './actions/new_message/new-message.worker';
import { SendDiscordMessageHandler } from './reactions/discord/discord-message.handler';
import { SlackWebhookHandler } from './reactions/slack/slack-webhook.handler';
import { TeamsWebhookHandler } from './reactions/teams/teams-webhook.handler';
import { PipedreamWebhookHandler } from './reactions/pipedream/pipedream-webhook.handler';

@Module({
  imports: [ScheduleModule.forRoot(), GraphQLModule, AreasModule],
  providers: [
    GlobalWorkerService,
    EmailWorker,
    GmailService,
    OAuthService,
    GithubWorker,
    GithubPullRequestWorker,
    GithubService,
    ReactionExecutor,
    DiscordWebhookHandler,
    SendEmailHandler,
    GithubCreateIssueHandler,
    GithubCreateFileHandler,
    OpenMeteoWorker,
    OpenMeteoService,
    OutlookService,
    OutlookWorker,
    SendOutlookEmailHandler,
    DiscordService,
    DiscordMessageWorker,
    SendDiscordMessageHandler,
    SlackWebhookHandler,
    TeamsWebhookHandler,
    PipedreamWebhookHandler,
  ],
})
export class WorkersModule {}
