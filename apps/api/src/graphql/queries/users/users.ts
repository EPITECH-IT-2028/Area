export const GetUsersQuery = `
query GetUsers {
  users {
    id
    email
    name
    created_at
  }
}
`;

export const GetUserQuery = `
  query GetUser($id: uuid!) {
    users_by_pk(id: $id) {
      id
      email
      name
      created_at
    }
  }
  `;

export const CreateUserQuery = `
mutation CreateUser($email: String!, $name: String!, $password: String!) {
  insert_users_one(object: { email: $email, name: $name, password: $password }) {
    id
    name
    password
    email
  }
}
`;

export const UpdateUserQuery = `
mutation UpdateUser($id: uuid!, $name: String!) {
  update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
    id
    name
    email
  }
}
`;

export const DeleteUserQuery = `
mutation DeleteUser($id: uuid!) {
  delete_users_by_pk(id: $id) {
    id
  }
}
`;
