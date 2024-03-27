import gql from "graphql-tag";
import combineQuery from "graphql-combine-query";

import { CORE_SNIPPET_FIELDS } from "../fragment/snippet";
import { METADATA_FIELDS } from "../fragment/shared";
import { selfInfoGQL } from "@/apis/resolvers/auth";

export const getSnippetsListGQL = gql`
  ${CORE_SNIPPET_FIELDS}
  ${METADATA_FIELDS}
  query ($snippetInput: PagyInput!, $snippetQuery: SnippetsQuery!) {
    Snippets(input: $snippetInput, query: $snippetQuery) {
      collection {
        ...PublicSnippetFragment
      }
      metadata {
        ...MetadataFragment
      }
    }
  }
`;

// <------Output------>
// export const requestHomePageGQL = gql`
//   ${CORE_SNIPPET_FIELDS}
//   ${METADATA_FIELDS}
//   query RequestHomepage(
//     $snippetInput: PagyInput!
//     $snippetQuery: SnippetsQuery!
//     $authenticate: Boolean = false
//   ) {
//     msSnippets(input: $snippetInput, query: $snippetQuery) {
//       collection {
//         ...PublicSnippetFragment
//       }
//       metadata {
//         ...MetadataFragment
//       }
//     }
//     selfInfo @include(if: $authenticate) {
//       id
//       email
//       fullName
//       name
//     }
//   }
// `;

export const getSnippetGQL = gql`
  ${CORE_SNIPPET_FIELDS}
  query ($slug: String!, $includeSnippetDetail: Boolean = true) {
    Snippet(slug: $slug) @include(if: $includeSnippetDetail) {
      ...PublicSnippetFragment
    }
  }
`;

export const requestHomePageGQL = combineQuery("HomePageQuery")
  .add(getSnippetsListGQL)
  .add(getSnippetGQL)
  .add(selfInfoGQL).document;

export const getMySnippetGQL = gql`
  query ($id: ID!) {
    selfSnippet(id: $id) {
      id
      title
      slug
      content
      decryptedContent
      snippetType
      snippetsTags {
        id
        tagId
        tagName
      }
    }
  }
`;

export const getMySnippetsGQL = gql`
  query ($input: PagyInput!) {
    selfSnippets(input: $input) {
      collection {
        id
        title
        slug
        snippetType
        previewContent
        tags {
          id
          name
        }
      }
      metadata
    }
  }
`;

export const getPinnedSnippetsGQL = gql`
  query ($input: PagyInput!) {
    selfPinnedSnippets(input: $input) {
      collection {
        id
        title
        slug
        previewContent
        pinned
        snippetType
        tags {
          id
          name
        }
      }
      metadata
    }
  }
`;

export const decryptSnippetGQL = gql`
  query ($id: ID!, $privateKey: String!) {
    selfSnippetDecrypt(id: $id, privateKey: $privateKey) {
      id
      title
      slug
      content
      decryptedContent
      snippetType
      snippetsTags {
        id
        tagId
        tagName
      }
    }
  }
`;

export const getFavoritedSnippetsGQL = gql`
  query ($input: PagyInput!) {
    selfFavoritedSnippets(input: $input) {
      collection {
        id
        title
        slug
        previewContent
        pinned
        snippetType
        tags {
          id
          name
        }
      }
      metadata
    }
  }
`;
