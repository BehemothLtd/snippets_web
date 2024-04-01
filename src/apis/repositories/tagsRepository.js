import gqlRequest from "@/apis/gqlClient";

// Queries
import { fetchTagsGQL, fetchTagGQL } from "@/apis/resolvers";

// Mutations
import { createTagGQL, editTagGQL, deleteTagGQL } from "@/apis/mutations";

export default {
  // ==================QUERY======================

  list(payload, options = { loading: true, toast: false }) {
    return gqlRequest(fetchTagsGQL, payload, options);
  },

  show(payload, options = { loading: true, toast: false }) {
    return gqlRequest(fetchTagGQL, payload, options);
  },

  // ==================MUTATION======================
  create(input, options = { loading: true, toast: true }) {
    return gqlRequest(createTagGQL, { input }, options);
  },

  edit(payload, options = { loading: true, toast: true }) {
    return gqlRequest(editTagGQL, payload, options);
  },

  delete(payload, options = { loading: true, toast: true }) {
    return gqlRequest(deleteTagGQL, payload, options);
  },
};
