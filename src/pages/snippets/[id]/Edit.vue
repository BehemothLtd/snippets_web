<template>
  <div class="snippet-new container mx-auto lg:w-11/12">
    <snippet-form
      :form="form"
      :updated="updated"
      isEdit
      @submit="updateSnippet"
      @delete="deleteSnippet"
      @decrypt="decryptContent($event)"
    ></snippet-form>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { assign } from "lodash";

// ============COMPONENTS================
import SnippetForm from "@/components/snippet/SnippetForm.vue";

// ============STORE================
import { useSnippetsStore } from "@/stores/snippets";
import { useSelfSnippetsStore } from "@/stores/snippets/self";
import { ref } from "vue";

export default defineComponent({
  components: {
    SnippetForm,
  },

  setup() {
    // ============STORE============
    const snippetStore = useSnippetsStore();

    const selfSnippetStore = useSelfSnippetsStore();

    // ============REACTIVE============
    const route = useRoute();

    const form = reactive({});

    const updated = ref(false);

    // ============COMPUTED============
    const snippetId = computed(() => Number(route.params.id));

    const mySnippet = computed(() => selfSnippetStore.mySnippet);

    watch(mySnippet, () => {
      assign(form, mySnippet.value);
    });

    onMounted(() => {
      if (snippetId.value) {
        selfSnippetStore.getMySnippet(snippetId.value);
      }
    });

    // ============METHODS============
    async function updateSnippet() {
      updated.value = false;

      await snippetStore.updateSnippet(form);

      updated.value = true;
    }

    function decryptContent(privateKey) {
      selfSnippetStore.decryptSnippet(snippetId.value, privateKey);
    }

    return {
      form,
      updated,

      updateSnippet,
      decryptContent,
    };
  },
});
</script>
