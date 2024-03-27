<template>
  <div class="bg-white rounded-lg">
    <div class="flex items-center content-center snippet-container">
      <div class="sticky-bar flex flex-col justify-center items-center">
        <div class="user-avatar">
          <img src="@/assets/images/avatar_detail.png" />
        </div>
        <button @click="$emit('pinSnippet', snippet.id)">
          <component :is="svgPinComponent" />
        </button>
        <div class="flex flex-col items-center">
          <button
            @click="
              $emit('likeSnippet', {
                id: snippet.id,
                favoritesCount: snippet.favoritesCount,
              })
            "
          >
            <component :is="svgLikeComponent" />
          </button>
          <span class="text-sm font-bold">{{ snippet.favoritesCount }}</span>
        </div>
        <button @click="$emit('shareSnippet', snippet.slug)">
          <SvgShare />
        </button>
      </div>
      <div class="p-4 snippet-content w-full h-full">
        <div class="text-2xl break-words font-bold mt-6">
          {{ snippet.title }}
        </div>

        <MdPreview language="en-US" :modelValue="snippet.content" />

        <ul
          class="tags flex flex-row gap-y-3 mt-2 before:bg-gradient-to-r before:from-cyan-500 before:to-blue-500 before:hover:bg-gradient-to-bl"
        >
          <li v-for="(tag, index) in snippet.tags" :key="index" class="tag">
            <span
              id="badge-dismiss-default"
              class="!rounded-3xl text-white text-xs !bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
            >
              {{ tag.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { MdPreview } from "md-editor-v3";
import { defineComponent, computed } from "vue";
import SvgBookMarked from "@/components/svg/SvgBookMarked.vue";
import SvgBookMark from "@/components/svg/SvgBookMark.vue";
import SvgAvatar from "@/components/svg/SvgAvatar.vue";
import SvgLike from "@/components/svg/SvgLike.vue";
import SvgLiked from "@/components/svg/SvgLiked.vue";
import SvgShare from "@/components/svg/SvgShare.vue";

export default defineComponent({
  name: "DetailPage",
  props: {
    snippet: {
      type: Object,
      required: true,
    },
  },
  components: {
    MdPreview,
    SvgBookMarked,
    SvgBookMark,
    SvgAvatar,
    SvgShare,
    SvgLike,
    SvgLiked,
  },
  setup(props) {
    const svgLikeComponent = computed(() => {
      return props.snippet.favorited ? "SvgLiked" : "SvgLike";
    });
    const svgPinComponent = computed(() => {
      return props.snippet.pinned ? "SvgBookMarked" : "SvgBookMark";
    });
    return {
      svgLikeComponent,
      MdPreview,
      svgPinComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
.sticky-bar {
  gap: 30px;
  color: #434c9d;
}

:deep(.md-editor) {
  padding: unset;
}
</style>
