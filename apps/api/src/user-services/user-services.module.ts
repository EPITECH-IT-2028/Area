import { Module } from '@nestjs/common';
import { UserServicesService } from './user-services.service';
import { UserServicesController } from './user-services.controller';
import { GraphQLModule } from '../graphql/graphql.module';

@Module({
  imports: [GraphQLModule],
  controllers: [UserServicesController],
  providers: [UserServicesService],
  exports: [UserServicesService],
})
export class UserServicesModule {}
