<template>
  <div class="mb-4">
    <label :for="id" class="block mb-2 text-sm font-bold">{{ label }}</label>
    <input
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      class="w-full pl-2 text-sm text-gray-700 border border-gray-300 rounded-md"
    />
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: String,
  modelValue: String,
});

defineEmits(['update:modelValue']);
</script>