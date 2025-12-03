<script setup lang="ts">
import { ref } from 'vue'

// This is the same as the Session defined in the API layer
// That session type can be re-used here for this project
// Often there are benefits to defining the type a components needs withing the component
// This way it is not coupled to the other layers and can be modified if needed
export type Session = {
  id: string
  title: string
  tags: string[]
  mins: number
  difficulty: 'beginner' | 'intermediate' | 'advanced' | null
  popularity: number
  completed: boolean
}

const { session } = defineProps<{ session: Session }>()
const isCompleted = ref(session.completed)
</script>
<template>
  <li class="bg-gray-200 p-6 rounded-lg">
    <div class="mb-4">
      <div class="font-bold">{{ session.title }}</div>
      <div class="font-light text-sm">{{ session.tags.join(', ') || '-' }}</div>
    </div>
    <div class="flex justify-between">
      <div>Rating {{ session.popularity }}</div>
      <div class="capitalize">{{ session.difficulty ?? 'N/A' }}</div>
    </div>
    <div class=""></div>
    <div class="pt-6 flex justify-between">
      <div class="font-light">{{ session.mins }} mins</div>
      <div>
        <input type="checkbox" :id="session.id" v-model="isCompleted" />
        <label :for="session.id" class="pl-2">Done</label>
      </div>
    </div>
  </li>
</template>
