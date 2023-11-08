<template>
  <div class="w-1/2" v-if="missingParts.length">
    <h4 class="text-lg font-bold mb-2 text-red-500">Missing Parts</h4>
    <ul class="list-disc list-inside">
      <li v-for="missing in missingParts" :key="missing" class="text-gray-700">
        {{ missing }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{ missingParts: string[] }>();
</script>
