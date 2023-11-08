<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto overflow-x-clip">
    <div v-if="!droids.length" class="text-gray-700">No droids found</div>
    <TransitionGroup name="list">
      <div
        v-for="droid in droids"
        :key="droid.id"
        class="bg-gray-200 border-2 rounded-lg p-4 duration-200 ease-in-out"
        :class="{
          'border-blue-500': selectedDroid && selectedDroid.id === droid.id,
          'border-transparent': selectedDroid && selectedDroid.id !== droid.id,
          // Pulsing background when repairing
          'animate-pulse': repairInProgress && selectedDroid && selectedDroid.id === droid.id,
          'cursor-pointer': !repairInProgress,
          'cursor-not-allowed': repairInProgress
        }"
        tabindex="0"
        @click="$emit('select-droid', droid)"
        @keydown.enter="$emit('select-droid', droid)"
      >
        <h4 class="text-lg font-bold mb-2">{{ droid.type }}</h4>
        <p class="mb-2">
          <span class="font-bold text-gray-500">Status:</span>
          {{ droid.status }}
        </p>
        <p class="text-gray-700 mb-2">
          <span class="font-bold text-gray-500">Parts Needed:</span>
          {{ droid.partsNeeded.join(', ') }}
        </p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  droids: Array<{
    id: number
    type: string
    status: string
    partsNeeded: string[]
  }>
  selectedDroid: {
    id: number
    type: string
    status: string
    partsNeeded: string[]
  } | null
  repairInProgress: boolean
}>()

defineEmits<{
  (
    e: 'select-droid',
    droid: { id: number; type: string; status: string; partsNeeded: string[] }
  ): void
}>()
</script>
