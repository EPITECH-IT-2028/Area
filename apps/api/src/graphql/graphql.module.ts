import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLService } from './graphql.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [GraphQLService],
  exports: [GraphQLService],
})
export class GraphQLModule {}
