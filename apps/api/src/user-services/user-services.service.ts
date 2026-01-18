import { Injectable, NotFoundException } from '@nestjs/common';
import { GraphQLService } from '../graphql/graphql.service';
import {
  GetUserServiceQuery,
  GetUserServicesByUserQuery,
  GetUserServiceByIdQuery,
  CreateUserServiceMutation,
  UpdateUserServiceTokensMutation,
  DisconnectUserServiceMutation,
  DeleteUserServiceMutation,
} from 'src/graphql/queries/user-services/user-services';
import { GetServiceByNameQuery } from 'src/graphql/queries/services/services';
import type { User_Services, Services } from '../generated/graphql';

export interface CreateUserServiceDto {
  userId: string;
  serviceId: string;
  accessToken?: string;
  refreshToken?: string | null;
  tokenExpiry?: string | null;
  credentials?: any;
}

export interface UpdateUserServiceTokensDto {
  accessToken?: string;
  refreshToken?: string;
  tokenExpiry?: string;
}

@Injectable()
export class UserServicesService {
  constructor(private readonly graphqlService: GraphQLService) {}

  async findUserService(
    userId: string,
    serviceId: string,
  ): Promise<User_Services | null> {
    try {
      const data = await this.graphqlService.adminQuery<{
        user_services: User_Services[];
      }>(GetUserServiceQuery, { userId, serviceId });

      return data.user_services[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch user service: ${error}`);
    }
  }

  async findUserServicesByUser(userId: string): Promise<User_Services[]> {
    try {
      const data = await this.graphqlService.adminQuery<{
        user_services: User_Services[];
      }>(GetUserServicesByUserQuery, { userId });

      return data.user_services;
    } catch (error) {
      throw new Error(`Failed to fetch user services: ${error}`);
    }
  }

  async findUserServiceById(id: string): Promise<User_Services | null> {
    try {
      const data = await this.graphqlService.adminQuery<{
        user_services_by_pk: User_Services;
      }>(GetUserServiceByIdQuery, { id });

      return data.user_services_by_pk || null;
    } catch (error) {
      throw new Error(`Failed to fetch user service by id: ${error}`);
    }
  }

  async getServiceByName(name: string): Promise<Services | null> {
    try {
      const data = await this.graphqlService.adminQuery<{
        services: Services[];
      }>(GetServiceByNameQuery, { name });

      return data.services[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch service by name: ${error}`);
    }
  }

  async createOrUpdate(dto: CreateUserServiceDto): Promise<User_Services> {
    try {
      const data = await this.graphqlService.adminMutation<{
        insert_user_services_one: User_Services;
      }>(CreateUserServiceMutation, {
        userId: dto.userId,
        serviceId: dto.serviceId,
        accessToken: dto.accessToken,
        refreshToken: dto.refreshToken,
        tokenExpiry: dto.tokenExpiry,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        credentials: dto.credentials,
      });

      return data.insert_user_services_one;
    } catch (error) {
      throw new Error(`Failed to create/update user service: ${error}`);
    }
  }

  async updateTokens(
    id: string,
    dto: UpdateUserServiceTokensDto,
  ): Promise<User_Services> {
    try {
      const data = await this.graphqlService.adminMutation<{
        update_user_services_by_pk: User_Services;
      }>(UpdateUserServiceTokensMutation, {
        id,
        accessToken: dto.accessToken,
        refreshToken: dto.refreshToken,
        tokenExpiry: dto.tokenExpiry,
      });

      if (!data.update_user_services_by_pk) {
        throw new NotFoundException(`User service with ID ${id} not found`);
      }

      return data.update_user_services_by_pk;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update user service tokens: ${error}`);
    }
  }

  async disconnect(id: string): Promise<User_Services> {
    try {
      const data = await this.graphqlService.adminMutation<{
        update_user_services_by_pk: User_Services;
      }>(DisconnectUserServiceMutation, { id });

      if (!data.update_user_services_by_pk) {
        throw new NotFoundException(`User service with ID ${id} not found`);
      }

      return data.update_user_services_by_pk;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to disconnect user service: ${error}`);
    }
  }

  async delete(id: string): Promise<{ success: boolean }> {
    try {
      const data = await this.graphqlService.adminMutation<{
        delete_user_services_by_pk: { id: string };
      }>(DeleteUserServiceMutation, { id });

      if (!data.delete_user_services_by_pk) {
        throw new NotFoundException(`User service with ID ${id} not found`);
      }

      return { success: true };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete user service: ${error}`);
    }
  }
}
