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