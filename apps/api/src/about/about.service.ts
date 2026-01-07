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

  async getAboutInfo(clientIp: string) {
    const getServices = async () => {
      const result = await this.graphqlService.adminQuery<{
        services: { name: string; display_name: string; icon_url: string }[];
      }>(GetAllServicesQuery, {});
      return result.services.map((service) => ({
        name: service.name,
        display_name: service.display_name,
        icon_url: service.icon_url,
      }));
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
        const actions = await getActionsService(serviceName.name);
        const reactions = await getReactionsService(serviceName.name);

        return {
          name: serviceName.name,
          display_name: serviceName.display_name,
          icon_url: serviceName.icon_url,
          actions,
          reactions,
        };
      }),
    );

    return {
      client: {
        host: clientIp,
      },
      server: {
        current_time: Date.now(),
        services: servicesWithDetails,
      },
    };
  }
}
