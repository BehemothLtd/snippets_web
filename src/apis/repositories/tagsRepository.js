import gqlRequest from "@/apis/gqlClient";

// Queries
import { fetchTagGQL } from "@/apis/resolvers";

// Mutations
import { createTagGQL } from "@/apis/mutations";

export default {
  // ==================QUERY======================

  list(_, options = { loading: false, toast: false }) {
    return gqlRequest(fetchTagGQL, null, options);
  },

  // ==================MUTATION======================
  create(input, options = { loading: false, toast: false }) {
    return gqlRequest(createTagGQL, { input }, options);
  },
};
