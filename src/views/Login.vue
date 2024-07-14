<template>
  <div class="h-screen flex justify-center items-center bg-gray-200">
    <div class="max-w-md w-full bg-white rounded px-8 pt-6 pb-8 mb-4">
      <h1 class="text-4xl font-bold mb-4">Sign In</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email ID
          </label>
          <input
            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            id="email"
            type="email"
            v-model.trim="email"
            :class="{ 'is-invalid': emailError }"
          />
          <div v-if="emailError" class="text-red-500 text-sm">
            {{ emailError }}
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            id="password"
            type="password"
            v-model.trim="password"
            :class="{ 'is-invalid': passwordError }"
          />
          <div v-if="passwordError" class="text-red-500 text-sm">
            {{ passwordError }}
          </div>
        </div>
        <button
          class="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? "Signing in..." : "Sign In" }}
        </button>
      </form>
      <div class="text-sm text-gray-600 mt-4 flex">
        <div @click="router.push('/register')" class="text-blue-500 rounded font-bold cursor-pointer">
          New User? Register
        </div>
        <div class="text-blue-500 rounded font-bold ml-56 cursor-pointer">
          Forgot password?
        </div>
      </div>
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

const email = ref("");
const password = ref("");
const loading = ref(false);
const emailError = ref("");
const passwordError = ref("");

const handleSubmit = async () => {
  loading.value = true;

  try {
    const loginData = {
      email: email.value,
      password: password.value,
    };

    const response = await axios.post("http://localhost:4000/api/v1/auth/login", loginData);

    if (response.status === 200) {
      console.log("res", response.data.userData)
      store.commit("setUserData", response.data.userData);
      router.push("/dashboard");
    } else {
      throw new Error("Failed to login");
    }
  } catch (error) {
    emailError.value = "Invalid email or password";
    passwordError.value = "Invalid email or password";
  } finally {
    loading.value = false;
  }
};
</script>
