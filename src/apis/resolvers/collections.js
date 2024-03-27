import gql from "graphql-tag";

export const getCollectionListGQL = gql`
  query ($input: PagyInput!) {
    selfCollections(input: $input) {
      collection {
        id
        count
        title
        snippets {
          id
          title
        }
      }
      metadata
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
