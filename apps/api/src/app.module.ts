import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserServicesModule } from './user-services/user-services.module';
import { AreasModule } from './areas/areas.module';
import { GraphQLModule } from './graphql/graphql.module';
import { WorkersModule } from './workers/global-worker.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule,
    AuthModule,
    UsersModule,
    UserServicesModule,
    AreasModule,
    WorkersModule,
  ],
})
export class AppModule {}
