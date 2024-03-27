<template>
  <li class="sticky top-0 bg-white list-none">
    <router-link
      to="/snippets/new"
      type="button"
      class="text-white !mb-5 !mx-auto bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Create new Snippet +
    </router-link>
  </li>

  <ul role="list" class="flex flex-1 flex-col gap-y-7">
    <li>
      <ul role="list" class="-mx-2 space-y-1">
        <li v-for="item in menus" :key="item.text">
          <router-link
            :to="item.url"
            :class="[
              path == item.url
                ? 'bg-gray-50 text-indigo-600'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
            ]"
          >
            <component :is="item.icon" class="svg" />
            {{ item.text }}
          </router-link>
        </li>

        <li v-for="collection in collections" :key="collection.id">
          <router-link
            :to="`/account/collections/${collection.id}`"
            :class="[
              path == `/account/collections/${collection.id}`
                ? 'bg-gray-50 text-indigo-600'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
            ]"
          >
            <SvgCollection></SvgCollection>
            {{ collection.title }}
          </router-link>
        </li>

        <li v-if="collections.length && viewMoreAble">
          <a
            type="button"
            class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            @click="viewMoreCollection"
          >
            <SvgArrowDown></SvgArrowDown>
            <button>View More</button>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// ==============COMPONENTS=============
import SvgDashboard from "@/components/svg/SvgDashboard.vue";
import SvgLike from "@/components/svg/SvgLike.vue";
import SvgPinned from "@/components/svg/SvgPinned.vue";
import SvgCollection from "@/components/svg/SvgCollection.vue";
import SvgArrowDown from "@/components/svg/SvgArrowDown.vue";
// import SvgSetting from "@/components/svg/SvgSetting.vue";

// ==============STORE=============
import { useCollectionsStore } from "@/stores/collections/index";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const menus = [
      { icon: SvgDashboard, text: "My Page", url: "/account", current: true },
      { icon: SvgLike, text: "Liked", url: "/account/snippets/favorited" },
      { icon: SvgPinned, text: "Pinned", url: "/account/snippets/pinned" },
      // {icon: "Dashboard", text: "Setting", url: "/account/setting"},
    ];

    const menuShow = ref(false);

    const hideMenu = () => {
      menuShow.value = !menuShow.value;
    };

    // ==============STORE=============
    const collectionStore = useCollectionsStore();

    // =========STORE DATA===========
    const { collections, query, metadata } = storeToRefs(collectionStore);

    const route = useRoute();

    const path = computed(() => route.fullPath);

    // =========COMPUTED===========
    const viewMoreAble = computed(
      () => collections.value.length < metadata.value.count
    );

    // =========METHODS==========
    function fetchCollections() {
      collectionStore.fetchCollections();
    }

    function viewMoreCollection() {
      query.value.perPage += 15;
      fetchCollections();
    }

    onMounted(() => {
      if (!route.params.navigate) {
        collectionStore.resetQuery();
        query.value.perPage = 5;
        fetchCollections();
      }
    });

    return {
      menuShow,
      menus,
      path,
      path,
      collections,
      viewMoreAble,
      metadata,

      hideMenu,
      viewMoreCollection,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-item {
  color: #434c9d;
  &.router-link-active {
    font-weight: bold;
  }
}
@media (max-width: 768px) {
  .menu-toggle {
    margin-top: 10px;
    padding: 20px;
    background-color: #434c9d;
    border-radius: 10px;
    .text-toggle {
      color: #fff;
    }
  }

  a.router-link-active.router-link-exact-active {
    padding: 10px;
    border-radius: 4px;
    background: #fff;
    .text-toggle {
      color: #000;
    }
  }

  a.router-link-active.router-link-exact-active.text-white.\!mb-5.\!mx-auto.bg-gradient-to-br.from-green-400.to-blue-600.hover\:bg-gradient-to-bl.focus\:ring-4.focus\:outline-none.focus\:ring-green-200.dark\:focus\:ring-green-800.font-medium.rounded-lg.text-sm.px-5.py-2\.5.text-center.mr-2.mb-2 {
    color: #000;
  }
}
</style>
