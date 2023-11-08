<template>
  <div
    ref="completedList"
    class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto overflow-x-clip"
  >
    <div v-if="completedRepairs.length === 0" class="text-gray-700">
      No completed repairs
    </div>

    <TransitionGroup name="list">
      <div
        v-for="droid in completedRepairs"
        :key="droid.id"
        class="bg-gray-200 rounded-lg p-4"
      >
        <h4 class="text-lg font-bold">{{ droid.type }}</h4>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  completedRepairs: { id: string; type: string }[];
}>();
</script>
