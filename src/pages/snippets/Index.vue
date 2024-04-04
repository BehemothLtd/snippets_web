<template>
  <div class="xl:px-48">
    <div
      id="snippet-list"
      class="grid-container gap-0"
      ref="listWrapper"
      :class="listClass"
    >
      <SnippetCard
        v-for="snippet in listSnippets"
        :key="snippet.id"
        :item.sync="snippet"
        class="card"
        :type="listType"
        v-bind="$attrs"
        @getSnippetDetail="getSnippetDetail"
        @likeSnippet="likeSnippet"
        @pin="pinSnippet"
        @share="shareSnippet"
      />
    </div>

    <div class="flex flex-row justify-center">
      <Pagination
        :metadata="snippetMetadata"
        @change="onPageChange"
      ></Pagination>
    </div>

    <CommonModal :open="showModal" @close="closeModal">
      <SnippetsDetail
        :snippet.sync="snippetDetail"
        @pinSnippet="pinSnippet"
        @likeSnippet="likeSnippet"
        @shareSnippet="shareSnippet"
      />
    </CommonModal>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from "vue";
import { watchOnce } from "@vueuse/core";

import { storeToRefs } from "pinia";
import { useSnippetsStore } from "@/stores/snippets";
import { useCollectionsStore } from "@/stores/collections";
import { useAuthStore } from "@/stores/auth";
import { useCommon } from "@/composable/common.js";
import { useRoute, useRouter } from "vue-router";

// Components
import SnippetCard from "@/components/snippet/SnippetCard.vue";
import SnippetsDetail from "@/components/snippet/SnippetsDetail.vue";
import Pagination from "@/components/shared/Pagination.vue";
import Svg from "@/components/svg/Svg.vue";
import Toast from "@/ultilities/toast";

export default {
  components: {
    SnippetCard,
    SnippetsDetail,
    Svg,
    Pagination,
  },
  setup() {
    // Data
    const listWrapper = ref(null);
    let listType = ref("line");
    const listClass = computed(() => `${listType.value}-list`);
    const showModal = computed(() => {
      if (snippetDetail?.value?.slug && route.query.slug) {
        return true;
      }
      return false;
    });
    const route = useRoute();
    const router = useRouter();

    // ============STORE=============
    const authStore = useAuthStore();
    const collectionStore = useCollectionsStore();
    const snippetsStore = useSnippetsStore();
    // Store Data
    const {
      listSnippets,
      snippetDetail,
      snippetSLug,
      snippetMetadata,
      homePageInput,
    } = storeToRefs(snippetsStore);

    // composable
    const { modifyItemInList } = useCommon();

    onMounted(() => {
      // if (authStore.token) {
      //   fetchCollections();
      // }

      if (route.query.slug) {
        homePageInput.value = {
          ...homePageInput.value,
          slug: String(route.query.slug),
          includeSnippetDetail: true,
        };
      }
      snippetsStore.loadDataHomePage();
    });

    // Functions

    async function onPageChange(page) {
      homePageInput.value.snippetInput.page = page;
      await fetchSnippets();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    function fetchCollections() {
      collectionStore.fetchCollections();
    }

    function fetchSnippets() {
      snippetsStore.fetchSnippets();
    }

    function getSnippetDetail(slug) {
      snippetsStore.getSnippetDetail(String(slug));
      router.push({ query: { ...route.query, slug } });
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
      if (result?.SnippetPin) {
        modifyItemInList(snippet, listSnippets, snippetDetail);
      }
    }

    async function shareSnippet(slug) {
      const baseUrl = import.meta.env.VITE_APP_CLIENT_BASE_URL;
      const shareURL = baseUrl + "?slug=" + slug;
      await navigator.clipboard.writeText(shareURL);
      Toast.success({ title: "Copied" });
    }

    function isActive(type) {
      return type === listType.value ? "active" : "inactive";
    }

    function changeDisplayType(type) {
      listType.value = type;
    }

    function handleScroll(e) {
      e.preventDefault();
      let element = listWrapper.value;

      if (
        element &&
        element.getBoundingClientRect().bottom < window.innerHeight
      ) {
        if (currentPage.value < maxPage.value) {
          snippetsStore.changePage(currentPage.value + 1);
          fetchSnippets();
        } else if (currentPage.value == maxPage.value) {
          // TODO: toast latest
        }
      }
    }

    function closeModal() {
      snippetDetail.value = null;

      const query = { ...route.query };
      delete query.slug;
      router.replace({ query });
    }

    return {
      listSnippets,
      listClass,
      listWrapper,
      listType,
      snippetDetail,
      showModal,
      snippetMetadata,
      // function
      onPageChange,
      isActive,
      changeDisplayType,
      getSnippetDetail,
      closeModal,
      likeSnippet,
      pinSnippet,
      shareSnippet,
    };
  },
};
</script>

<style lang="scss" scoped>
.masonry-list {
  column-count: 3;
  margin-top: 20px;

  .card {
    break-inside: avoid;
    margin: 30px 0px 30px 30px;
    border-radius: 20px;

    &:first-child {
      margin-top: 0;
    }
  }
}

.line-list {
  margin: 20px 20px;

  .card {
    margin-bottom: 20px;
  }
}

.active {
  background: #434c9d !important;
}
</style>
