<template>
  <div
    class="fixed top-20 left-0 w-full h-md  bg-opacity-50 flex justify-center"
  >
    <div class="bg-gray-400 rounded shadow-md p-4 w-1/2 relative">
      <button
        class="absolute top-4 right-4 text-black font-bold py-1 px-2 rounded"
        @click="$emit('close')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <slot ></slot>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);
</script>