<script setup lang="ts">
import { useFetchSessions } from '@/composables/useSessions'
import SessionList from '@/components/SessionList.vue'
import { refDebounced } from '@vueuse/core'

import { computed, ref } from 'vue'
import type { SortOrder } from '@/api/sessions'
import ErrorAlert from '@/components/ErrorAlert.vue'
// searchText will change as the user types
const searchText = ref('')
// debouncedSearchText will be set to the value of searchText 300ms after searchText changes
const debouncedSearchText = refDebounced(searchText, 300)

const sortOrder = ref<SortOrder>('descending')

// The entire simulate error feature is only here for demonstration purposes
// This code would not be here in a real app, only the error handling would be present
const simulateError = ref(false)

const options = computed(() => ({
  searchText: debouncedSearchText.value,
  sortOrder: sortOrder.value,
}))

const {
  data: sessions,
  isLoading,
  isError,
  error,
  refetch,
} = useFetchSessions(
  computed(() => ({
    searchText: debouncedSearchText.value,
    sortOrder: sortOrder.value,
    simulateError: simulateError.value,
  })),
)
</script>

<template>
  <main>
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl py-10">Sessions</h1>
        <input
          type="text"
          class="px-4 py-2 border-2 border-gray-300 rounded-full"
          placeholder="Search..."
          v-model="searchText"
        />
        <select v-model="sortOrder">
          <option value="descending">Popularity - high to low</option>
          <option value="ascending">Popularity - low to hight</option>
        </select>
      </div>
      <div aria-live="polite">
        <div v-if="isLoading">Loading...</div>
        <div v-else-if="isError">
          <ErrorAlert :message="error?.message ?? 'There was an error'">
            <button
              @click="() => refetch()"
              class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Retry
            </button>
          </ErrorAlert>
        </div>

        <SessionList v-else-if="sessions" :sessions="sessions" />
      </div>
      <div class="text-center text-red-700 mt-10">
        <input type="checkbox" id="simulate-error" v-model="simulateError" />
        <label for="simulate-error" class="pl-2">Simulate error</label>
      </div>
    </div>
  </main>
</template>
