<template>
  <div class="xl:pl-96">
    <div class="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-6 pt-0">
      <div
        v-if="collection && collection.snippets"
        class="snippet-list grid gap-10 grid-cols-1 grid-rows-auto max-w-screen-lg"
      >
        <SnippetItem
          v-for="(snippet, index) in collection.snippets"
          data-aos="fade-right"
          data-aos-once="true"
          :key="index"
          :snippet="snippet"
          @remove="removeSnippetFromCollection(snippet.id)"
          @show="showSnippet(snippet)"
          snippetType="collection"
          class="h-[170px]"
        ></SnippetItem>
      </div>

      <div v-else>
        <p>There are no snippets in this list yet</p>
      </div>

      <CommonModal
        v-if="isShowDetailModal"
        @closeModal="isShowDetailModal = false"
      >
        <SnippetsDetail :snippet="selectedSnippet"></SnippetsDetail>
      </CommonModal>
    </div>
  </div>

  <aside
    class="fixed mt-[88px] inset-y-0 left-72 hidden w-96 overflow-y-auto py-10 xl:block"
  >
    <div class="collection-info px-5 py-14">
      <img src="@/assets/images/icon_folder.png" class="w-full" />

      <div v-if="isEdit">
        <div class="relative mt-5">
          <FormValidator>
            <input
              v-model="titleMapper"
              type="text"
              name="name"
              id="name"
              class="peer bg-transparent focus-visible:outline-none block w-full py-1.5 text-white focus:ring-0 sm:text-md text-md font-medium"
            />
            <div
              class="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              aria-hidden="true"
            />
          </FormValidator>
        </div>

        <div class="flex flex-row justify-end gap-5 mt-3">
          <button class="text-white font-medium text-sm" @click="cancelChange">
            Cancel
          </button>
          <button class="text-white font-medium text-sm" @click="submitChange">
            Save
          </button>
        </div>
      </div>

      <div v-else class="flex flex-row justify-between mt-5">
        <h2 class="font-bold text-white">{{ collection.title }}</h2>

        <div class="flex gap-5">
          <button @click="isEdit = true">
            <SvgPencil></SvgPencil>
          </button>

          <button @click="isShowConfirmModal = true">
            <SvgTrash></SvgTrash>
          </button>

          <ConfirmModal
            name="collection"
            :open="isShowConfirmModal"
            @close="isShowConfirmModal = false"
            @confirm="deleteCollection"
          ></ConfirmModal>
        </div>
      </div>

      <h3 class="text-white font-normal mt-5">{{ userName }}</h3>

      <h5 class="text-zinc-100 font-normal mt-5">
        The "collection" feature allows you to organize and categorize your code
        snippets efficiently.
      </h5>

      <div class="text-center mt-5">
        <router-link
          to="/"
          type="button"
          class="text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Add Snippet To Collection
        </router-link>
      </div>
    </div>

    <!-- Secondary column (hidden on smaller screens) -->
  </aside>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

// ==============COMPONENTS=============
import SnippetItem from "@/components/snippet/SnippetItem.vue";
import CommonModal from "@/components/shared/CommonModal.vue";
import SnippetsDetail from "@/components/snippet/SnippetsDetail.vue";
import SvgPencil from "@/components/svg/SvgPencil.vue";
import SvgTrash from "@/components/svg/SvgTrash.vue";
import ConfirmModal from "@/components/shared/ConfirmModal.vue";

// ============UTILITIES================
import { SnippetTypeOptions } from "@/helpers/constant.js";

// ==============STORE=============
import { useSelfSnippetsStore } from "@/stores/snippets/self";
import { useSnippetsStore } from "@/stores/snippets/index";
import { useCollectionsStore } from "@/stores/collections/index";
import { useAuthStore } from "@/stores/auth";

import { watch } from "vue";

export default defineComponent({
  components: {
    SnippetItem,
    CommonModal,
    SnippetsDetail,
  },

  setup() {
    // ==============REACTIVE=============
    const isShowDetailModal = ref(false);

    const privateSnippetFlg = ref(false);

    const isEdit = ref(false);
    const isShowConfirmModal = ref(false);

    const titleMapper = ref("");

    // ================VARIABLES=========
    const route = useRoute();
    const router = useRouter();

    // ==============STORE=============
    const selfSnippetStore = useSelfSnippetsStore();
    const snippetStore = useSnippetsStore();
    const collectionStore = useCollectionsStore();
    const authStore = useAuthStore();

    // Store Data
    const { collection } = storeToRefs(collectionStore);
    const { mySnippet } = storeToRefs(selfSnippetStore);
    const { snippetDetail } = storeToRefs(snippetStore);

    // ==============COMPUTED=============
    const selectedSnippet = computed(() =>
      privateSnippetFlg.value ? mySnippet.value : snippetDetail.value
    );

    const userName = computed(() => authStore.name);

    const collectionId = computed(() => route.params.id);

    // ==============ACTIONS=============

    // TODO REFACTOR
    async function showSnippet(item) {
      if (item.snippetType == SnippetTypeOptions.PUBLIC) {
        privateSnippetFlg.value = false;
        await snippetStore.getSnippetDetail(Number(item.id));
      } else if (item.snippetType == SnippetTypeOptions.PRIVATE) {
        privateSnippetFlg.value = true;
        await selfSnippetStore.getMySnippet(Number(item.id));
      }
      if (selectedSnippet.value) {
        isShowDetailModal.value = true;
      }
    }

    async function getCollection() {
      if (!collectionId.value) return;

      await collectionStore.getCollection(collectionId.value);
    }

    async function removeSnippetFromCollection(snippetId) {
      await collectionStore.collectionRemoveSnippet({
        id: route.params.id,
        snippetId,
      });

      getCollection();
    }

    function cancelChange() {
      isEdit.value = false;

      titleMapper.value = collection.value.title;
    }

    async function submitChange() {
      await collectionStore.updateCollection({
        id: collectionId.value,
        input: { title: titleMapper.value },
      });

      getCollection();

      isEdit.value = false;
    }

    async function deleteCollection() {
      await collectionStore.deleteCollection(collectionId.value);

      router.push("/account");
    }

    watch(collection, () => {
      if (collection) {
        titleMapper.value = collection.value.title;
      }
    });

    watch(
      () => collectionId.value,
      () => {
        getCollection();
      },
      { immediate: true }
    );

    return {
      isShowConfirmModal,
      userName,
      titleMapper,
      isEdit,
      collection,
      isShowDetailModal,
      selectedSnippet,

      deleteCollection,
      showSnippet,
      removeSnippetFromCollection,
      cancelChange,
      submitChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.collection-info {
  background: rgb(73, 216, 136);
  background: linear-gradient(
    180deg,
    rgba(73, 216, 136, 1) 11%,
    rgba(42, 114, 225, 1) 56%,
    rgba(245, 254, 248, 1) 91%
  );
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  height: 100%;

  svg {
    color: #fff;
  }
}

.snippet-list {
  a {
    max-height: 260px;
  }
}
</style>