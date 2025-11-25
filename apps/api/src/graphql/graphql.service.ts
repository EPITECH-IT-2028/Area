import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';

@Injectable()
export class GraphQLService {
  private client: GraphQLClient;
  private adminClient: GraphQLClient;

  constructor(private configService: ConfigService) {
    const endpoint = this.configService.get<string>('HASURA_GRAPHQL_ENDPOINT');
    if (!endpoint) {
      throw new Error(
        'Graphql endpoint is not defined in the environment variables',
      );
    }

    this.client = new GraphQLClient(endpoint);

    this.adminClient = new GraphQLClient(endpoint, {
      headers: {
        'x-hasura-admin-secret':
          this.configService.get<string>('HASURA_GRAPHQL_ADMIN_SECRET') || '',
      },
    });
  }

  async query<T>(query: DocumentNode, variables?: object): Promise<T> {
    return this.client.request<T>(query, variables);
  }

  async mutation<T>(mutation: DocumentNode, variables?: object): Promise<T> {
    return this.client.request<T>(mutation, variables);
  }

  async adminQuery<T>(query: DocumentNode, variables?: object): Promise<T> {
    return this.adminClient.request<T>(query, variables);
  }

  async adminMutation<T>(
    mutation: DocumentNode,
    variables?: object,
  ): Promise<T> {
    return this.adminClient.request<T>(mutation, variables);
  }

  async queryAsUser<T>(
    query: DocumentNode,
    userId: string,
    variables?: object,
  ): Promise<T> {
    const userClient = new GraphQLClient(
      this.configService.get<string>('HASURA_GRAPHQL_ENDPOINT') || '',
      {
        headers: {
          'x-hasura-role': 'user',
          'x-hasura-user-id': userId,
        },
      },
    );
    return userClient.request<T>(query, variables);
  }
}
