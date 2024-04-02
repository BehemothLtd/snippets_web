<template>
  <div class="2xl:px-48 xl:px-28">
    <img
      class="w-100 mb-[100px] m-auto"
      src="@/assets/images/banner_profile_pin.png"
      alt=""
    />

    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Tags</h1>
          <p class="mt-3 text-sm text-gray-700">A list of all the tags</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            class="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="showModal = true"
          >
            Add tag
          </button>
        </div>
      </div>
      <div class="mt-4">
        <label
          for="search"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Quick search
        </label>
        <div class="relative mt-2 flex items-center">
          <input
            v-model="tagInput.tagsQuery.nameCont"
            type="text"
            name="search"
            id="search"
            class="block w-full rounded-md border-0 py-1.5 pl-2 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            @keyup.enter="searchTag"
          />
          <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd
              class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400"
            >
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <div class="relative">
              <div
                v-if="selectedTag.length > 0"
                class="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12"
              >
                <button
                  type="button"
                  class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  Delete all
                </button>
              </div>
              <table class="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        :checked="
                          indeterminate || selectedTag.length === tags.length
                        "
                        :indeterminate="indeterminate"
                        @change="selectAllTagInList($event)"
                      />
                    </th>
                    <th
                      scope="col"
                      class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Self own
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Number of Usage
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                    v-for="tag in tags"
                    :key="tag.id"
                    :class="[selectedTag.includes(tag.id) && 'bg-gray-50']"
                  >
                    <td class="relative px-7 sm:w-12 sm:px-6">
                      <div
                        v-if="selectedTag.includes(tag.id)"
                        class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
                      ></div>
                      <input
                        v-if="tag.self"
                        v-model="selectedTag"
                        :value="tag.id"
                        type="checkbox"
                        class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </td>
                    <td
                      :class="[
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        selectedTag.includes(tag.id)
                          ? 'text-indigo-600'
                          : 'text-gray-900',
                      ]"
                    >
                      {{ tag.name }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center flex content-center justify-center"
                    >
                      <img
                        class="h-7 w-7"
                        v-if="tag.self"
                        src="@/assets/images/checked.png"
                        alt=""
                      />
                      <img
                        v-else
                        class="h-7 w-7"
                        src="@/assets/images/cancel.png"
                        alt=""
                      />
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
                    >
                      {{ tag.numberOfUsage }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 text-center"
                    >
                      <a
                        v-if="tag.self"
                        class="text-indigo-600 hover:text-indigo-900 cursor-pointer mr-2"
                        @click="showEditTag(tag.id)"
                      >
                        Edit<span class="sr-only">, {{ tag.name }}</span>
                      </a>

                      <a
                        v-if="tag.self"
                        class="text-red-500 text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        @click="onDeleteTag(tag)"
                      >
                        Delete<span class="sr-only">, {{ tag.name }}</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <BasicForm
        v-model:showModal="showModal"
        v-model:tag="tag"
        @edit="handleEditTag"
        @create="handleCreateTag"
      ></BasicForm>

      <Pagination
        v-if="tagMetadata.pages > 1"
        class="my-3 ms-auto float-right"
        :metadata="tagMetadata"
        @change="onPageChange($event)"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import Toast from "@/ultilities/toast";

// ==============COMPONENTS=============
import Pagination from "@/components/shared/Pagination.vue";
import BasicForm from "@/components/tags/BasicForm.vue";

// ============UTILITIES================
import { SwalOptions, SwalIconOptions } from "@/helpers/swal";
import useSwal from "@/composable/swal";
const { confirming } = useSwal();

// ==============STORE=============
import { useTagsStore } from "@/stores/tags/index";

const tagStore = useTagsStore();
const { tag, tags, tagMetadata, tagInput } = storeToRefs(tagStore);

const selectedTag = ref([]);
const showModal = ref(false);

const indeterminate = computed(
  () =>
    selectedTag.value.length > 0 && selectedTag.value.length < tags.value.length
);

function selectAllTagInList($event) {
  selectedTag.value = $event.target.checked
    ? tags.value.map((t) => (t.self ? t.id : null))
    : [];
}

function fetchTagList() {
  tagStore.fetchTags();
}

function onPageChange(page) {
  tagStore.setQuery({
    tagInput: {
      page,
    },
  });
  fetchTagList();
}

function searchTag() {
  tagInput.value.tagInput.page = 1;
  fetchTagList();
}

async function handleCreateTag() {
  const response = await tagStore.onCreateTag({ name: tag.value.name });

  if (response) {
    showModal.value = false;
    onPageChange(1);
  }
}

async function handleEditTag(tag) {
  if (!tag) return;

  // const confirmed = await confirming(
  //   new SwalOptions({
  //     html:
  //       "Do you want to update " +
  //       `<b>${tag.name}</b> <br/> Used tags will be updated`,
  //     icon: SwalIconOptions.Warning,
  //   })
  // );

  // if (confirmed) {
  const response = await tagStore.editTag(tag.id);

  if (response) {
    showModal.value = false;
    onPageChange(1);
  }
  // }
}

async function showEditTag(id) {
  await tagStore.showTag(id);

  if (tag.value?.id) {
    showModal.value = true;
  }
}

async function onDeleteTag(tag) {
  const confirmed = await confirming(
    new SwalOptions({
      html:
        "Do you want to delete " +
        `<b>${tag.name}</b> <br/> Used tags will be removed`,
      icon: SwalIconOptions.Error,
    })
  );

  if (confirmed) {
    await tagStore.deleteTag(tag.id);

    onPageChange(1);
  }
}

onMounted(() => {
  fetchTagList();
});
</script>
