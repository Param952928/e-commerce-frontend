<template>
  <form @submit.prevent="addCategory" class="py-4 px-4 mx-auto">
    <FormField v-model="category.title" label="Category Name" type="text" />
    <FormField
      v-model="category.description"
      label="Category Description"
      type="text"
    />
    <FormField
      @change="onFileChange"
      label="Select Image"
      type="file"
    />
    <FormField v-model="category.type" label="Category Type" type="text" />
    <FormField
      v-model="category.subType"
      label="Category Subtype"
      type="text"
    />
    <button
      type="submit"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Add Category
    </button>
  </form>
</template>

<script setup>
import { reactive, ref, defineEmits } from "vue";
import axios from "axios";
import FormField from "./FormField.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const category = reactive({
  title: "",
  description: "",
  file: null,
  type: "",
  subType: "",
});
const emit = defineEmits(["added, close"]);

const onFileChange = (event) => {
  category.file = event.target.files[0];
};

const addCategory = async () => {
  try {
    const formData = new FormData();
    formData.append('title', category.title);
    formData.append('description', category.description);
    formData.append('type', category.type);
    formData.append('subType', category.subType);
    if (category.file) {
      formData.append('file', category.file);
    }

    const response = await axios.post(
      "http://localhost:4000/api/v1/category/create",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 200) {
      // console.log("response :", response);
      emit("added");
      emit("close");
      // router.go(0);
    }
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

</script>
