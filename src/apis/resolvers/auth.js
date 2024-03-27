import gql from "graphql-tag";

export const selfInfoGQL = gql`
  query ($includeSelfInfo: Boolean!) {
    SelfInfo @include(if: $includeSelfInfo) {
      id
      email
      fullName
    }
  }
`;
