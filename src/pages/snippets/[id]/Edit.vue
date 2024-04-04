<template>
  <div class="snippet-new container mx-auto lg:w-11/12">
    <snippet-form
      :form="form"
      :updated="updated"
      :id="snippetId"
      isEdit
      @submit="updateSnippet"
      @decrypt="decryptContent($event)"
    ></snippet-form>
  </div>
</template>

<script setup>
import {
  ref,
  defineComponent,
  reactive,
  onMounted,
  computed,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { assign } from "lodash";

// ============COMPONENTS================
import SnippetForm from "@/components/snippet/SnippetForm.vue";

// ============STORE================
import { storeToRefs } from "pinia";
import { useSnippetsStore } from "@/stores/snippets";
import { useSelfSnippetsStore } from "@/stores/snippets/self";

// ============STORE============
const snippetStore = useSnippetsStore();

const selfSnippetStore = useSelfSnippetsStore();

// ============REACTIVE============
const route = useRoute();

const form = reactive({});

const updated = ref(false);

// ============COMPUTED============
const { snippetDetail } = storeToRefs(snippetStore);

const snippetId = computed(() => snippetDetail.value?.id);

const snippetSlug = computed(() => route.params.id);

watch(
  snippetDetail,
  () => {
    assign(form, snippetDetail.value);
  },
  { deep: true }
);

onMounted(() => {
  if (snippetSlug.value) {
    snippetStore.getMySnippet(snippetSlug.value);
  }
});

// ============METHODS============
async function updateSnippet() {
  updated.value = false;

  await snippetStore.updateSnippet(form.id, form);

  updated.value = true;
}

function decryptContent(privateKey) {
  selfSnippetStore.decryptSnippet(snippetId.value, privateKey);
}
</script>
