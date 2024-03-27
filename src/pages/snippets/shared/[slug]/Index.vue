<template>
  <div class="snippet-detail container pt-4">
    <SnippetsDetail
      v-if="snippetDetail"
      :snippet.sync="snippetDetail"
      @pinSnippet="pinSnippet"
      @likeSnippet="likeSnippet"
      @shareSnippet="shareSnippet"
    />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSnippetsStore } from "@/stores/snippets";
import { storeToRefs } from "pinia";
import Toast from "@/ultilities/toast";

// Components
import SnippetsDetail from "@/components/snippet/SnippetsDetail.vue";

export default {
  components: {
    SnippetsDetail,
  },

  setup() {
    const route = useRoute();

    // Store
    const snippetsStore = useSnippetsStore();

    // Store Data
    const { snippetDetail } = storeToRefs(snippetsStore);

    onMounted(() => {
      fetchSnippet();
    });

    // Functions
    function fetchSnippet() {
      if (route.params.slug) {
        snippetsStore.getSnippetDetail(String(route.params.slug));
      }
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
      if (result?.SnippetPin) {
        fetchSnippet();
      }
    }

    async function shareSnippet(slug) {
      const baseUrl = import.meta.env.VITE_APP_CLIENT_BASE_URL;
      const shareURL = baseUrl + "/snippets/shared/" + slug;
      await navigator.clipboard.writeText(shareURL);
      Toast.success({ title: "Copied" });
    }

    return {
      snippetDetail,
      likeSnippet,
      pinSnippet,
      shareSnippet,
    };
  },
};
</script>

<style lang="scss">
.snippet-detail {
  .snippet-container {
    width: 100% !important;
  }
}
</style>
