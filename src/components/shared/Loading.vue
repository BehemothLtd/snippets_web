<template>
  <div class="text-center spinner" v-if="loading">
    <div role="status">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="margin: auto; display: block"
        width="100px"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <circle cx="60" cy="50" r="4" fill="#38b1a6">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              values="95;35"
              keyTimes="0;1"
              begin="-0.67s"
            ></animate>
            <animate
              attributeName="fill-opacity"
              repeatCount="indefinite"
              dur="1s"
              values="0;1;1"
              keyTimes="0;0.2;1"
              begin="-0.67s"
            ></animate>
          </circle>
          <circle cx="60" cy="50" r="4" fill="#38b1a6">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              values="95;35"
              keyTimes="0;1"
              begin="-0.33s"
            ></animate>
            <animate
              attributeName="fill-opacity"
              repeatCount="indefinite"
              dur="1s"
              values="0;1;1"
              keyTimes="0;0.2;1"
              begin="-0.33s"
            ></animate>
          </circle>
          <circle cx="60" cy="50" r="4" fill="#38b1a6">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              values="95;35"
              keyTimes="0;1"
              begin="0s"
            ></animate>
            <animate
              attributeName="fill-opacity"
              repeatCount="indefinite"
              dur="1s"
              values="0;1;1"
              keyTimes="0;0.2;1"
              begin="0s"
            ></animate>
          </circle>
        </g>
        <g transform="translate(-15 0)">
          <path
            d="M50 50L20 50A30 30 0 0 0 80 50Z"
            fill="#434c9d"
            transform="rotate(90 50 50)"
          ></path>
          <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#434c9d">
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;45 50 50;0 50 50"
              keyTimes="0;0.5;1"
            ></animateTransform>
          </path>
          <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#434c9d">
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;-45 50 50;0 50 50"
              keyTimes="0;0.5;1"
            ></animateTransform>
          </path>
        </g>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();
const { requests } = storeToRefs(globalStore);

const loading = ref(false);

watch(
  requests,
  () => {
    if (requests.value.length > 0) {
      begin();
    } else {
      stop();
    }
  },
  {
    deep: true,
  }
);

function begin() {
  loading.value = true;
}

function stop() {
  setTimeout(() => {
    loading.value = false;
  }, 500);
}
</script>

<style scoped>
.spinner {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.46);
}
</style>
