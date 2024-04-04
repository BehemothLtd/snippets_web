import gql from "graphql-tag";

export const CORE_SNIPPET_FIELDS = gql`
fragment PublicSnippetFragment on Snippet {
  id
  title
  content
  userId
  slug
  snippetType
  favoritesCount
  favorited
  tags {
    id
    name
  }
}
`;
