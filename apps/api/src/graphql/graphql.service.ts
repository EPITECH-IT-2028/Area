import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';

@Injectable()
export class GraphQLService {
  private client: GraphQLClient;

  constructor(private configService: ConfigService) {
    const endpoint = this.configService.get<string>('HASURA_GRAPHQL_ENDPOINT');
    const adminSecret = this.configService.get<string>(
      'HASURA_GRAPHQL_ADMIN_SECRET',
    );

    if (!endpoint || !adminSecret) {
      throw new Error('GraphQL endpoint or admin secret is not configured');
    }

    this.client = new GraphQLClient(endpoint, {
      headers: {
        'x-hasura-admin-secret': adminSecret,
      },
    });
  }

  async query<T>(query: string | DocumentNode, variables?: object): Promise<T> {
    return this.client.request<T>(query, variables);
  }

  async mutation<T>(
    mutation: string | DocumentNode,
    variables?: object,
  ): Promise<T> {
    return this.client.request<T>(mutation, variables);
  }
}
