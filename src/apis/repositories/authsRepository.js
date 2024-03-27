import gqlRequest from "@/apis/gqlClient";

import { SignInMutation, SignUpMutation, UsersPasswordResetEmailSubmitMutation, UsersPasswordResetFormSubmitMutation } from "@/apis/mutations";

export default {
  signIn(input, options = { loading: true, toast: true }) {
    return gqlRequest(SignInMutation, input, options);
  },

  signUp(input, options = { loading: true, toast: true }) {
    return gqlRequest(SignUpMutation, input, options);
  },

  sendPasswordResetEmail(input, options = { loading: true, toast: true }) {
    return gqlRequest(UsersPasswordResetEmailSubmitMutation, input, options);
  },

  resetPassword(input, options = { loading: true, toast: true }) {
    return gqlRequest(UsersPasswordResetFormSubmitMutation, input, options);
  },
};
