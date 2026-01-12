import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';

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
    const queryString = print(query);
    const result = await this.client.rawRequest<T>(queryString, variables);
    return result.data;
  }

  async mutation<T>(mutation: DocumentNode, variables?: object): Promise<T> {
    const mutationString = print(mutation);
    const result = await this.client.rawRequest<T>(mutationString, variables);
    return result.data;
  }

  async adminQuery<T>(query: DocumentNode, variables?: object): Promise<T> {
    const queryString = print(query);
    const result = await this.adminClient.rawRequest<T>(queryString, variables);
    return result.data;
  }

  async adminMutation<T>(
    mutation: DocumentNode,
    variables?: object,
  ): Promise<T> {
    const mutationString = print(mutation);
    const result = await this.adminClient.rawRequest<T>(
      mutationString,
      variables,
    );
    return result.data;
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
    const queryString = print(query);
    const result = await userClient.rawRequest<T>(queryString, variables);
    return result.data;
  }
}
