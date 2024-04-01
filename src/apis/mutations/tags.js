import gql from "graphql-tag";

export const createTagGQL = gql`
mutation ($input: TagInput!) {
  TagCreate(input: $input) {
    tag {
      id
      name
    }
  }
}
`;

export const editTagGQL =gql`
mutation ($id: ID!, $input: TagInput!) {
  TagUpdate(id: $id, input: $input) {
    tag {
      id
      name
      lockVersion
      self
      numberOfUsage
    }
  }
}
`

export const deleteTagGQL =gql`
mutation ($id: ID!) {
  TagDelete(id: $id) {
    message
  }
}
`
