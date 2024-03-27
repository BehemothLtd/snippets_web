import axios from "axios";
import router from "@/router";
// ==========UTILITIES=========
import { get } from "lodash";
import Toast from "@/ultilities/toast";

// ==========STORE=========
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/global";

const BASE_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/snippetGql`;
import { print } from "graphql";

const api = axios.create({
  timeout: 5000,
});

function hideLoading() {
  const globalStore = useGlobalStore();
  globalStore.loading = false;
}

api.interceptors.request.use(
  function (config) {
    const globalStore = useGlobalStore();
    globalStore.validationErrors = {};
    globalStore.errorMessage = "";

    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    if (token.value) {
      config.headers["BhmAIO-Authorization"] = `Bearer ${token.value}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    hideLoading();

    Toast.error({ title: error.message });

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    hideLoading();

    // Do something with response data
    const errors = response.data.errors;

    if (errors && errors.length > 0) {
      const errorMessage =
        get(errors[0], "extensions.message") || "An error occurred";
      const errorCode = get(errors[0], "extensions.code");

      switch (errorCode) {
        case 401:
          token.value = null;
          router.push("/signIn");
          break;

        default:
          break;
      }

      Toast.error({ title: errorMessage });

      const findError = errors.find((item) => item.message && item.code == 422);
      const globalStore = useGlobalStore();
      globalStore.validationErrors = findError?.errors || {};
    } else if (response.data) {
      const successMessage = get(
        response.data.data,
        `${Object.keys(response.data.data)[0]}.message`
      );

      if (response.config.toast) {
        Toast.success({ title: successMessage });
      }

      return response.data.data;
    }
  },
  function (error) {
    hideLoading();

    const errCode = get(error, "response.status");

    const errorMessage =
      get(error, "response.data.errors[0].message") || "An error occurred";

    Toast.error({ title: errorMessage });

    if (errCode === 401 || errCode === 403) {
      const globalStore = useGlobalStore();
      globalStore.token = null;

      router.push("/signIn");
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default function (
  query,
  variables,
  options = {
    loading: true,
    toast: true,
  }
) {
  const globalStore = useGlobalStore();
  globalStore.loading = options.loading;

  return api.post(
    BASE_URL,
    {
      query: print(query),
      variables: variables,
    },
    options
  );
}
