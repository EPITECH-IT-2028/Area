import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Actions, Areas, Reactions } from 'src/generated/graphql';
import { GraphQLService } from '../graphql/graphql.service';
import {
  CreateAreaQuery,
  GetActionByNameQuery,
  GetAllActiveAreasQuery,
  GetAreasByUserIdQuery,
  GetReactionByNameQuery,
} from 'src/graphql/queries/areas/areas';
import { CreateAreaDto } from './areas.controller';

@Injectable()
export class AreasService {
  constructor(private readonly graphqlService: GraphQLService) {}

  async getAllActiveAreas(): Promise<Areas[]> {
    const result = await this.graphqlService.adminQuery<{ areas: Areas[] }>(
      GetAllActiveAreasQuery,
      {},
    );

    if (!result.areas) {
      throw new NotFoundException('No active areas found');
    }

    return result.areas;
  }

  async getAreaById(id: string): Promise<Areas[]> {
    const result = await this.graphqlService.adminQuery<{ areas: Areas[] }>(
      GetAreasByUserIdQuery,
      { user_id: id },
    );

    if (!result.areas || result.areas.length === 0) {
      throw new NotFoundException(`Area with ID '${id}' not found`);
    }

    return result.areas;
  }

  async create(createAreaDto: CreateAreaDto, userId: string): Promise<Areas> {
    try {
      const actionResult = await this.graphqlService.adminQuery<{
        actions: Actions[];
      }>(GetActionByNameQuery, { name: createAreaDto.action_name });

      if (!actionResult.actions || actionResult.actions.length === 0) {
        throw new BadRequestException(
          `Action '${createAreaDto.action_name}' not found`,
        );
      }

      const reactionResult = await this.graphqlService.adminQuery<{
        reactions: Reactions[];
      }>(GetReactionByNameQuery, { name: createAreaDto.reaction_name });

      if (!reactionResult.reactions || reactionResult.reactions.length === 0) {
        throw new BadRequestException(
          `Reaction '${createAreaDto.reaction_name}' not found`,
        );
      }

      const action = actionResult.actions[0];
      const reaction = reactionResult.reactions[0];

      const data = await this.graphqlService.adminMutation<{
        insert_areas_one: Areas;
      }>(CreateAreaQuery, {
        user_id: userId,
        name: createAreaDto.name,
        description: createAreaDto.description,
        is_active: createAreaDto.is_active ?? true,
        action_id: action.id,
        action_config: createAreaDto.action_config,
        reaction_id: reaction.id,
        reaction_config: createAreaDto.reaction_config,
      });

      return data.insert_areas_one;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new Error(`Failed to create area: ${error}`);
    }
  }
}
