<template>
  <div class="h-screen flex flex-col">
    <Navbar />
    <div class="flex-1 p-4">
      <div class="container mx-auto p-4">
        <div class="flex justify-between">
          <h1 class="text-3xl font-bold mb-4 justify-start">
            Select your Category
          </h1>
          <button
            @click="addCategoryPopup = true"
            class="bg-green-500 hover:bg-green-700 text-white font-bold px-4 h-8 mt-4 justify-end rounded"
          >
            Add Category
          </button>
          <Modal
            v-if="addProductPopup"
            @close="closeCategoryPopup"
          >
            <AddCategory
              @close="closeCategoryPopup"
              @added="getCategories"
            ></AddCategory>
          </Modal>
        </div>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else class="grid grid-cols-4 gap-4 mb-4">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="bg-white rounded shadow-md p-4"
          >
            <Category :category="category" />
          </div>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <h1 class="text-3xl font-bold mb-4 justify-start">
            Explore Products
          </h1>
          <button
            @click="addProductPopup = true"
            class="bg-green-500 hover:bg-green-700 text-white font-bold px-4 h-8 mt-4 justify-end rounded float-right"
          >
            Add Product
          </button>
          <Modal
            v-if="addProductPopup"
            @close="addProductPopup = false"
          >
            <AddProduct
              :main-categories="uniqueCategories"
              :sub-categories="uniqueSubCategories"
              @close="addProductPopup = false"
              @added="getProducts"
            />
          </Modal>
        </div>
        <div>
          <form @submit.prevent class="flex flex-wrap">
            <h2 class="text-lg font-bold mb-2 w-full">Apply Filter</h2>
            <div class="w-full md:w-1/4 px-4 mb-4">
              <label for="category" class="block mb-2 text-sm font-bold"
                >Select Category</label
              >
              <select
                id="category"
                v-model="selectedCategory"
                @change="filterSubCategories"
                name="Type"
                class="block w-full pl-10 text-sm text-gray-700 border border-gray-300 rounded-md"
              >
                <option
                  v-for="(category, index) in uniqueCategories"
                  :key="index"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="w-full md:w-1/4 px-4 mb-4" v-if="selectedCategory">
              <label for="subCategory" class="block mb-2 text-sm font-bold"
                >Select Sub Category</label
              >
              <select
                id="subCategory"
                v-model="selectedSubCategory"
                class="block w-full pl-10 text-sm text-gray-700 border border-gray-300 rounded-md"
              >
                <option
                  v-for="(subCategory, index) in filteredSubCategories"
                  :key="index"
                  :value="subCategory.subType"
                >
                  {{ subCategory.subType }}
                </option>
              </select>
            </div>
            <button
              @click="applyFilter"
              :disabled="!(selectedCategory && selectedSubCategory)"
              class="bg-green-500 hover:bg-green-700 text-white font-bold px-4 h-8 mt-4 justify-end rounded float-right"
            >
              Apply
            </button>
          </form>
        </div>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else class="grid grid-cols-4 gap-4 mt-4">
          <div
            v-for="(product, index) in products"
            :key="index"
            class="bg-white rounded shadow-md p-4"
          >
            <Products :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import Category from "../components/Category.vue";
import Products from "../components/Products.vue";
import AddCategory from "../components/AddCategory.vue";
import axios from "axios";
import Modal from "../components/Modal.vue";
import AddProduct from "../components/AddProduct.vue";
import { useStore } from "vuex";

const loading = ref(true);
const categories = ref([]);
const products = ref([]);
const selectedCategory = ref(null);
const selectedSubCategory = ref(null);
const filteredSubCategories = ref([]);
const uniqueCategories = ref([]);
const uniqueSubCategories = ref([]);
const addCategoryPopup = ref(false);
const addProductPopup = ref(false);

const getCategories = async () => {
  console.log("getttttttttt");
  const url = "http://localhost:4000/api/v1/category/get-all-categories";
  await axios
    .get(url)
    .then((res) => {
      categories.value = res.data.categories;
      const categoryType = res.data.categories.map((cat) => cat.type);
      const subCategoryType = res.data.categories.map((cat) => cat.subType);
      uniqueCategories.value = [...new Set(categoryType)];
      uniqueSubCategories.value = [...new Set(subCategoryType)];
    })
    .catch((err) => {
      console.log("error : ", err);
    });
};

const getProducts = async () => {
  const url = "http://localhost:4000/api/v1/product/get";
  await axios
    .get(url)
    .then((res) => {
      products.value = res.data.products;
    })
    .catch((err) => {
      console.log("error : ", err);
    });
};

onMounted(async () => {
  try {
    getCategories();
    getProducts();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const closeCategoryPopup = () => {
  addCategoryPopup.value = false;
};
// console.log("addCategoryPopup : ", addCategoryPopup.value);

const filterSubCategories = () => {
  if (selectedCategory.value) {
    filteredSubCategories.value = [
      ...new Set(
        categories.value.filter(
          (category) => category.type === selectedCategory.value
        )
      ),
    ];
  } else {
    filteredSubCategories.value = [];
  }
};

const applyFilter = async () => {
  const loading = ref(true);
  const data = {
    category: {
      main: selectedCategory.value,
      sub: selectedSubCategory.value,
    },
  };
  products.value = [];
  await axios
    .get("http://localhost:4000/api/v1/product/get", {
      params: data,
    })
    .then((res) => {
      console.log("res : ", res.data);
      products.value = res.data.products;
      loading.value = false;
    })
    .catch((err) => {
      console.log("Error : ", err);
    });
};

const addCategory = async () => {
  addCategoryPopup.value = true;
};
</script>