<template>
  <el-dialog v-model="showModal" title="Tag Form" width="500">
    <FormValidator>
      <el-form ref="tagFormRef" :model="tag">
        <el-form-item
          label="Name"
          prop="name"
          :label-width="formLabelWidth"
          :rules="[{ required: true, message: 'name is required' }]"
        >
          <el-input v-model="tag.name" autocomplete="off" />
        </el-form-item>
      </el-form>
    </FormValidator>
    <template #footer>
      <div class="dialog-footer">
        <button
          type="button"
          class="rounded bg-white px-2 py-1 mr-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          @click="closeModal(tagFormRef)"
        >
          Cancel
        </button>

        <button
          type="button"
          class="btn-save rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="submitForm(tagFormRef)"
        >
          {{ tag.id ? "Save" : "Create" }}
        </button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineModel, defineEmits, watch } from "vue";

const formLabelWidth = "60px";

const tag = defineModel("tag");
const tagFormRef = ref(null);

const showModal = defineModel("showModal");

const emits = defineEmits(["edit", "create"]);

function closeModal(form) {
  if (!form) return;
  form.resetFields();

  showModal.value = false;
}

function submitForm(form) {
  if (!form) return;
  form.validate((valid) => {
    if (valid) {
      tag.value.id ? emits("edit", tag.value) : emits("create");
    } else {
      return false;
    }
  });
}

watch(showModal, () => {
  if (showModal.value == false && tagFormRef.value) {
    tagFormRef.value.resetFields();
  }
});
</script>
