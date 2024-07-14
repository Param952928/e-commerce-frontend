<template>
  <nav class="bg-gray-800 py-4">
    <div class="container p-4 flex justify-between">
      <div class="text-lg text-white">Welcome {{ userData?.username }}!</div>
      <button @click="handleLogout" class="text-lg text-white">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const userData = computed(() => store.getters.getUserData);

console.log("userData", userData);

const handleLogout = () => {
  store.commit("setUserData", {});
  router.push("/");
};
</script>
