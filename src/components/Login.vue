<template>
    <div class="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div class="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 class="text-2xl mb-4">Login</h1>
        <input v-model="username" type="text" placeholder="Username" class="w-full p-2 border rounded mb-4">
        <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded mb-4">
        <button @click="login" class="w-full bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: username.value,
        password: password.value,
      });
      localStorage.setItem('token', response.data.token);
      router.push('/');
    } catch {
      error.value = 'Invalid credentials';
    }
  };
  </script>
  
  <style scoped>
  </style>
  