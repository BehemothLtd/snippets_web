<template>
  <div class="2xl:px-48 xl:px-28">
    <img
      class="w-100 mb-[100px] m-auto"
      src="@/assets/images/banner_profile_like.png"
      alt=""
    />

    <div
      v-if="favoritedSnippets"
      class="snippet-list grid gap-10 grid-cols-1 grid-rows-auto"
    >
      <SnippetItem
        v-for="(snippet, index) in favoritedSnippets"
        data-aos="fade-right"
        data-aos-once="true"
        :key="index"
        :snippet="snippet"
        @like="likeSnippet(snippet.id)"
        @show="showSnippet(snippet)"
        snippetType="favorited"
        class="h-[170px]"
      ></SnippetItem>
    </div>

    <CommonModal
      v-if="isShowDetailModal"
      @closeModal="isShowDetailModal = false"
    >
      <SnippetsDetail
        :snippet.sync="selectedSnippet"
        @pinSnippet="pinSnippet"
        @likeSnippet="likeSnippet"
        @shareSnippet="shareSnippet"
      />
    </CommonModal>

    <Pagination
      v-if="favoritedSnippetsMetadata.pages > 1"
      class="my-3 ms-auto float-right"
      :metadata="favoritedSnippetsMetadata"
      @change="onPageChange($event)"
    ></Pagination>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import Toast from "@/ultilities/toast";
import { useCommon } from "@/composable/common.js";

// ==============COMPONENTS=============
import SnippetItem from "@/components/snippet/SnippetItem.vue";
import Pagination from "@/components/shared/Pagination.vue";
import CommonModal from "@/components/shared/CommonModal.vue";
import SnippetsDetail from "@/components/snippet/SnippetsDetail.vue";

// ============UTILITIES================
import { SnippetTypeOptions } from "@/helpers/constant.js";
const { modifyItemInList } = useCommon();

// ==============STORE=============
import { useSelfSnippetsStore } from "@/stores/snippets/self";
import { useSnippetsStore } from "@/stores/snippets/index";

export default defineComponent({
  components: {
    SnippetItem,
    Pagination,
    CommonModal,
    SnippetsDetail,
  },

  setup() {
    // ==============ACTIVE=============
    const isShowDetailModal = ref(false);

    const privateSnippetFlg = ref(false);

    // ==============STORE=============
    const selfSnippetStore = useSelfSnippetsStore();

    const snippetStore = useSnippetsStore();

    // Store Data
    const {
      favoritedSnippets,
      favoritedSnippetsMetadata,
      mySnippet, // self
    } = storeToRefs(selfSnippetStore);

    const { snippetDetail } = storeToRefs(snippetStore); // public

    // ==============COMPUTED=============
    const selectedSnippet = computed(() =>
      privateSnippetFlg.value ? mySnippet.value : snippetDetail.value
    );

    // ==============ACTIONS=============

    // TODO REFACTOR
    async function showSnippet(item) {
      if (item.snippetType == SnippetTypeOptions.PUBLIC) {
        privateSnippetFlg.value = false;
        await snippetStore.getSnippetDetail(String(item.slug));
      } else {
        privateSnippetFlg.value = true;
        await selfSnippetStore.getMySnippet(Number(item.id));
      }
      if (selectedSnippet.value) {
        isShowDetailModal.value = true;
      }
    }

    function fetchFavoritedSnippets() {
      selfSnippetStore.getFavoritedSnippets();
    }

    function onPageChange(page) {
      selfSnippetStore.setQuery({ page });
      fetchPinnedSnippets();
    }

    async function likeSnippet(input) {
      const result = await snippetStore.likeSnippet(String(input.id));
      if (result?.SnippetFavorite) {
        const snippet = {
          id: String(input.id),
          favoritesCount: result?.SnippetFavorite.favorited
            ? input.favoritesCount + 1
            : input.favoritesCount - 1,
          ...result?.SnippetFavorite,
        };
        modifyItemInList(snippet, listSnippets, snippetDetail);
      }
    }

    async function pinSnippet(id) {
      const result = await snippetsStore.pin(String(id));
      const snippet = {
        id: String(id),
        pinned: result?.SnippetPin,
      };
      if (result?.SnippetPin) {
        modifyItemInList(snippet, listSnippets, snippetDetail);
      }
    }

    async function shareSnippet(slug) {
      const baseUrl = import.meta.env.VITE_APP_CLIENT_BASE_URL;
      const shareURL = baseUrl + "/snippets/shared/" + slug;
      await navigator.clipboard.writeText(shareURL);
      Toast.success({ title: "Copied" });
    }

    onMounted(() => {
      selfSnippetStore.resetQuery();
      fetchFavoritedSnippets();
    });

    return {
      mySnippet,
      isShowDetailModal,
      selectedSnippet,
      favoritedSnippets,
      favoritedSnippetsMetadata,
      favoritedSnippets,
      showSnippet,
      onPageChange,
      likeSnippet,
      pinSnippet,
      shareSnippet,
    };
  },
});
</script>
