import gql from "graphql-tag";

export const createSnippetGQL = gql`
  mutation ($input: SnippetInput!) {
    SnippetCreate(input: $input) {
      snippet {
        id
        title
        content
        userId
        slug
        snippetType
        favoritesCount
        favorited
        pinned
        createdAt
        updatedAt
      }
    }
  }
`;

export const updateSnippetGQL = gql`
  mutation ($id: ID!, $input: SnippetInput!) {
    SnippetUpdate(id: $id, input: $input) {
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
  mutation SnippetDelete($id: ID!) {
    SnippetDelete(id: $id)
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
  mutation SnippetAddTag($id: ID!, $tagId: ID!) {
    SnippetAddTag(id: $id, tagId: $tagId)
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
