<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto overflow-x-clip"
  >
    <div v-if="!parts.length" class="text-gray-700">No parts found</div>
    <TransitionGroup name="list">
      <div
        v-for="part in parts"
        :key="part.id"
        class="rounded-lg p-4 h-full flex flex-row justify-between items-center transition-colors duration-200 ease-in-out"
        :class="{
          'bg-gray-200': !part.added && !part.removed,
          'bg-green-200': part.added,
          'bg-red-200': part.removed,
        }"
      >
        <h4 class="text-lg font-bold">{{ part.name }}</h4>
        <p class="text-gray-700">
          <span class="font-bold text-gray-500">{{ part.quantity }}</span>
        </p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  parts: {
    id: number;
    name: string;
    quantity: number;
    added: boolean;
    removed: boolean;
  }[];
}>();
</script>
