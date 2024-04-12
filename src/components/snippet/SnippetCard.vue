<template>
  <div
    data-aos="fade-down"
    data-aos-once="true"
    class="card p-4 rounded-lg shadow-lg bg-white card2"
  >
    <!-- <div
      class="flex w-full"
      :class="[type === 2 ? 'justify-between' : 'justify-end']"
    >
      <div v-if="type == 2" class="flex items-center">
        <div>
          <SvgAvatar />
        </div>
        <div class="ml-2 author-name">{{ item.author }}</div>
      </div>
      <div class="flex justify-end">
        <div class="flex items-center">
          <SvgMore />
          <SvgChevronDown />
        </div>
      </div>
    </div>
    -->

    <div class="snippet-container cursor-pointer">
      <div class="flex justify-between">
        <h2
          class="text-xl font-bold mb-2 text-center line-clamp-3"
          @click="$emit('onOpenModal', item.id)"
        >
          {{ item.title }}
        </h2>

        <Dropdown
          :snippet="item"
          @collect="showCollectionModal = true"
          @pin="$emit('pin', item.id)"
          @share="$emit('share', item.slug)"
        ></Dropdown>

        <CollectionModal
          :open="showCollectionModal"
          :snippetId="item.id"
          @close="showCollectionModal = false"
        ></CollectionModal>
      </div>

      <div @click="$emit('getSnippetDetail', item.slug)">
        <div>
          <MdPreview language="en-US" :modelValue="item.previewContent" />
        </div>

        <div ref="tagsEl" class="tags-wrapper">
          <ul
            class="tags flex flex-row mt-2 before:bg-gradient-to-r before:from-cyan-500 before:to-blue-500 before:hover:bg-gradient-to-bl"
          >
            <li v-for="(tag, index) in item.tags" :key="index" class="tag">
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

    <div class="flex justify-between items-center p-2">
      <div class="flex items-center">
        <div>
          <SvgAvatar />
        </div>
        <div class="ml-2 author-name">{{ item.User.name }}</div>
      </div>
      <p class="flex justify-center items-center">
        <span class="mt-1 mr-1">{{ item.favoritesCount }}</span>
        <button
          @click="
            $emit('likeSnippet', {
              id: item.id,
              favoritesCount: item.favoritesCount,
            })
          "
        >
          <component :is="svgLikeComponent" />
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { MdPreview } from "md-editor-v3";
import SvgLike from "@/components/svg/SvgLike.vue";
import SvgLiked from "@/components/svg/SvgLiked.vue";
import SvgChevronDown from "@/components/svg/SvgChevronDown.vue";
import SvgMore from "@/components/svg/SvgMore.vue";
import SvgAvatar from "@/components/svg/SvgAvatar.vue";
import Dropdown from "@/components/atoms/Dropdown.vue";
import CollectionModal from "@/components/molecules/CollectionModal.vue";

import { computed, onMounted, onBeforeUnmount, ref } from "vue";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
  },
  components: {
    MdPreview,
    SvgLike,
    SvgLiked,
    SvgChevronDown,
    SvgMore,
    SvgAvatar,
    Dropdown,
    CollectionModal,
  },
  setup(props) {
    // ==============REACTIVE==============
    const tagsEl = ref(null);

    const showCollectionModal = ref(false);

    // ==============COMPUTED==============
    const svgLikeComponent = computed(() => {
      return props.item.favorited ? "SvgLiked" : "SvgLike";
    });

    // ==============METHODS==============
    // function handleTags() {
    //   const tags = tagsEl.value;
    //   if (tags && tags.scrollHeight > tags.clientHeight) {
    //     tags.classList.add("overflowed");
    //   } else {
    //     tags.classList.remove("overflowed");
    //   }
    // }

    // onMounted(() => {
    //   window.addEventListener("resize", handleTags);
    //   handleTags();
    // });

    // onBeforeUnmount(() => {
    //   window.removeEventListener("resize", handleTags);
    // });

    return {
      tagsEl,
      svgLikeComponent,
      showCollectionModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.author-name {
  color: #7d7d7d;
  font-size: 12px;
  font-family: "Quicksand", sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.description-card {
  max-height: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
}

// hover style for card2
.card2 {
  -webkit-transition: all 100ms ease-in-out;
  transition: all 100ms ease-in-out;
  border: none;
}
.card2:hover {
  transform: scale(1.065) !important;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);
}
</style>
