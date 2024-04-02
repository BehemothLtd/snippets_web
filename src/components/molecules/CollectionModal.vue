<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div
                ref="listWrapper"
                class="overflow-y-scroll overflow-x-hidden max-h-[300px]"
                @scroll="handleScroll"
              >
                <p class="mb-2">Save snippet to...</p>

                <div class="space-y-5 my-2" v-for="item in collections">
                  <div class="relative flex items-start">
                    <div class="flex h-6 items-center">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        :checked="isAdded(item.snippets)"
                        @change="handleSnippet(item.id, $event.target.checked)"
                      />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                      <label for="comments" class="font-medium text-gray-900">
                        {{ item.title }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="isCreateNew">
                <label
                  for="collection-title"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Title</label
                >
                <input
                  v-model="title"
                  type="text"
                  id="collection-title"
                  class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div class="flex justify-center">
                <button
                  v-if="isCreateNew"
                  @click="createCollection"
                  type="button"
                  class="mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
                >
                  Create
                </button>
                <button
                  v-else
                  @click="isCreateNew = true"
                  type="button"
                  class="mt-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Create new collection
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { ref, onMounted, watch, computed } from "vue";

import { storeToRefs } from "pinia";

import { useCollectionsStore } from "@/stores/collections";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  snippetId: {
    type: [Number, String],
    default: null,
  },
});

const emits = defineEmits(["close"]);

// ============REACTIVE=============
const listWrapper = ref(null);
const isCreateNew = ref(false);
const title = ref("");

// ============STORE=============
const collectionStore = useCollectionsStore();

// ============DATA==============
const { collections, query, maxPage } = storeToRefs(collectionStore);

// ============METHODS=============
function isAdded(snippets) {
  if (!snippets.length) return false;

  return snippets.some((item) => item.id == props.snippetId);
}

function fetchCollections() {
  collectionStore.fetchCollections();
}

async function createCollection() {
  const result = await collectionStore.createCollection({ title: title.value });

  await handleSnippet(result.collectionCreate?.collection?.id, true);

  fetchCollections();

  title.value = "";
  isCreateNew.value = false;
  emits("close");
}

function handleSnippet(id, added) {
  if (!id || !props.snippetId) return;

  if (added) {
    collectionStore.collectionAddSnippet({ id, snippetId: props.snippetId });
  } else {
    collectionStore.collectionRemoveSnippet({ id, snippetId: props.snippetId });
  }
}

function handleScroll(e) {
  e.preventDefault();
  let element = listWrapper.value;

  const scrollPosition = element.scrollTop;
  const scrollHeight = element.scrollHeight;
  const clientHeight = element.clientHeight;

  if (scrollPosition + clientHeight >= scrollHeight) {
    if (query.value.page < maxPage.value) {
      query.value.page += 1;

      fetchCollections();
    }
  }
}
</script>
