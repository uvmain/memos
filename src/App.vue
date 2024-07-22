<script setup lang="ts">
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";

const [parent, tapes] = useDragAndDrop([
  "Depeche Mode",
  "Duran Duran",
  "Pet Shop Boys",
  "Kraftwerk",
  "Tears for Fears",
  "Spandau Ballet",
]);
</script>

<template>
  <div>
    <ul ref="parent" class="grid grid-cols-3 gap-4 p-4">
      <div v-for="tape in tapes" :key="tape" class="bg-gray-200 border-1 border-solid border-gray-500 rounded-lg min-h-40 p-4 text-center">
        {{ tape }}
      </div>
    </ul>
  </div>
</template>