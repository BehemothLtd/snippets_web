<template>
  <el-select-v2
    :model-value="value"
    :options="listTagOption"
    class="w-full tag-selected"
    placeholder="Select tags"
    allow-create
    filterable
    multiple
    clearable
    :reserve-keyword="false"
    @change="handleChangeOption"
  >
  </el-select-v2>
</template>

<script>
import { computed, onMounted } from "vue";

// =============COMPONENTS==============
import { ElButton } from "element-plus";

// =============STORE==============
import { useTagsStore } from "@/stores/tags";

export default {
  components: {
    ElButton,
  },

  props: {
    value: {
      type: Array,
      default: [],
    },
  },

  setup(props, { emit }) {
    // ============REACTIVE============

    // ============COMPUTED============
    const listTagOption = computed(() =>
      tagStore.tags.map((item) => {
        return {
          value: Number(item.id),
          label: item.name,
        };
      })
    );

    // ============STORE============
    const tagStore = useTagsStore();

    // ============METHODS===========
    function handleAddRemoveTag($event) {
      const tagId = $event.find((item) => !props.value.includes(item));

      const removeTagId = props.value.find((item) => !$event.includes(item));

      if (tagId) {
        emit("select", tagId);
      } else if (removeTagId) {
        emit("remove", removeTagId);
      }
    }

    async function handleChangeOption($event) {
      const tagNew = $event.find(
        (tag) => !listTagOption.value.some((option) => option.value === tag)
      );

      if (tagNew) {
        const tag = await tagStore.onCreateTag({ name: tagNew });

        emit("select", Number(tag.id));
      } else {
        handleAddRemoveTag($event);
      }
    }

    onMounted(() => tagStore.fetchTags());

    return {
      listTagOption,
      handleChangeOption,
    };
  },
};
</script>
