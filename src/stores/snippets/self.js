import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { set } from "lodash";

import SelfRepository from "@/apis/repositories/selfRepository";

import { useSnippetsStore } from "@/stores/snippets/index";

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

  const snippetStore = useSnippetsStore();
  const { snippetDetail } = storeToRefs(snippetStore);

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

  async function decryptSnippet(id, passkey) {
    const result = await SelfRepository.decrypt({ id, passkey });

    set(snippetDetail.value, "isDecrypted", true);
    set(snippetDetail.value, "content", result.SnippetDecryptContent);

    console.log("dsa", snippetDetail.value);

    return snippetDetail.value;
  }

  async function onAddSnippetTag({ id, tagId }) {
    return SelfRepository.addSnippetTag({ id, tagId });
  }

  async function onDeleteSnippetTag({ id, tagId }) {
    return SelfRepository.removeSnippetTag({ id, tagId });
  }

  async function getPinnedSnippets() {
    const result = await SelfRepository.getPinnedSnippets(query.value);

    pinnedSnippets.value = result.selfPinnedSnippets.collection;

    pinnedSnippetsMetadata.value = result.selfPinnedSnippets.metadata;
  }

  async function getFavoritedSnippets() {
    const result = await SelfRepository.getFavoritedSnippets(query.value);

    favoritedSnippets.value = result.SelfFavoritedSnippets.collection;

    favoritedSnippetsMetadata.value = result.SelfFavoritedSnippets.metadata;
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
