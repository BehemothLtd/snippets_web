import { ref } from "vue";

import { defineStore } from "pinia";
import { get } from "lodash";

import axios from "@/apis/axios";
import gqlRequest from "@/apis/gqlClient";

export const useGlobalStore = defineStore("global", () => {
  const validationErrors = ref({});
  const errorMessage = ref("");
  const requests = ref([]);

  function getErrors(name) {
    return get(validationErrors.value, name, []);
  }

  function setErrorMessage(message) {
    errorMessage.value = message;
  }

  function setValidationErrors(value) {
    validationErrors.value = value;
  }

  function removeRequest(payload) {
    setTimeout(() => {
      requests.value = requests.value.filter((item) => item.id !== payload.id);
    }, 300);
  }

  function addRequest(payload) {
    requests.value.push(payload);
  }

  async function uploadImages(formData) {
    const response = await gqlRequest(
      null,
      { data: formData },
      { loading: true, toast: false, requestType: "upload" }
    );
    return response;
  }

  return {
    // Errors Msgs
    requests,
    errorMessage,
    validationErrors,

    uploadImages,
    setValidationErrors,
    getErrors,
    setErrorMessage,
    addRequest,
    removeRequest,
  };
});
