import gql from "graphql-tag";
import combineQuery from "graphql-combine-query";

import { CORE_SNIPPET_FIELDS } from "../fragment/snippet";
import { METADATA_FIELDS } from "../fragment/shared";
import { selfInfoGQL } from "@/apis/resolvers/auth";
import { fetchAllTagsGQL } from "@/apis/resolvers/tags";

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

export const requestSnippetEditGql = combineQuery("GetSnippetEditQuery")
  .add(getSnippetGQL)
  .add(fetchAllTagsGQL).document;

export const requestHomePageGQL = combineQuery("HomePageQuery")
  .add(getSnippetsListGQL)
  .add(getSnippetGQL)
  .add(selfInfoGQL).document;

export const getMySnippetGQL = gql`
  query ($id: ID!) {
    SelfSnippet(id: $id) {
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
  ${METADATA_FIELDS}
  query ($input: PagyInput!) {
    SelfSnippets(input: $input) {
      collection {
        id
        title
        slug
        snippetType
        content
        favoritesCount
        favorited
        pinned
        tags {
          id
          name
        }
        User {
          fullName
        }
      }
      metadata {
        ...MetadataFragment
      }
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
  query ($id: ID!, $passkey: String!) {
    SnippetDecryptContent(id: $id, passkey: $passkey)
  }
`;

export const getFavouritedSnippetsGQL = gql`
  ${METADATA_FIELDS}
  query ($input: PagyInput!) {
    SelfFavoritedSnippets(input: $input) {
      collection {
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
        lockVersion
      }
      metadata {
        ...MetadataFragment
      }
    }
  }
`;
