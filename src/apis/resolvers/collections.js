import gql from "graphql-tag";

export const getCollectionListGQL = gql`
  query ($input: PagyInput!) {
    Collections(input: $input) {
      collection {
        id
        title
        userId
        createdAt
        updatedAt
      }
    }
  }
`;

export const getCollectionGQL = gql`
  query ($id: ID!) {
    selfCollection(id: $id) {
      id
      title
      count
      snippets {
        id
        author
        content
        title
        decryptedContent
        previewContent
        snippetType
        tags {
          name
        }
      }
    }
  }
`;
