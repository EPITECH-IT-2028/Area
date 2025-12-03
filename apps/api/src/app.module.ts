import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserServicesModule } from './user-services/user-services.module';
import { GraphQLModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule,
    AuthModule,
    UsersModule,
    UserServicesModule,
  ],
})
export class AppModule {}
