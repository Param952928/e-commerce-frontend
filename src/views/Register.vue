<template>
  <div class="h-screen flex justify-center items-center bg-gray-200 pt-6 pb-16">
    <div class="max-w-md w-full bg-white rounded px-8 pt-6 pb-8 mb-4">
      <h1 class="text-4xl font-bold mb-4">Sign Up to start your business</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="fullName"
            >Full Name</label
          >
          <input
            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            id="fullName"
            type="text"
            v-model="fullName"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
            >Email ID</label
          >
          <input
            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            id="email"
            type="email"
            v-model="email"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
            >Password</label
          >
          <input
            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            id="password"
            type="password"
            v-model="password"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="confirmPassword"
            >Confirm Password</label
          >
          <input
            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
          />
        </div>
        <div class="flex">
          <button
            class="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <div
            @click="router.push('/')"
            class="text-xl text-blue-800 rounded font-bold ml-56 mt-4 cursor-pointer"
          >
            Sign in
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const storeName = ref("");

const handleSubmit = async () => {
  try {
    const registerData = {
      username: fullName.value,
      email: email.value,
      password: password.value,
    };

    const response = await axios.post(
      "http://localhost:4000/api/v1/auth/register",
      registerData
    );

    if (response.status === 200) {
      console.log("res", response.data.userData);
      store.commit("setUserData", response.data.userData);
      router.push("/dashboard");
    } else {
      throw new Error("Failed to register");
    }
  } catch (error) {
    console.error(error);
  }
};
</script>