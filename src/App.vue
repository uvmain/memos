<script setup lang="ts">
import { useDragAndDrop } from "@formkit/drag-and-drop/vue"
import { ref, onBeforeMount, watch } from "vue"
import PocketBase from 'pocketbase'

let pb = new PocketBase('http://127.0.0.1:8090')

const currentUser = ref()
const username = ref("")
const password = ref("")

async function login() {
  try {
    await pb.admins.authWithPassword(username.value, password.value)
    refreshMemos()
  } catch (error) {
    alert(error.message)
  }
}

async function refreshMemos() {
  if (!currentUser) {
    return
  }
  notes.value = await pb.collection('notes').getFullList({
    sort: '-created',
  })
  memos.value = notes.value.map(note => note.note)
}

const notes = ref<any[]>([])

const [parent, memos] = useDragAndDrop(notes.value)

pb.authStore.onChange(() => {
  currentUser.value = pb.authStore.model
}, true)

onBeforeMount(async () => {
  refreshMemos()
})

watch(notes, (newNotes) => {
  memos.value = newNotes.map(note => note.note)
})
</script>

<template>
<div>
  <div v-if="currentUser">
    <ul ref="parent" class="grid grid-cols-2 gap-2 p-2 md:grid-cols-3 md:gap-4 md:p-4 lg:grid-cols-4 lg:gap-6 lg:p-6">
      <div v-for="memo in memos" :key="memo" class="bg-gray-200 border-1 border-solid border-gray-500 rounded-lg min-h-40 p-4 text-center">
        <div v-html="memo" />
      </div>
    </ul>
  </div>
  <div v-else class="text-center w-60 p-6 mx-auto">
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
</div>
</template>
