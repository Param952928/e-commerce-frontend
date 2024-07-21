<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div class="px-6 ">
      <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
    </div>
    <div class="px-6 ">
      <img :src="product.image" alt="" class="w-full h-32 object-cover rounded">
    </div>
    <div class="px-6 py-2">
      <h2 class="text-lg mb-2">{{ product.description }}</h2>
      <h2 class="text-lg font-bold mb-2"> ${{ product.price }}</h2>
    </div>
    <div class="px-6 py-2 flex justify-center">
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold pb-2 px-4 rounded">Buy Now</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>