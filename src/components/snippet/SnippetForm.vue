<template>
  <form @submit="handleUpdateSnippet">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-24 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

          <div v-if="isEdit" class="col-span-full">
            <tag-form
              :value="listSnippetTag"
              @select="onAddTagForSnippet($event)"
              @remove="onRemoveTagOfSnippet($event)"
            ></tag-form>
          </div>

          <div v-if="!isEdit" class="col-span-full">
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

          <div class="col-span-full">
            <form-validator label="Content" required name="content">
              <template v-if="!isPublic && !isDecrypted">
                <p class="mb-3 text-sm leading-6 text-gray-600">
                  Your content is being encrypted! Click to decrypt content!
                </p>
                <button
                  v-if="!isDecrypted"
                  type="button"
                  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  @click="openPrivateKeyModal('decrypt')"
                >
                  Decrypt
                </button>
              </template>

              <MdEditor
                v-if="isPublic || isDecrypted"
                language="en-US"
                v-model="editorValue"
                :toolbars="toolbars"
                @onUploadImg="onUploadImg"
              >
              </MdEditor>
            </form-validator>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-between gap-x-6">
      <template v-if="isEdit">
        <button
          type="button"
          class="btn-delete focus:outline-none text-white bg-red-700 px-3 py-2 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          @click="isShowConfirmModal = true"
        >
          Delete
        </button>

        <delete-snippet-modal
          :open="isShowConfirmModal"
          @submit="deleteSnippet"
          @close="isShowConfirmModal = false"
        ></delete-snippet-modal>
      </template>

      <div>
        <router-link
          type="button"
          class="btn-cancel rounded-md text-sm font-semibold leading-6 text-gray-900 me-2"
          to="/account"
        >
          Cancel
        </router-link>
        <button
          v-if="isShowButtonUpdate"
          type="button"
          class="btn-save rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="handleUpdateSnippet"
        >
          Save
        </button>

        <private-key-modal
          :open="isShowPrivateKeyModal"
          :action="privateKeyAction"
          @submit="handleUpdatePrivateSnippet"
          @decrypt="handleDecryptContent"
          @close="isShowPrivateKeyModal = false"
        ></private-key-modal>
      </div>
    </div>
  </form>
</template>

<script>
import { defineComponent, computed, ref, nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { debounce } from "lodash";

// ============COMPONENTS================
import FormValidator from "@/components/shared/FormValidator.vue";
import DeleteSnippetModal from "@/components/snippet/DeleteSnippetModal.vue";
import TagForm from "@/components/tags/TagForm.vue";
import PrivateKeyModal from "@/components/snippet/PrivateKeyModal.vue";
import { MdEditor, NormalToolbar } from "md-editor-v3";

// ============UTILITIES================
import { SnippetTypeOptions } from "@/helpers/constant.js";

// ============STORE================
import { useSnippetsStore } from "@/stores/snippets";
import { useSelfSnippetsStore } from "@/stores/snippets/self";
import { useGlobalStore } from "@/stores/global";

export default defineComponent({
  props: {
    form: {
      type: Object,
      default: () => {},
      required: true,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    updated: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    FormValidator,
    MdEditor,
    NormalToolbar,
    DeleteSnippetModal,
    TagForm,
    PrivateKeyModal,
  },

  setup(props, { emit }) {
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

    // ============STORE============
    const snippetStore = useSnippetsStore();

    const selfSnippetStore = useSelfSnippetsStore();

    const globalStore = useGlobalStore();

    // ============REACTIVE============
    const route = useRoute();

    const router = useRouter();

    const isShowConfirmModal = ref(false);

    const isShowPrivateKeyModal = ref(false);

    const privateKeyAction = ref("edit");

    // ============COMPUTED============
    const mySnippet = computed(() => selfSnippetStore.mySnippet);

    const listSnippetTag = computed(() => {
      return mySnippet.value.snippetsTags?.map((item) => {
        return Number(item.tagId);
      });
    });

    const isPublic = computed(
      () => props.form.snippetType == SnippetTypeOptions.PUBLIC
    );

    const isDecrypted = computed(
      () => !isPublic.value && mySnippet.value.decryptedContent
    );

    const isShowButtonUpdate = computed(
      () => isPublic.value || isDecrypted.value
    );

    const editorValue = computed({
      get() {
        if (isPublic.value) {
          return props.form.decryptedContent || props.form.content;
        } else return props.form.decryptedContent;
      },
      set(value) {
        if (isPublic.value) {
          props.form.content = value;
        } else {
          props.form.decryptedContent = value;
        }
      },
    });

    watch(
      () => props.updated,
      () => {
        if (props.updated) {
          isShowPrivateKeyModal.value = false;
        }
      }
    );

    // ============METHODS============
    function handleUpdateSnippet() {
      if (isPublic.value) {
        emit("submit");
      } else {
        openPrivateKeyModal("edit");
      }
    }

    function handleUpdatePrivateSnippet($event) {
      // update private key before submit
      props.form.privateKey = $event;

      emit("submit");
    }

    function handleDecryptContent($event) {
      emit("decrypt", $event);
      isShowPrivateKeyModal.value = false;
    }

    function openPrivateKeyModal(actionType) {
      privateKeyAction.value = actionType;
      isShowPrivateKeyModal.value = true;
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

    function onUpdateSnippetType() {
      if (props.form && props.form.snippetType == SnippetTypeOptions.PUBLIC) {
        props.form.snippetType = SnippetTypeOptions.PRIVATE;
      } else {
        props.form.snippetType = SnippetTypeOptions.PUBLIC;
      }
    }

    async function deleteSnippet() {
      await snippetStore.deleteSnippet(Number(route.params.id));

      // TODO
      selfSnippetStore.resetQuery();
      selfSnippetStore.getMySnippets();
      router.push("/account");
    }

    const onAddTagForSnippet = debounce((tagId) => {
      const snippetId = Number(route.params.id);
      selfSnippetStore.onAddSnippetTag({ snippetId, tagId });
    }, 300);

    async function onRemoveTagOfSnippet(tagId) {
      const snippetId = Number(route.params.id);
      await selfSnippetStore.onDeleteSnippetTag({ snippetId, tagId });
      nextTick();
    }

    return {
      // data
      isDecrypted,
      isShowConfirmModal,
      isPublic,
      toolbars,
      listSnippetTag,
      isShowPrivateKeyModal,
      privateKeyAction,
      editorValue,
      isShowButtonUpdate,

      // function
      onUploadImg,
      onUpdateSnippetType,
      handleUpdatePrivateSnippet,
      handleDecryptContent,
      handleUpdateSnippet,
      deleteSnippet,
      onAddTagForSnippet,
      onRemoveTagOfSnippet,
      openPrivateKeyModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn-delete {
  padding: 10px 30px;
}
.btn-cancel {
  padding: 6px 30px;
  border: 1px solid #434c9d;
}
.btn-save {
  margin-left: 10px;
  padding: 10px 35px;
  background: linear-gradient(270deg, #434c9d 0%, #38b1a6 100%);
}
</style>
