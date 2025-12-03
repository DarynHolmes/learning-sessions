<script setup lang="ts">
import SessionListItem, { type Session } from './SessionListItem.vue'

const { sessions } = defineProps<{ sessions: Session[] }>()
</script>
<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
    <div v-if="sessions.length === 0">No results were found</div>
    <SessionListItem v-for="session in sessions" :key="session.id" :session />
  </ul>
</template>
