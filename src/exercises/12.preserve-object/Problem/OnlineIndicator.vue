<template>
  <div class="online-indicator">
    <div
      class="h-3 w-3 rounded-full bg-gray-700"
      :class="{
        'bg-green-500': isOnline
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isOnline: boolean }>()
</script>
