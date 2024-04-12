<template>
  <div class="py-4">
    <nav class="block">
      <ul class="flex pl-0 rounded list-none flex-wrap">
        <li v-for="(page, index) in metadata.pages" :key="index">
          <span
            class="cursor-pointer first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-teal-500 bg-white text-teal-500"
            :class="{
              '!bg-teal-500': metadata.page == page,
              '!text-white': metadata.page == page,
            }"
            @click="$emit('change', page)"
          >
            {{ page }}
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    metadata: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>
