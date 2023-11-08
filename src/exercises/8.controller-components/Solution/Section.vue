<template>
  <div class="mb-8 rounded-lg border border-gray-300 bg-gray-100 p-4">
    <h3 class="text-xl font-bold">{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
