<template>
  <div class="2xl:px-48 xl:px-28">
    <img
      class="w-100 mb-[100px] m-auto"
      src="@/assets/images/banner_profile.png"
      alt=""
    />
    <div class="snippet-list grid gap-10 grid-cols-1 grid-rows-auto">
      <SnippetItem
        v-for="(snippet, index) in mySnippets"
        data-aos="fade-right"
        data-aos-once="true"
        :key="index"
        :snippet="snippet"
        @update="updateSnippet(snippet, $event)"
        @delete="deleteSnippet(snippet.id)"
        @show="showSnippet(snippet)"
        class="h-[170px]"
      ></SnippetItem>
    </div>

    <CommonModal
      v-if="isShowDetailModal"
      :open="isShowDetailModal"
      @close="isShowDetailModal = false"
    >
      <SnippetsDetail
        :snippet.sync="selectedSnippet"
        @pinSnippet="pinSnippet"
        @likeSnippet="likeSnippet"
        @shareSnippet="shareSnippet"
      />
    </CommonModal>

    <Pagination
      data-aos="fade-left"
      data-aos-once="true"
      v-if="metadata.pages > 1"
      class="my-3 ms-auto float-right"
      :metadata="metadata"
      @change="onPageChange($event)"
    ></Pagination>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from "vue";

// ==============COMPONENTS=============
import SnippetItem from "@/components/snippet/SnippetItem.vue";
import Pagination from "@/components/shared/Pagination.vue";
import CommonModal from "@/components/shared/CommonModal.vue";
import SnippetsDetail from "@/components/snippet/SnippetsDetail.vue";

// ============UTILITIES================
import { SnippetTypeOptions } from "@/helpers/constant.js";
import { useCommon } from "@/composable/common.js";

// ==============STORE=============
import { useSelfSnippetsStore } from "@/stores/snippets/self";
import { useSnippetsStore } from "@/stores/snippets/index";
import { storeToRefs } from "pinia";
import Toast from "@/ultilities/toast";

export default defineComponent({
  components: {
    SnippetItem,
    Pagination,
    CommonModal,
    SnippetsDetail,
  },

  setup() {
    const { modifyItemInList } = useCommon();
    // ==============ACTIVE=============
    const isShowDetailModal = ref(false);

    const privateSnippetFlg = ref(false);

    // ==============STORE=============
    const selfSnippetStore = useSelfSnippetsStore();

    const snippetStore = useSnippetsStore();

    // Store Data
    const { mySnippets, mySnippet, metadata } = storeToRefs(selfSnippetStore);
    const { snippetDetail } = storeToRefs(snippetStore);

    const selectedSnippet = computed(() =>
      privateSnippetFlg.value ? mySnippet.value : snippetDetail.value
    );
    // ==============ACTIONS=============

    function fetchMySnippets() {
      selfSnippetStore.getMySnippets();
    }

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

    async function updateSnippet(snippet, privateKey) {
      if (snippet.snippetType == SnippetTypeOptions.PUBLIC) {
        await selfSnippetStore.snippetPrivate({ id: snippet.id, privateKey });
      } else {
        await selfSnippetStore.snippetPublic({ id: snippet.id, privateKey });
      }
      selfSnippetStore.resetQuery();
      fetchMySnippets();
    }

    function onPageChange(page) {
      selfSnippetStore.setQuery({ page });
      fetchMySnippets();
    }

    async function deleteSnippet(id) {
      await selfSnippetStore.deleteMySnippet(String(id));
      fetchMySnippets();
    }

    async function likeSnippet(input) {
      const result = await snippetsStore.likeSnippet(String(input.id));
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
      if (snippet) {
        modifyItemInList(snippet, mySnippets, snippetDetail);
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
      fetchMySnippets();
    });

    return {
      isShowDetailModal,
      selectedSnippet,
      mySnippets,
      mySnippet,
      metadata,
      snippetDetail,

      //Function
      showSnippet,
      updateSnippet,
      onPageChange,
      deleteSnippet,
      likeSnippet,
      pinSnippet,
      shareSnippet,
    };
  },
});
</script>
