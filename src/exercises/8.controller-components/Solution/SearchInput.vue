<template>
  <div class="my-4">
    <input
      :value="searchTerm"
      :placeholder="placeholder"
      @input="updateSearchTerm"
      class="px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ searchTerm: string; placeholder: string }>()
const emit = defineEmits<{ (e: 'update:searchTerm', value: string): void }>()

const updateSearchTerm = (event: Event) => {
  emit('update:searchTerm', (event.target as HTMLInputElement).value)
}
</script>
