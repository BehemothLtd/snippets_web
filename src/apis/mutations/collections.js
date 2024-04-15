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
    CollectionAddSnippet(id: $id, snippetId: $snippetId)
  }
`;

export const collectionRemoveSnippetGQL = gql`
  mutation ($id: ID!, $snippetId: ID!) {
    CollectionRemoveSnippet(id: $id, snippetId: $snippetId) {
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
