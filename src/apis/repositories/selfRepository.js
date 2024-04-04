import gqlRequest from "@/apis/gqlClient";

// Queries
import {
  getMySnippetGQL,
  decryptSnippetGQL,
  getMySnippetsGQL,
  getPinnedSnippetsGQL,
  getFavoritedSnippetsGQL,
} from "@/apis/resolvers/snippets";

// Mutations
import {
  addSnippetTagGQL,
  deleteSnippetTagGQL,
  deleteSnippetGQL,
  snippetPublicGQL,
  snippetPrivateGQL,
} from "@/apis/mutations/snippets";

export default {
  // ==================QUERY======================
  show(id, options = { loading: true, toast: false }) {
    return gqlRequest(getMySnippetGQL, id, options);
  },

  decrypt(id, passkey) {
    return gqlRequest(decryptSnippetGQL, id, passkey);
  },

  getPinnedSnippets(input, options = { loading: true, toast: false }) {
    return gqlRequest(getPinnedSnippetsGQL, { input }, options);
  },

  addSnippetTag(input, options = { loading: false, toast: false }) {
    return gqlRequest(addSnippetTagGQL, input, options);
  },

  removeSnippetTag(payload, options = { loading: false, toast: false }) {
    return gqlRequest(deleteSnippetTagGQL, payload, options);
  },

  showMySnippets(input, options = { loading: true, toast: false }) {
    return gqlRequest(getMySnippetsGQL, { input }, options);
  },

  removeMySnippet(id, options = { loading: true, toast: false }) {
    return gqlRequest(deleteSnippetGQL, { id }, options);
  },

  snippetPublic(input, options = { loading: true, toast: false }) {
    return gqlRequest(snippetPublicGQL, input, options);
  },
  snippetPrivate(input, options = { loading: true, toast: false }) {
    return gqlRequest(snippetPrivateGQL, input, options);
  },

  getFavoritedSnippets(input, options = { loading: true, toast: false }) {
    return gqlRequest(getFavoritedSnippetsGQL, { input }, options);
  },
};
