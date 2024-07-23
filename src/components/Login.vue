<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  pb: Object
})

const username = ref("")
const password = ref("")

async function login() {
  try {
    await props.pb?.admins.authWithPassword(username.value, password.value)
  } catch (error) {
    alert(error.message)
  }
}

</script>

<template>
  <div class="text-center w-60 p-6 mx-auto">
    <h1>LOGIN</h1>
    <div class="sm:col-span-2 sm:col-start-1 mt-4">
      <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
      <div class="mt-2">
        <input
          v-model="username"
          type="text"
          name="username"
          id="username"
          autocomplete="email"
          placeholder="Enter Email Address "
          class=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
    </div>
    <div class="sm:col-span-2 sm:col-start-1 mt-2">
      <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
        Password
      </label>
      <div class="mt-2">
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          autocomplete="password"
          placeholder="Enter Password "
          v-on:keyup.enter="login"
          class=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
    </div>
    <div>
      <div class="sm:col-span-2 sm:col-start-1 mt-2">
        <button type="button" @click="login"
          class="mr-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Login
        </button>
      </div>
    </div>
  </div>
</template>