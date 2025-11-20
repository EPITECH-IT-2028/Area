import gql from 'graphql-tag';

export const GetUsersQuery = gql`
  query GetUsers {
    users {
      id
      email
      name
      created_at
    }
  }
`;

export const GetUserQuery = gql`
  query GetUser($id: uuid!) {
    users_by_pk(id: $id) {
      id
      email
      name
      created_at
    }
  }
`;

export const CreateUserQuery = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    insert_users_one(
      object: { email: $email, name: $name, password: $password }
    ) {
      id
      name
      password
      email
    }
  }
`;

export const UpdateUserQuery = gql`
  mutation UpdateUser($id: uuid!, $name: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
      email
    }
  }
`;

export const DeleteUserQuery = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;
