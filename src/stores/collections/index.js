import { defineStore } from "pinia";
import { ref } from "vue";

import CollectionsRepository from "@/apis/repositories/collectionsRepository";

export const useCollectionsStore = defineStore("collections", () => {
  const collections = ref([]);
  const collection = ref({});
  const metadata = ref({});

  const maxPage = ref(1);

  const query = ref({
    page: 1,
    perPage: 15,
    q: {},
  });

  function resetQuery() {
    collections.value = [];
    query.value.page = 1;
    query.value.perPage = 15;
    query.value.q = {};
  }

  async function fetchCollections() {
    if (query.value.page > maxPage) return;

    const result = await CollectionsRepository.list(query.value);

    collections.value = result.Collections.collection;

    collections.value = [
      ...collections.value,
      ...result.Collections.collection,
    ];

    metadata.value = result.Collections.metadata;

    maxPage.value = result.Collections.metadata.pages;
  }

  async function getCollection(id) {
    const result = await CollectionsRepository.show(id);

    collection.value = result.Collection;
  }

  async function createCollection(input) {
    const result = await CollectionsRepository.create(input);
    return result;
  }

  function updateCollection(payload) {
    return CollectionsRepository.update(payload);
  }

  function deleteCollection(id) {
    return CollectionsRepository.delete(id);
  }

  function collectionAddSnippet({ id, snippetId }) {
    return CollectionsRepository.add_snippet({ id, snippetId });
  }

  function collectionRemoveSnippet({ id, snippetId }) {
    return CollectionsRepository.remove_snippet({ id, snippetId });
  }

  return {
    maxPage,
    query,
    collections,
    collection,
    metadata,

    resetQuery,
    getCollection,
    fetchCollections,
    createCollection,
    deleteCollection,
    updateCollection,
    collectionAddSnippet,
    collectionRemoveSnippet,
  };
});
