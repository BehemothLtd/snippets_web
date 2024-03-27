import { defineStore } from "pinia";
import { ref } from "vue";

import TagsRepository from "@/apis/repositories/tagsRepository";

export const useTagsStore = defineStore("tags", () => {
  const tags = ref([]);

  async function fetchTags() {
    const result = await TagsRepository.list();

    tags.value = result.tags;
  }

  async function onCreateTag({ name }) {
    const result = await TagsRepository.create({ name });

    return result?.tagCreate?.tag;
  }

  return {
    tags,
    fetchTags,
    onCreateTag,
  };
});
