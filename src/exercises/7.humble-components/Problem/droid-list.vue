<!--
Displays a list of droids
-->
<template>
  <div
      v-for="droid in filteredAndSortedDroids"
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
      @click="toggleSelectedDroid(droid)"
      @keydown.enter="toggleSelectedDroid(droid)"
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
</template>

<script setup lang="ts">
defineProps({
  filteredAndSortedDroids: Array,
  selectedDroid: Object,
repairInProgress: Boolean,
        });

defineEmits("droidClicked");
</script>

<style scoped>

</style>