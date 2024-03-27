import gqlRequest from "@/apis/gqlClient";

// Queries
import { getCollectionListGQL, getCollectionGQL } from "@/apis/resolvers";

// Mutations
import {
  createCollectionGQL,
  updateCollectionGQL,
  deleteCollectionGQL,
  collectionAddSnippetGQL,
  collectionRemoveSnippetGQL,
} from "@/apis/mutations";

export default {
  // ==================QUERY======================

  list(input, options = { loading: false, toast: false }) {
    return gqlRequest(getCollectionListGQL, { input }, options);
  },

  show(id, options = { loading: true, toast: false }) {
    return gqlRequest(getCollectionGQL, { id }, options);
  },

  // ==================MUTATION======================
  create(input, options = { loading: true, toast: false }) {
    return gqlRequest(createCollectionGQL, { input }, options);
  },

  update(payload, options = { loading: true, toast: true }) {
    return gqlRequest(updateCollectionGQL, payload, options);
  },

  delete(id) {
    return gqlRequest(deleteCollectionGQL, { id });
  },

  add_snippet({ id, snippetId }) {
    return gqlRequest(collectionAddSnippetGQL, { id, snippetId });
  },

  remove_snippet({ id, snippetId }) {
    return gqlRequest(collectionRemoveSnippetGQL, { id, snippetId });
  },
};
