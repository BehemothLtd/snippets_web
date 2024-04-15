<template>
  <div class="2xl:px-48 xl:px-28">
    <img
      class="w-100 mb-[100px] m-auto"
      src="@/assets/images/banner_profile_pin.png"
      alt=""
    />

    <div
      v-if="pinnedSnippets.length"
      class="snippet-list grid gap-10 grid-cols-1 grid-rows-auto"
    >
      <SnippetItem
        v-for="(snippet, index) in pinnedSnippets"
        data-aos="fade-right"
        data-aos-once="true"
        :key="index"
        :snippet="snippet"
        @pin="pinSnippet(snippet.id)"
        @show="showSnippet(snippet)"
        snippetType="pinned"
        class="h-[170px]"
      ></SnippetItem>
    </div>
    <CommonModal :open="isShowDetailModal" @close="isShowDetailModal = false">
      <SnippetsDetail
        :snippet.sync="selectedSnippet"
        @pinSnippet="pinSnippet"
        @likeSnippet="likeSnippet"
        @shareSnippet="shareSnippet"
      />
    </CommonModal>

    <Pagination
      v-if="pinnedSnippetsMetadata.pages > 1"
      class="my-3 ms-auto float-right"
      :metadata="pinnedSnippetsMetadata"
      @change="onPageChange($event)"
    ></Pagination>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import Toast from "@/ultilities/toast";

// ==============COMPONENTS=============
import SnippetItem from "@/components/snippet/SnippetItem.vue";
import Pagination from "@/components/shared/Pagination.vue";
import CommonModal from "@/components/shared/CommonModal.vue";
import SnippetsDetail from "@/components/snippet/SnippetsDetail.vue";

// ============UTILITIES================
import { SnippetTypeOptions } from "@/helpers/constant.js";

// ==============STORE=============
import { useSelfSnippetsStore } from "@/stores/snippets/self";
import { useSnippetsStore } from "@/stores/snippets/index";
import { useCommon } from "@/composable/common.js";

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
      pinnedSnippets,
      pinnedSnippetsMetadata,
      mySnippet, // self
    } = storeToRefs(selfSnippetStore);

    const { snippetDetail } = storeToRefs(snippetStore); // public

    // ==============COMPUTED=============
    const selectedSnippet = computed(() =>
      privateSnippetFlg.value ? mySnippet.value : snippetDetail.value
    );

    // ==============ACTIONS=============
    const { modifyItemInList } = useCommon();
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

    function fetchPinnedSnippets() {
      selfSnippetStore.getPinnedSnippets();
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
      const result = await snippetStore.pin(String(id));
      const snippet = {
        id: String(id),
        pinned: result?.SnippetPin,
      };
      if (result?.SnippetPin) {
        modifyItemInList(snippet);
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
      fetchPinnedSnippets();
    });

    return {
      mySnippet,
      isShowDetailModal,
      selectedSnippet,
      pinnedSnippets,
      pinnedSnippetsMetadata,
      pinnedSnippets,
      showSnippet,
      onPageChange,
      pinSnippet,
      likeSnippet,
      shareSnippet,
    };
  },
});
</script>
