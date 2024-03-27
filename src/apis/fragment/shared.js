import gql from "graphql-tag";

export const METADATA_FIELDS = gql`
  fragment MetadataFragment on Metadata {
    total
    perPage
    page
    pages
    count
    next
    prev
    from
    to
  }
`;
