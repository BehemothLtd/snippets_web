import gql from "graphql-tag";

export const fetchTagGQL = gql`
  query {
    tags {
      id
      name
    }
  }
`;

