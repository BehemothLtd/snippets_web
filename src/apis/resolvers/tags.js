import gql from "graphql-tag";

export const fetchTagGQL = gql`
  query ($tagId: ID!) {
    Tag(id: $tagId) {
      id
      name
      lockVersion
      self
      numberOfUsage
    }
  }
`;

export const fetchTagsGQL = gql`
  query ($tagInput: PagyInput!, $tagsQuery: TagsQuery!) {
    Tags(input: $tagInput, query: $tagsQuery) {
      collection {
        id
        name
        lockVersion
        self
        numberOfUsage
      }
      metadata {
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
    }
  }
`;

export const fetchAllTagsGQL = gql`
  query {
    TagsAll {
      id
      name
    }
  }
`;
