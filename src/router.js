import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";
import { useGlobalStore } from "@/stores/global";
import { useAuthStore } from "@/stores/auth";
import MyPage from "@/layouts/MyPage.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import Default from "@/layouts/Default.vue";
import CreditLayout from "@/layouts/CreditLayout.vue";

// =============== AUTH ==============
import SignIn from "@/pages/auths/SignIn.vue";
import ForgotPassword from "@/pages/auths/ForgotPassword.vue";
import ResetPassword from "@/pages/auths/ResetPassword.vue";

// =============== PUBLIC ==============
import Snippets from "@/pages/snippets/Index.vue";

// ================= Snippet ==============
import SnippetsNew from "@/pages/snippets/New.vue";
import SnippetsEdit from "@/pages/snippets/[id]/Edit.vue";
import SnippetDetail from "@/pages/snippets/shared/[slug]/Index.vue";

// ================= Account ==============
import Account from "@/pages/account/index.vue";
import PinnedSnippets from "@/pages/account/snippets/pinned.vue";
import FavoritedSnippets from "@/pages/account/snippets/favorited.vue";
import Collections from "@/pages/account/collections.vue";
import Tags from "@/pages/account/tags/index.vue";

import CreditPage from "@/pages/credit/Index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Snippets,
      meta: {
        layout: Default,
        publics: true,
      },
    },
    {
      path: "/signIn",
      component: SignIn,
      meta: {
        layout: AuthLayout,
        publics: true,
      },
    },
    {
      path: "/forgotPassword",
      component: ForgotPassword,
      meta: {
        layout: AuthLayout,
        publics: true,
      },
    },
    {
      path: "/user/password/edit",
      component: ResetPassword,
      meta: {
        layout: AuthLayout,
        publics: true,
      },
    },
    {
      path: "/snippets/new",
      component: SnippetsNew,
      meta: {
        layout: MyPage,
      },
    },
    {
      path: "/snippets/:id/edit",
      component: SnippetsEdit,
      meta: {
        layout: MyPage,
      },
    },
    {
      path: "/snippets/shared/:slug",
      component: SnippetDetail,
      meta: {
        layout: Default,
        publics: true,
      },
    },
    {
      path: "/credit",
      component: CreditPage,
      meta: {
        layout: CreditLayout,
        publics: true,
      },
    },

    {
      path: "/account",
      component: Account,
      meta: {
        layout: MyPage,
      },
    },
    {
      path: "/account/tags",
      component: Tags,
      meta: {
        layout: MyPage,
      },
    },
    {
      path: "/account/snippets/pinned",
      component: PinnedSnippets,
      meta: {
        layout: MyPage,
      },
    },
    {
      path: "/account/snippets/favorited",
      component: FavoritedSnippets,
      meta: {
        layout: MyPage,
      },
    },
    {
      path: "/account/collections/:id",
      component: Collections,
      meta: {
        layout: MyPage,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = !to.meta.publics;

  const authStore = useAuthStore();

  const isAuthenticated = authStore.token;

  if (requiresAuth && !isAuthenticated) {
    authStore.token = null;
    next("/signIn");
  } else next();
});

export default router;
