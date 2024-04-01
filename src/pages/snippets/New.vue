<template>
  <div class="snippet-new container mx-auto lg:w-11/12">
    <form @submit.prevent="onCreateSnippet">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div
            class="mt-24 md:mt-16 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          >
            <div class="col-span-full">
              <form-validator label="Title" required name="title">
                <input
                  v-model="form.title"
                  type="text"
                  name="title"
                  id="snippet-title"
                  autocomplete="given-name"
                  class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </form-validator>
              <p class="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about your snippet.
              </p>
            </div>

            <div class="col-span-full">
              <form-validator>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    :value="form.snippetType"
                    :checked="isPublic"
                    @change="onUpdateSnippetType"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                  <span class="ml-3 text-sm font-medium text-gray-600">
                    {{ form?.snippetType }}
                  </span>
                </label>
              </form-validator>
            </div>

            <div v-if="!isPublic" class="col-span-3">
              <form-validator label="Private Key" required name="private_key">
                <input
                  v-model="form.privateKey"
                  type="text"
                  name="private_key"
                  id="private_key"
                  autocomplete="given-name"
                  class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </form-validator>
            </div>

            <div class="col-span-full">
              <form-validator label="Content" required name="content">
                <MdEditor
                  language="en-US"
                  v-model="form.content"
                  :toolbars="toolbars"
                  @onUploadImg="onUploadImg"
                >
                </MdEditor>
              </form-validator>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <router-link
          type="button"
          class="btn-cancel rounded-md text-sm font-semibold leading-6 text-gray-900"
          to="/account"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          class="btn-save rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from "vue";
import { useRouter } from "vue-router";

// ============COMPONENTS================
import FormValidator from "@/components/shared/FormValidator.vue";
import { MdEditor, NormalToolbar } from "md-editor-v3";

// ============UTILITIES================
import { SnippetTypeOptions } from "@/helpers/constant.js";

// ============STORE================
import { useSnippetsStore } from "@/stores/snippets";
import { useGlobalStore } from "@/stores/global";
export default defineComponent({
  components: {
    FormValidator,
    MdEditor,
    NormalToolbar,
  },

  setup() {
    const toolbars = [
      "bold",
      "underline",
      "italic",
      "-",
      "title",
      "strikeThrough",
      "sub",
      "sup",
      "quote",
      "unorderedList",
      "orderedList",
      "task",
      "-",
      "codeRow",
      "code",
      "link",
      "image",
      "table",
      "-",
      "=",
      "pageFullscreen",
      "fullscreen",
    ];

    const router = useRouter();

    // ============STORE============
    const snippetStore = useSnippetsStore();

    const globalStore = useGlobalStore();

    // ============REACTIVE============
    const form = reactive({
      title: "",
      content: "",
      privateKey: null,
      snippetType: "private",
    });

    const isPublic = computed(
      () => form.snippetType == SnippetTypeOptions.PUBLIC
    );

    // ============METHODS============
    async function onCreateSnippet() {
      // TODO
      const result = await snippetStore.createSnippet(form);

      if (result.SnippetCreate?.snippet) {
        router.push(`/snippets/${result.SnippetCreate?.snippet.id}/edit`);
      }
    }

    function onUpdateSnippetType() {
      if (form && form.snippetType == SnippetTypeOptions.PUBLIC) {
        form.snippetType = SnippetTypeOptions.PRIVATE;
      } else {
        form.snippetType = SnippetTypeOptions.PUBLIC;
      }
    }

    const onUploadImg = async (files, callback) => {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files[]", file);
      });

      const res = await globalStore.uploadImages(formData);

      if (res) {
        callback(res.map((item) => item.url));
      }
    };

    return {
      toolbars,
      form,
      isPublic,
      onUploadImg,
      onCreateSnippet,
      onUpdateSnippetType,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn-cancel {
  padding: 6px 30px;
  border: 1px solid #434c9d;
}
.btn-save {
  padding: 10px 35px;
  background: linear-gradient(270deg, #434c9d 0%, #38b1a6 100%);
}
</style>
