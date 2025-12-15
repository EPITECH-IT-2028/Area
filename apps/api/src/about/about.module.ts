import { Module } from '@nestjs/common';
import { GraphQLModule } from 'src/graphql/graphql.module';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';

@Module({
  imports: [GraphQLModule],
  controllers: [AboutController],
  providers: [AboutService],
  exports: [AboutService],
})
export class AboutModule {}
