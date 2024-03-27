import gql from "graphql-tag";

export const createSnippetGQL = gql`
  mutation ($input: SnippetInput!) {
    msSnippetCreate(input: $input) {
      snippet {
        id
        title
        content
      }
    }
  }
`;

export const updateSnippetGQL = gql`
  mutation ($id: ID!, $input: SnippetInput!) {
    msSnippetUpdate(id: $id, input: $input) {
      snippet {
        id
        title
        content
        snippetType
      }
    }
  }
`;

export const deleteSnippetGQL = gql`
  mutation ($id: ID!) {
    msSnippetDelete(id: $id) {
      message
    }
  }
`;

export const likeSnippetGQL = gql`
  mutation ($id: ID!) {
    SnippetFavorite(id: $id) {
      favorited
    }
  }
`;

export const pinSnippetGQL = gql`
  mutation ($id: ID!) {
    SnippetPin(id: $id)
  }
`;

export const addSnippetTagGQL = gql`
  mutation ($input: SnippetTagInput!) {
    snippetTagCreate(input: $input) {
      message
    }
  }
`;

export const deleteSnippetTagGQL = gql`
  mutation ($input: SnippetTagInput!) {
    snippetTagDelete(input: $input) {
      message
    }
  }
`;

export const snippetPublicGQL = gql`
  mutation ($id: ID!, $privateKey: String!) {
    msSnippetPublic(id: $id, privateKey: $privateKey) {
      snippet {
        id
        title
        content
        snippetType
        tags {
          id
          name
        }
      }
    }
  }
`;

export const snippetPrivateGQL = gql`
  mutation ($id: ID!, $privateKey: String!) {
    msSnippetPrivate(id: $id, privateKey: $privateKey) {
      snippet {
        id
        title
        content
        snippetType
        tags {
          id
          name
        }
      }
    }
  }
`;
