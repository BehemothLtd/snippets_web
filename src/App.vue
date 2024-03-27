<template>
  <div>
    <Loading></Loading>

    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import { defineAsyncComponent, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import Loading from "@/components/shared/Loading.vue";

import "md-editor-v3/lib/style.css";
import "md-editor-v3/lib/preview.css";
import "@/assets/main.scss";

import AOS from "aos";

export default {
  components: {
    Default: defineAsyncComponent(() => import("@/layouts/Default.vue")),
    AuthLayout: defineAsyncComponent(() => import("@/layouts/AuthLayout.vue")),
    Loading: Loading,
  },

  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const layout = computed(() => route.meta.layout);

    onMounted(() => {
      AOS.init();
    });

    return {
      layout,
    };
  },
};
</script>
