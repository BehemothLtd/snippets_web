import gqlRequest from "@/apis/gqlClient";

// Queries
import {
  getSnippetsListGQL,
  getSnippetGQL,
  requestHomePageGQL,
  requestSnippetEditGql,
} from "@/apis/resolvers/snippets";

// Mutations
import {
  createSnippetGQL,
  likeSnippetGQL,
  updateSnippetGQL,
  deleteSnippetGQL,
  pinSnippetGQL,
} from "@/apis/mutations/snippets";

export default {
  // ==================QUERY======================

  homepage(variables, options = { loading: true, toast: false }) {
    return gqlRequest(requestHomePageGQL, variables, options);
  },

  list(variables, options = { loading: true, toast: false }) {
    return gqlRequest(getSnippetsListGQL, variables, options);
  },

  detail(slug, options = { loading: true, toast: false }) {
    return gqlRequest(getSnippetGQL, { slug }, options);
  },

  mySnippet(slug, options = { loading: true, toast: false }) {
    return gqlRequest(requestSnippetEditGql, { slug }, options);
  },

  // ==================MUTATION======================
  create(input) {
    return gqlRequest(createSnippetGQL, { input });
  },

  like(id, options = { loading: false, toast: false }) {
    return gqlRequest(likeSnippetGQL, { id }, options);
  },

  pin(id, options = { loading: false, toast: false }) {
    return gqlRequest(pinSnippetGQL, { id }, options);
  },

  update(id, input) {
    return gqlRequest(updateSnippetGQL, { id, input });
  },

  delete(id) {
    return gqlRequest(deleteSnippetGQL, { id });
  },
};
