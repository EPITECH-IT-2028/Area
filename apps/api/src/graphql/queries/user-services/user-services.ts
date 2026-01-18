import gql from 'graphql-tag';

export const GetUserServiceQuery = gql`
  query GetUserService($userId: uuid!, $serviceId: uuid!) {
    user_services(
      where: { user_id: { _eq: $userId }, service_id: { _eq: $serviceId } }
      limit: 1
    ) {
      id
      user_id
      service_id
      access_token
      refresh_token
      token_expiry
      is_connected
      credentials
      created_at
      updated_at
    }
  }
`;

export const GetUserServicesByUserQuery = gql`
  query GetUserServicesByUser($userId: uuid!) {
    user_services(where: { user_id: { _eq: $userId } }) {
      id
      user_id
      service_id
      is_connected
      last_sync
      created_at
      updated_at
      service {
        id
        name
        display_name
        icon_url
      }
    }
  }
`;

export const GetUserServiceByIdQuery = gql`
  query GetUserServiceById($id: uuid!) {
    user_services_by_pk(id: $id) {
      id
      user_id
      service_id
      is_connected
      created_at
      updated_at
    }
  }
`;

export const CreateUserServiceMutation = gql`
  mutation CreateUserService(
    $userId: uuid!
    $serviceId: uuid!
    $accessToken: String
    $refreshToken: String
    $tokenExpiry: timestamptz
    $credentials: jsonb
  ) {
    insert_user_services_one(
      object: {
        user_id: $userId
        service_id: $serviceId
        access_token: $accessToken
        refresh_token: $refreshToken
        token_expiry: $tokenExpiry
        credentials: $credentials
        is_connected: true
      }
      on_conflict: {
        constraint: user_services_user_id_service_id_key
        update_columns: [
          access_token
          refresh_token
          token_expiry
          credentials
          is_connected
          updated_at
        ]
      }
    ) {
      id
      user_id
      service_id
      is_connected
    }
  }
`;

export const UpdateUserServiceTokensMutation = gql`
  mutation UpdateUserServiceTokens(
    $id: uuid!
    $accessToken: String
    $refreshToken: String
    $tokenExpiry: timestamptz
  ) {
    update_user_services_by_pk(
      pk_columns: { id: $id }
      _set: {
        access_token: $accessToken
        refresh_token: $refreshToken
        token_expiry: $tokenExpiry
        updated_at: "now()"
      }
    ) {
      id
      user_id
      service_id
      is_connected
    }
  }
`;

export const DisconnectUserServiceMutation = gql`
  mutation DisconnectUserService($id: uuid!) {
    update_user_services_by_pk(
      pk_columns: { id: $id }
      _set: {
        is_connected: false
        access_token: null
        refresh_token: null
        token_expiry: null
      }
    ) {
      id
      is_connected
    }
  }
`;

export const DeleteUserServiceMutation = gql`
  mutation DeleteUserService($id: uuid!) {
    delete_user_services_by_pk(id: $id) {
      id
    }
  }
`;