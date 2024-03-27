<template>
  <a
    class="snippet-item block max-w h-full p-6 bg-gray-100 border border-gray-100 rounded-lg shadow hover:bg-gray-200 dark:bg-gray-100 dark:border-gray-100 dark:hover:bg-gray-200 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]"
  >
    <div class="flex flex-row h-full gap-3">
      <div class="content basis-11/12 grid gap-3">
        <h3
          class="mb-2 font-bold text-lg text-black cursor-pointer overflow-x-hidden"
          @click="$emit('show')"
        >
          {{ snippet.title }}
        </h3>

        <MdPreview
          class="text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer"
          language="en-US"
          :modelValue="snippet.previewContent"
          @click="$emit('show')"
          v-if="snippet.snippetType == 'public'"
        />

        <div v-else @click="$emit('show')">{{ snippet.previewContent }}</div>

        <div ref="tagsEl" class="tags-wrapper">
          <ul
            class="tags flex flex-row mt-2 before:bg-gradient-to-r before:from-cyan-500 before:to-blue-500 before:hover:bg-gradient-to-bl"
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

      <!-- Mine Snippet -->
      <template v-if="snippetType == 'mine'">
        <div class="actions-area flex flex-col justify-between items-end">
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              class="sr-only peer"
              :value="snippet.snippetType"
              :checked="isPublic"
              @change="isShowPrivateKeyModal = true"
            />
            <div
              class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>

            <span
              class="ml-3 text-sm font-normal text-gray-900 dark:text-gray-950"
            >
              {{ isPublic ? "Public" : "Private" }}
            </span>
          </label>

          <div class="actions-edit flex items-center">
            <router-link
              :to="`/snippets/${snippet.id}/edit`"
              class="cursor-pointer me-3"
            >
              <SvgPencil></SvgPencil>
            </router-link>
            <span class="cursor-pointer" @click="isShowConfirmModal = true">
              <SvgTrash></SvgTrash>
            </span>
            <ConfirmModal
              name="snippet"
              :open="isShowConfirmModal"
              @close="isShowConfirmModal = false"
              @confirm="onDeleteSnippet"
            ></ConfirmModal>
          </div>
        </div>

        <PrivateKeyModal
          :open="isShowPrivateKeyModal"
          @close="isShowPrivateKeyModal = false"
          @submit="submitPrivateKey($event)"
        ></PrivateKeyModal>
      </template>

      <!-- Pinned Snippet -->
      <template v-else-if="snippetType == 'pinned'">
        <div class="actions-area ms-auto">
          <a @click="handlePinSnippet">
            <SvgPinned class="svg-pin" :class="{ pinned: pinned }"></SvgPinned>
          </a>
        </div>
      </template>

      <!-- Like Snippet -->
      <template v-else-if="snippetType == 'like'">
        <div class="actions-area ms-auto">
          <a>
            <SvgLike></SvgLike>
          </a>
        </div>
      </template>

      <!-- Like Snippet -->
      <template v-else-if="snippetType == 'collection'">
        <div class="actions-area ms-auto">
          <button @click="$emit('remove')">
            <SvgTrash></SvgTrash>
          </button>
        </div>
      </template>
    </div>
  </a>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
} from "vue";

import { MdPreview } from "md-editor-v3";
import SvgTrash from "@/components/svg/SvgTrash.vue";
import SvgPencil from "@/components/svg/SvgPencil.vue";
import SvgLike from "@/components/svg/SvgLike.vue";
import SvgPinned from "@/components/svg/SvgPinned.vue";
import PrivateKeyModal from "@/components/snippet/PrivateKeyModal.vue";
import ConfirmModal from "@/components/shared/ConfirmModal.vue";

// ============UTILITIES================
import { SnippetTypeOptions } from "@/helpers/constant.js";

export default defineComponent({
  components: {
    SvgTrash,
    SvgPencil,
    SvgLike,
    SvgPinned,
    PrivateKeyModal,
    ConfirmModal,
    MdPreview,
  },

  props: {
    snippet: {
      type: Object,
      default: () => {},
    },
    snippetType: {
      type: String,
      default: "mine",
    },
  },

  setup(props, { emit }) {
    // ==============REACTIVE==============
    const isShowPrivateKeyModal = ref(false);

    const isShowConfirmModal = ref(false);

    const pinned = ref(true);

    const tagsEl = ref(null);

    // ==============COMPUTED==============
    const isPublic = computed(
      () => props.snippet.snippetType == SnippetTypeOptions.PUBLIC
    );

    // ==============METHODS==============
    function onUpdateSnippetType($event) {
      if (!props.snippet) return false;

      if (props.snippet.snippetType == SnippetTypeOptions.PUBLIC) {
        isShowPrivateKeyModal.value = true;
      } else {
        emit("update", $event);
      }
    }

    function submitPrivateKey($event) {
      emit("update", $event);
      isShowPrivateKeyModal.value = false;
    }

    function onDeleteSnippet() {
      emit("delete");
      isShowConfirmModal.value = false;
    }

    function handlePinSnippet() {
      pinned.value = !pinned.value;
      emit("pin", pinned.value);
    }

    function handleTags() {
      const tags = tagsEl.value;
      if (tags && tags.scrollHeight > tags.clientHeight) {
        tags.classList.add("overflowed");
      } else {
        tags.classList.remove("overflowed");
      }
    }

    onMounted(() => {
      window.addEventListener("resize", handleTags);
      handleTags();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleTags);
    });

    return {
      // Data
      tagsEl,
      pinned,
      isPublic,
      isShowPrivateKeyModal,
      isShowConfirmModal,

      // Functions
      handleTags,
      onUpdateSnippetType,
      submitPrivateKey,
      onDeleteSnippet,
      handlePinSnippet,
    };
  },
});
</script>

<style lang="scss">
.svg-pin {
  color: #ffffff;

  &.pinned {
    color: #434c9d !important;
  }
}
</style>
