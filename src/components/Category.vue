<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <div class="px-6 py-2 bg-gray-100 rounded-t-xl">
      <h1 class="text-2xl font-bold">{{ category.title }}</h1>
    </div>
    <div class="px-6 py-2">
      <img
        src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
        class="w-full h-40 object-cover rounded"
      />
    </div>
    <div class="px-6 py-2">
      <h2 class="text-lg">{{ category.description }}</h2>
    </div>
    <div class="px-6 py-2 flex justify-center">
      <!-- <button
        class="bg-green-500 hover:bg-orange-700 text-white font-bold pb-2 px-4 rounded"
      >
        Edit
      </button> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  category: {
    type: Object,
    required: true,
  },
});

// Function to convert array buffer data to base64 URL for JPEG images
// const getImageUrl = (bufferData) => {
//   if (!bufferData || bufferData.length === 0) return '';

//   const arrayBuffer = bufferData.reduce((acc, value) => acc.concat(value), []);
//   const base64String = Buffer.from(arrayBuffer).toString('base64');
//   return `data:image/jpeg;base64,${base64String}`; // Assuming JPEG format
// };
</script>