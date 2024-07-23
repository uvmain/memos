<script setup lang="ts">
import { useDragAndDrop } from "@formkit/drag-and-drop/vue"
import PocketBase from 'pocketbase'
import { ref, onBeforeMount, watch } from 'vue'

let pb = new PocketBase('http://127.0.0.1:8090')

const currentUser = ref()

async function refreshMemos() {
  if (!currentUser) {
    return
  }
  notes.value = await pb.collection('notes').getFullList({
    sort: '-created',
  })
}

const notes = ref<any[]>([])

const [parent, draggableNotes] = useDragAndDrop(notes.value)

watch(notes, (newNotes) => {
  draggableNotes.value = newNotes.map(note => note.note)
})

pb.authStore.onChange(() => {
  currentUser.value = pb.authStore.model
  refreshMemos()
}, true)

onBeforeMount(async () => {
  refreshMemos()
})
</script>

<template>
<div>
  <Login v-if="!currentUser" :pb="pb" />
  <div v-else>
    <ul ref="parent" class="grid grid-cols-2 gap-2 p-2 md:grid-cols-3 md:gap-4 md:p-4 lg:grid-cols-4 lg:gap-6 lg:p-6">
      <div v-for="memo in draggableNotes" :key="memo" class="bg-gray-200 border-1 border-solid border-gray-500 rounded-lg min-h-40 p-4 text-center">
        <div v-html="memo" />
      </div>
    </ul>
  </div>
</div>
</template>
