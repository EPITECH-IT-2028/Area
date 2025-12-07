import { Injectable, NotFoundException } from '@nestjs/common';
import type { Areas } from 'src/generated/graphql';
import { GraphQLService } from '../graphql/graphql.service';
import {
  CreateAreaQuery,
  GetAllActiveAreasQuery
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

  async create(createAreaDto: CreateAreaDto, userId: string): Promise<Areas> {
    try {
      const data = await this.graphqlService.adminMutation<{
        insert_areas_one: Areas;
      }>(CreateAreaQuery, { ...createAreaDto, user_id: userId });

      return data.insert_areas_one;
    } catch (error) {
      throw new Error(`Failed to create area: ${error}`);
    }
  }
}