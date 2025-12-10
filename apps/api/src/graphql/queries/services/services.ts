import { gql } from 'graphql-tag';

export const GetServiceByNameQuery = gql`
  query GetServiceByName($name: String!) {
    services(where: { name: { _eq: $name } }, limit: 1) {
      id
      name
      display_name
      auth_type
    }
  }
`;

export const GetAllServicesQuery = gql`
  query GetAllServices {
    services {
      id
      name
      display_name
      auth_type
    }
  }
`;
