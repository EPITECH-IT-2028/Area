import { gql } from 'graphql-tag';

export const GetAllActiveAreasQuery = gql`
  query GetAllActiveAreas {
    areas(where: { is_active: { _eq: true } }) {
      id
      user_id
      name
      action_id
      action_config
      reaction_id
      reaction_config
      action {
        id
        name
        event_type
        service {
          name
        }
      }
      reaction {
        id
        name
        action_type
        service {
          name
        }
      }
      user {
        user_services {
          id
          access_token
          refresh_token
          token_expiry
          service {
            name
          }
        }
      }
    }
  }
`;

export const GetActionByNameQuery = gql`
  query GetActionByName($name: String!) {
    actions(
      where: { name: { _eq: $name }, is_active: { _eq: true } }
      limit: 1
    ) {
      id
      name
      display_name
      event_type
      description
      config_schema
      service {
        id
        name
        display_name
      }
    }
  }
`;

export const GetActionsByServiceQuery = gql`
  query GetActionsByService($service_name: String!) {
    actions(where: { service: { name: { _eq: $service_name } } }) {
      id
      name
      display_name
      event_type
      description
      config_schema
      service {
        id
        name
        display_name
      }
    }
  }
`;

export const GetReactionsByServiceQuery = gql`
  query GetReactionsByService($service_name: String!) {
    reactions(where: { service: { name: { _eq: $service_name } } }) {
      id
      name
      display_name
      action_type
      description
      config_schema
      service {
        id
        name
        display_name
      }
    }
  }
`;

export const GetReactionByNameQuery = gql`
  query GetReactionByName($name: String!) {
    reactions(
      where: { name: { _eq: $name }, is_active: { _eq: true } }
      limit: 1
    ) {
      id
      name
      display_name
      action_type
      description
      config_schema
      service {
        id
        name
        display_name
      }
    }
  }
`;

export const CreateAreaQuery = gql`
  mutation CreateArea(
    $user_id: uuid!
    $name: String!
    $description: String
    $is_active: Boolean
    $action_id: uuid!
    $action_config: jsonb
    $reaction_id: uuid!
    $reaction_config: jsonb
  ) {
    insert_areas_one(
      object: {
        user_id: $user_id
        name: $name
        description: $description
        is_active: $is_active
        action_id: $action_id
        action_config: $action_config
        reaction_id: $reaction_id
        reaction_config: $reaction_config
      }
    ) {
      id
      name
      is_active
      created_at
    }
  }
`;
