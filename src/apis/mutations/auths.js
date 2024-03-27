import gql from "graphql-tag";

export const SignInMutation = gql`
  mutation ($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
      token
    }
  }
`;

export const SignUpMutation = gql`
  mutation ($input: SignUpInput!) {
    signUp(input: $input) {
      message
    }
  }
`;

export const UsersPasswordResetEmailSubmitMutation = gql`
  mutation ($email: String!) {
    UsersPasswordResetEmailSubmit(email: $email) {
      message
    }
  }
`;

export const UsersPasswordResetFormSubmitMutation = gql`
  mutation ($input: UsersPasswordResetInput!, $token: String!) {
    usersPasswordResetFormSubmit(input: $input, token: $token) {
      message
    }
  }
`;
