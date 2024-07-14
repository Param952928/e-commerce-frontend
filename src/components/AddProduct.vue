<template>
  <form @submit.prevent="addProduct" class="py-4 px-4 mx-auto">
    <FormField v-model="product.title" label="Product Name" type="text" />
    <FormField
      v-model="product.description"
      label="Product Description"
      type="text"
    />
    <div class="mb-4">
      <label for="main-category" class="block text-sm font-medium text-gray-700"
        >Main Category</label
      >
      <select
        id="main-category"
        v-model="product.category.main"
        class="mt-1 block w-full pl-10 text-sm text-gray-700"
      >
        <option
          v-for="(category, index) in mainCategories"
          :key="index"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="sub-category" class="block text-sm font-medium text-gray-700"
        >Sub Category</label
      >
      <select
        id="sub-category"
        v-model="product.category.sub"
        class="mt-1 block w-full pl-10 text-sm text-gray-700"
      >
        <option
          v-for="(category, index) in subCategories"
          :key="index"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
    <FormField v-model="product.price" label="Price" type="number" />
    <button
      type="submit"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Add Product
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import FormField from "./FormField.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  mainCategories: Array,
  subCategories: Array,
});

const product = reactive({
  title: "",
  description: "",
  category: {
    main: "",
    sub: "",
  },
  price: 0,
});

const addProduct = async () => {
  try {
    const data = {
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
    };
    const response = await axios.post(
      "http://localhost:4000/api/v1/product/create",
      data
    );
    if (response.status === 200) {
      console.log("response :", response);
      emit("added");
      // Close the popup and refresh the products list
      emit("close");
      router.go(0); // Refresh the page
    }
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

const emit = defineEmits(["added", "close"]);
</script>