import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { omit, cloneDeep } from "lodash";

import { PagyInput, SnippetsQuery } from "@/helpers/queryInput.js";
import { useAuthStore } from "@/stores/auth";

import SnippetsRepository from "@/apis/repositories/snippetsRepository";

export const useSnippetsStore = defineStore("snippets", () => {
  // ====================STATE=========================
  const authStore = useAuthStore();

  const listSnippets = ref([]);
  const snippetMetadata = ref({});
  const snippetDetail = ref(null);

  const homePageInput = ref({
    snippetQuery: new SnippetsQuery(),
    snippetInput: new PagyInput(),
    includeSelfInfo: !!authStore.token,
    includeSnippetDetail: false,
    slug: "",
  });

  // ====================ACTIONS=========================
  async function loadDataHomePage() {
    const response = await SnippetsRepository.homepage(homePageInput.value);

    // assign data snippet
    listSnippets.value = response.Snippets.collection;
    snippetMetadata.value = response.Snippets.metadata;
    snippetDetail.value = response.Snippet;

    // assign data self info
    authStore.fullName = response.SelfInfo?.fullName;
  }

  async function fetchSnippets() {
    const payload = omit(homePageInput.value, "includeSelfInfo");
    const response = await SnippetsRepository.list(payload);

    listSnippets.value = response.Snippets.collection;
    snippetMetadata.value = response.Snippets.metadata;
  }

  async function deleteSnippet(id) {
    const result = await SnippetsRepository.delete(id);

    return result;
  }

  async function createSnippet(payload) {
    const params =
      payload.snippetType == "public" ? omit(payload, ["privateKey"]) : payload;

    const result = await SnippetsRepository.create(params);

    return result;
  }

  async function getSnippetDetail(slug) {
    const result = await SnippetsRepository.detail(slug);

    snippetDetail.value = result.Snippet;
  }

  async function likeSnippet(id) {
    const result = await SnippetsRepository.like(id);

    return result;
  }

  async function pin(id) {
    const result = await SnippetsRepository.pin(id);
    return result;
  }

  async function updateSnippet(payload) {
    const newContent = payload.decryptedContent
      ? cloneDeep(payload.decryptedContent)
      : payload.content;

    const input = { ...payload, content: newContent };

    const params = {
      id: payload.id,
      input: omit(input, [
        "id",
        "snippetsTags",
        "decryptedContent",
        "slug",
        "__typename",
      ]),
    }; // ==> input: {title, content, privateKey, snippetType}

    const result = await SnippetsRepository.update(params);
    return result;
  }

  function resetQuery() {
    homePageInput.value.snippetInput = new PagyInput();
    homePageInput.value.snippetQuery = new SnippetsQuery();
  }

  return {
    // Data
    listSnippets,
    snippetDetail,
    snippetMetadata,
    homePageInput,

    // Actions
    loadDataHomePage,
    fetchSnippets,
    createSnippet,
    getSnippetDetail,
    updateSnippet,
    deleteSnippet,
    likeSnippet,
    resetQuery,
    pin,
  };
});
