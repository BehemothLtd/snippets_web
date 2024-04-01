import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { get, pick } from "lodash";

import TagsRepository from "@/apis/repositories/tagsRepository";

import { TagsQuery } from "@/helpers/input/tags";
import { PagyInput, Metadata } from "@/helpers/input/shared";

export const useTagsStore = defineStore("tags", () => {
  // -----------STATE--------------
  const tag = reactive({
    id: null,
    name: "",
    self: true,
    numberOfUsage: null,
    lockVersion: null,
  });
  const tags = ref([]);
  const tagMetadata = ref(new Metadata());
  const tagInput = ref({
    tagsQuery: new TagsQuery(),
    tagInput: new PagyInput(),
  });

  // -----------ACTIONS--------------
  async function fetchTags() {
    const response = await TagsRepository.list(tagInput.value);

    tags.value = response.Tags.collection;
    tagMetadata.value = response.Tags.metadata;
  }

  async function onCreateTag({ name }) {
    const response = await TagsRepository.create({ name });

    return response?.TagCreate?.tag;
  }

  async function editTag(id) {
    const input = pick(tag, ["name", "lockVersion"]);

    const response = await TagsRepository.edit({ id, input });

    if (response) {
      Object.assign(tag, response?.TagUpdate?.tag);

      return response?.TagUpdate?.tag;
    } else {
      return false;
    }
  }

  async function showTag(id) {
    const response = await TagsRepository.show({ tagId: id });

    if (response) {
      Object.assign(tag, response?.Tag);
      return response?.Tag;
    }
  }

  function setQuery(params) {
    Object.assign(tagInput.value, params);
  }

  return {
    tag,
    tags,
    tagMetadata,
    tagInput,

    fetchTags,
    onCreateTag,
    showTag,
    editTag,
    setQuery,
  };
});
