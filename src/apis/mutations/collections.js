import gql from "graphql-tag";

export const createCollectionGQL = gql`
  mutation ($input: CollectionInput!) {
    CollectionCreate(input: $input) {
      collection {
        id
        title
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
    CollectionUpdate(id: $id, input: $input) {
      collection {
        id
        title
        userId
        createdAt
        updatedAt
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
    CollectionDelete(id: $id)
  }
`;

export const collectionAddSnippetGQL = gql`
  mutation ($id: ID!, $snippetId: ID!) {
    CollectionAddSnippet(id: $id, snippetId: $snippetId)
  }
`;

export const collectionRemoveSnippetGQL = gql`
  mutation ($id: ID!, $snippetId: ID!) {
    CollectionRemoveSnippet(id: $id, snippetId: $snippetId)
  }
`;
