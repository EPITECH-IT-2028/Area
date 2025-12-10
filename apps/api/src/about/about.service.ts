import { Injectable } from '@nestjs/common';
import { GraphQLService } from 'src/graphql/graphql.service';
import {
  GetActionsByServiceQuery,
  GetReactionsByServiceQuery,
} from 'src/graphql/queries/areas/areas';
import { GetAllServicesQuery } from 'src/graphql/queries/services/services';

@Injectable()
export class AboutService {
  constructor(private readonly graphqlService: GraphQLService) {}

  async getAboutInfo(clientHost: string) {
    const getServices = async () => {
      const result = await this.graphqlService.adminQuery<{
        services: { name: string }[];
      }>(GetAllServicesQuery, {});
      return result.services.map((service) => service.name);
    };

    const services = await getServices();

    const getActionsService = async (serviceName: string) => {
      const result = await this.graphqlService.adminQuery<{
        actions: { name: string; description: string }[];
      }>(GetActionsByServiceQuery, { service_name: serviceName });
      return result.actions.map((action) => ({
        name: action.name,
        description: action.description,
      }));
    };

    const getReactionsService = async (serviceName: string) => {
      const result = await this.graphqlService.adminQuery<{
        reactions: { name: string; description: string }[];
      }>(GetReactionsByServiceQuery, { service_name: serviceName });
      return result.reactions.map((reaction) => ({
        name: reaction.name,
        description: reaction.description,
      }));
    };

    const servicesWithDetails = await Promise.all(
      services.map(async (serviceName) => {
        const actions = await getActionsService(serviceName);
        const reactions = await getReactionsService(serviceName);

        return {
          name: serviceName,
          actions,
          reactions,
        };
      }),
    );

    return {
      client: {
        host: clientHost,
      },
      server: {
        current_time: Date.now(),
        services: servicesWithDetails,
      },
    };
  }
}
