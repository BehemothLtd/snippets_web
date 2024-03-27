import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

import { useRouter } from "vue-router";

import AuthRepository from "@/apis/repositories/authsRepository";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  // ================ STATES ==========================
  const token = ref(useLocalStorage("authToken", null));

  // ================ GETTERS ========================
  const layout = computed(() => (!!token.value ? "Default" : "AuthLayout"));

  // ================ ACTIONS ========================
  function setToken(tokenValue) {
    token.value = tokenValue;
  }

  async function signInAction({ email, password }) {
    const data = await AuthRepository.signIn({ email, password });

    token.value = data.SignIn?.token;

    router.push("/account");
  }

  async function signUpAction({ email, password, fullName }) {
    const result = await AuthRepository.signUp({
      input: { email, password, fullName },
    });

    return result;
  }

  async function sendPasswordResetEmailAction({ email }) {
    const result = await AuthRepository.sendPasswordResetEmail({
      email,
    });

    return result;
  }

  async function resetPasswordAction({ input, token }) {
    const result = await AuthRepository.resetPassword({
      input,
      token,
    });

    return result;
  }

  return {
    // data
    token,
    name,
    layout,

    // function
    setToken,
    signInAction,
    signUpAction,
    sendPasswordResetEmailAction,
    resetPasswordAction,
  };
});
