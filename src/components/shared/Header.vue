<template>
  <div class="header">
    <Menu></Menu>

    <div class="header-bottom relative md:mb-[250px]">
      <div class="container mx-auto">
        <div class="flex flex-col">
          <h2
            class="text-2xl font-bold tracking-tight text-white sm:text-4xl text-center"
          >
            WHAT DO YOU NEED?
          </h2>

          <form @submit.prevent="searchSnippet">
            <div class="relative mt-2 text-center w-6/12 mx-auto">
              <input
                v-model="homePageInput.snippetQuery.titleCont"
                type="text"
                class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 border-transparent focus:outline-none focus:border-transparent focus:ring-0 focus-visible:ring-0 sm:text-sm sm:leading-6"
              />
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-3"
                :class="{ 'pointer-events-none': !homePageInput.snippetQuery.titleCont }"
              >
                <Svg
                  v-if="!homePageInput.snippetQuery.titleCont"
                  class="h-5 w-5 text-gray-400"
                  iconName="SearchBar"
                ></Svg>
                <a class="cursor-pointer" v-else @click="clearSearch">
                  <Svg class="h-5 w-5 text-gray-400" iconName="Close"></Svg>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <img class="left-icon" src="@/assets/images/icon_circle.png" alt="icon" />
      <img class="right-icon" src="@/assets/images/icon_sharp.png" alt="icon" />
    </div>
  </div>
</template>

<script>
import Svg from "@/components/svg/Svg.vue";
import Menu from "@/components/shared/Menu.vue";

import { storeToRefs } from "pinia";
import { useSnippetsStore } from "@/stores/snippets";

export default {
  components: {
    Svg,
    Menu,
  },

  setup() {
    const snippetStore = useSnippetsStore();
    const { listSnippets, homePageInput } = storeToRefs(snippetStore);

    function searchSnippet() {
      listSnippets.value = [];
      homePageInput.value.snippetInput.page = 1;
      homePageInput.value.snippetInput.perPage = 10;

      snippetStore.fetchSnippets();
    }

    function clearSearch() {
      snippetStore.resetQuery();
      snippetStore.fetchSnippets();
    }

    return {
      homePageInput,

      searchSnippet,
      clearSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-bottom {
  // background: url("@/assets/images/svg/wave.svg");
  background-color: #434c9d;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 15vh;

  .left-icon {
    max-width: 100%;
    height: auto;
    position: absolute;
    top: 200px;
    left: 24px;
  }

  .right-icon {
    max-width: 100%;
    height: auto;
    position: absolute;
    top: 250px;
    right: 50px;
  }
  @media (max-width: 1536px) {
    .left-icon {
      top: 150px;
      width: 180px;
    }
    .right-icon {
      top: 230px;
      width: 180px;
    }
  }

  @media (max-width: 1280px) {
    .left-icon {
      top: 150px;
      width: 150px;
    }
    .right-icon {
      top: 200px;
      width: 150px;
    }
  }

  @media (max-width: 1024px) {
    .left-icon {
      top: 100px;
      width: 120px;
    }
    .right-icon {
      top: 160px;
      right: 24px;
      width: 120px;
    }
  }

  @media (max-width: 768px) {
    .left-icon {
      top: 50px;
      left: 10px;
      width: 100px;
    }
    .right-icon {
      top: 100px;
      right: 10px;
      width: 100px;
    }
  }
}
</style>
