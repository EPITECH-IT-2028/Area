import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { GraphQLModule } from '../graphql/graphql.module';
import { UserServicesService } from 'src/user-services/user-services.service';

@Module({
  imports: [GraphQLModule],
  controllers: [AreasController],
  providers: [AreasService, UserServicesService],
  exports: [AreasService, UserServicesService],
})
export class AreasModule {}
