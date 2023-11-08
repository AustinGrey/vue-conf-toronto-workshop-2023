<template>
  <div class="flex-col justify-between min-h-[500px] max-h-[500px] overflow-auto">
    <DisplayMessages :messages="messages" v-if="messages.length" />
    <NoMessages v-else />
  </div>
</template>

<script setup lang="ts">
import DisplayMessages from './DisplayMessages.vue'
import NoMessages from './NoMessages.vue'
defineProps<{ messages: any[] }>()
</script>
