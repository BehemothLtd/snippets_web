<template>
  <Menu
    v-if="token"
    as="div"
    class="relative inline-block text-left hidden md:inline-block"
  >
    <div>
      <MenuButton
        class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md text-white text-sm font-semibold text-gray-900 shadow-sm"
      >
        <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar-img" />
        {{ name }}
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="dropdown-menu absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1 menu-item">
          <router-link
            to="/account"
            :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block px-4 py-2 text-sm',
            ]"
            class="font-bold flex justify-between items-center"
          >
            My profile
            <SvgUser />
          </router-link>
        </div>
        <div class="py-1 menu-item">
          <a
            to="/signIn"
            :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block px-4 py-2 text-sm',
            ]"
            class="font-bold flex justify-between items-center"
            @click="logOut"
          >
            Logout
            <SvgLogout />
          </a>
        </div>
      </MenuItems>
    </transition>
  </Menu>
  <button v-else class="btn-login drop-shadow-md" @click="gotoLogin">
    Login
  </button>
</template>

<script setup>
import SvgUser from "@/components/svg/SvgUser.vue";
import SvgLogout from "@/components/svg/SvgLogout.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useGlobalStore } from "@/stores/global";

const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const name = computed(() => authStore.name);
const token = computed(() => authStore.token);

function gotoLogin() {
  router.push("/signIn");
}

function logOut() {
  // TODO
  authStore.token = null;
  globalStore.validationErrors = {};
  localStorage.removeItem("authToken");
  localStorage.removeItem("name");
  router.push("/signIn");
}
</script>

<style lang="scss" scoped>
.avatar-img {
  width: 40px;
}
.dropdown-menu {
  width: 150px;
}
.menu-item {
  a {
    &:hover {
      background-color: #f0edff;
    }
  }
}
.btn-login {
  color: white;
  font-weight: bold;
  background: linear-gradient(270deg, #434c9d 0%, #38b1a6 100%);
  padding: 8px 25px;
  border-radius: 30px;
  cursor: pointer;
}
</style>
