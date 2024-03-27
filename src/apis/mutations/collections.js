import gql from "graphql-tag";

export const createCollectionGQL = gql`
mutation ($input: CollectionInput!) {
  collectionCreate(input: $input) {
    collection {
        id
        title
        count
        snippets {
            id
            title
        }
    }
  }
}
`;

export const updateCollectionGQL = gql`
  mutation ($id: ID!, $input: CollectionInput!) {
    collectionUpdate(id: $id, input: $input) {
      collection {
        id
        title
        count
        snippets {
            id
            title
        }
      }
    }
  }
`;


export const deleteCollectionGQL = gql`
mutation ($id: ID!) {
  collectionDelete(id: $id) {
    message
  }
}
`;


export const collectionAddSnippetGQL = gql`
mutation ($id: ID!, $snippetId: ID!) {
  collectionAddSnippet(id: $id, snippetId: $snippetId) {
      collection {
          id
          title
          count
          snippets {
              id
              title
          }
      }
  }
}
`;

export const collectionRemoveSnippetGQL = gql`
mutation ($id: ID!, $snippetId: ID!) {
  collectionRemoveSnippet(id: $id, snippetId: $snippetId) {
      collection {
          id
          title
          count
          snippets {
              id
              title
          }
      }
  }
}
`;
