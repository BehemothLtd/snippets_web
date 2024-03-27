<template>
  <div class="header sticky top-0 z-[11] w-full">
    <div class="header-top">
      <router-link to="/" @click.passive="refresh">
        <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
      </router-link>
      <div class="header-top-action flex items-center gap-8">
        <SvgDarkTheme></SvgDarkTheme>
        <AuthMenu></AuthMenu>
      </div>
    </div>
  </div>
</template>

<script>
import SvgDarkTheme from "@/components/svg/SvgDarkTheme.vue";
import AuthMenu from "@/components/shared/AuthMenu.vue";

import { useSnippetsStore } from "@/stores/snippets";

export default {
  components: {
    SvgDarkTheme,
    AuthMenu,
  },

  setup() {
    const snippetStore = useSnippetsStore();

    function refresh() {
      snippetStore.resetQuery();
      snippetStore.fetchSnippets();
    }

    return {
      refresh,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-top {
  background: #434c9d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  .logo {
    max-width: 146px;
  }
  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: -1px;
  }
}
</style>
