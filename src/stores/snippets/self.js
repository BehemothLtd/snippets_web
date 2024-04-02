import { defineStore } from "pinia";
import { ref, computed } from "vue";

import SelfRepository from "@/apis/repositories/selfRepository";

export const useSelfSnippetsStore = defineStore("selfSnippets", () => {
  // Data
  const mySnippet = ref({});
  const mySnippets = ref([]);
  const pinnedSnippets = ref([]);
  const pinnedSnippetsMetadata = ref({});
  const favoritedSnippets = ref([]);
  const favoritedSnippetsMetadata = ref({});
  const metadata = ref({});

  const query = ref({
    page: 1,
    perPage: 10,
    q: {},
  });

  const currentPage = computed(() => query.value.page);

  // ===============ACTIONS==================
  function setQuery(params) {
    Object.assign(query.value, params);
  }

  async function getMySnippet(id) {
    const result = await SelfRepository.show({ id });
    mySnippet.value = result.selfSnippet;
  }

  function resetQuery() {
    query.value = {
      page: 1,
      perPage: 10,
      q: {},
    };
  }

  async function getMySnippets() {
    const result = await SelfRepository.showMySnippets(query.value);
    mySnippets.value = result.SelfSnippets?.collection;
    metadata.value = result.SelfSnippets?.metadata;
  }

  async function deleteMySnippet(id) {
    const result = await SelfRepository.removeMySnippet(id);
    return result;
  }

  async function snippetPublic(params) {
    const result = await SelfRepository.snippetPublic(params);
    return result;
  }

  async function snippetPrivate(params) {
    const result = await SelfRepository.snippetPrivate(params);
    return result;
  }

  async function decryptSnippet(id, privateKey) {
    const result = await SelfRepository.decrypt({ id, privateKey });

    mySnippet.value = result.selfSnippetDecrypt;
    return result;
  }

  async function onAddSnippetTag({ id, tagId }) {
    return SelfRepository.addSnippetTag({ id, tagId });
  }

  async function onDeleteSnippetTag({ snippetId, tagId }) {
    return SelfRepository.removeSnippetTag({ snippetId, tagId });
  }

  async function getPinnedSnippets() {
    const result = await SelfRepository.getPinnedSnippets(query.value);

    pinnedSnippets.value = result.selfPinnedSnippets.collection;

    pinnedSnippetsMetadata.value = result.selfPinnedSnippets.metadata;
  }

  async function getFavoritedSnippets() {
    const result = await SelfRepository.getFavoritedSnippets(query.value);

    favoritedSnippets.value = result.selfFavoritedSnippets.collection;

    favoritedSnippetsMetadata.value = result.selfFavoritedSnippets.metadata;
  }

  return {
    // Data
    mySnippet,
    mySnippets,
    pinnedSnippets,
    pinnedSnippetsMetadata,
    favoritedSnippets,
    favoritedSnippetsMetadata,
    metadata,
    query,
    currentPage,

    // Actions
    deleteMySnippet,
    getPinnedSnippets,
    getFavoritedSnippets,
    getMySnippet,
    decryptSnippet,
    onAddSnippetTag,
    onDeleteSnippetTag,
    setQuery,
    resetQuery,
    getMySnippets,
    snippetPrivate,
    snippetPublic,
  };
});
