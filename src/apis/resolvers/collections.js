import gql from "graphql-tag";

import { METADATA_FIELDS } from "@/apis/fragment/shared";

export const getCollectionListGQL = gql`
  ${METADATA_FIELDS}
  query ($input: PagyInput!) {
    Collections(input: $input) {
      collection {
        id
        title
        userId
        createdAt
        updatedAt
        snippets {
          id
          content
          title
        }
      }
      metadata {
        ...MetadataFragment
      }
    }
  }
`;

export const getCollectionGQL = gql`
  query ($id: ID!) {
    Collection(id: $id) {
      id
      title
      snippets {
        id
        content
        title
        snippetType
        # tags {
        #   name
        # }
      }
    }
  }
`;
