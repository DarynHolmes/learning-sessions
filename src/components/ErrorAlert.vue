<script setup lang="ts">
const { message } = defineProps<{ message: string }>()
</script>
<template>
  <div
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong class="font-bold">There was an error</strong>
    <div>{{ message }}</div>
    <div class="text-end p-4">
      <!-- Using a slot so that a button can be passed in, this keeps components small and 'flat' -->
      <slot />
    </div>
  </div>
</template>
