import gql from "graphql-tag";

export const createTagGQL = gql`
mutation ($input: TagInput!) {
  tagCreate(input: $input) {
    tag {
      id
      name
    }
  }
}
`;

export const deleteTagGQL =gql`
mutation ($id: ID!) {
  tagDelete(id: $id) {
    message
  }
}
`
