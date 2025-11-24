import { Injectable, NotFoundException } from '@nestjs/common';
import type { Users, CreateUserMutationVariables } from 'src/generated/graphql';
import { GraphQLService } from '../graphql/graphql.service';
import {
  GetUsersQuery,
  GetUserQuery,
  GetUserByEmailQuery,
  CreateUserQuery,
  UpdateUserQuery,
  DeleteUserQuery,
} from 'src/graphql/queries/users/users';

@Injectable()
export class UsersService {
  constructor(private readonly graphqlService: GraphQLService) {}

  async findAll(): Promise<Users[]> {
    try {
      const data = await this.graphqlService.query<{ users: Users[] }>(
        GetUsersQuery,
      );
      return data.users;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error}`);
    }
  }

  async findOne(id: string): Promise<Users> {
    try {
      const data = await this.graphqlService.query<{ users_by_pk: Users }>(
        GetUserQuery,
        { id },
      );

      if (!data.users_by_pk) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return data.users_by_pk;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to fetch user: ${error}`);
    }
  }

  async findByEmail(email: string): Promise<Users | null> {
    try {
      const data = await this.graphqlService.adminQuery<{ users: Users[] }>(
        GetUserByEmailQuery,
        { email },
      );

      return data.users[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch user by email: ${error}`);
    }
  }

  async create(input: CreateUserMutationVariables): Promise<Users> {
    try {
      const data = await this.graphqlService.adminMutation<{
        insert_users_one: Users;
      }>(CreateUserQuery, input);
      return data.insert_users_one;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async update(id: string, input: { name?: string }): Promise<Users> {
    try {
      const data = await this.graphqlService.mutation<{
        update_users_by_pk: Users;
      }>(UpdateUserQuery, { id, name: input.name });

      if (!data.update_users_by_pk) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return data.update_users_by_pk;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update user: ${error}`);
    }
  }

  async delete(id: string): Promise<{ success: boolean }> {
    try {
      const data = await this.graphqlService.mutation<{
        delete_users_by_pk: { id: string };
      }>(DeleteUserQuery, { id });

      if (!data.delete_users_by_pk) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return { success: true };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete user: ${error}`);
    }
  }
}
