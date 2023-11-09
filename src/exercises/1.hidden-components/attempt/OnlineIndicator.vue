<template>
  <div
    :class="{
      'border-blue-500': selected,
      'mb-2 cursor-pointer bg-white p-2 rounded-md border-2 hover:bg-gray-100 transition-colors duration-150':
        useButton
    }"
  >
    <div class="flex items-center">
      <div class="online-indicator">
        <div
          class="h-3 w-3 rounded-full bg-gray-700"
          :class="{
            'bg-green-500': user.isOnline
          }"
        ></div>
      </div>
      <div class="ml-2">{{ user.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from './types'
withDefaults(
  defineProps<{
    user: User
    selected: boolean
    useButton: boolean
  }>(),
  {
    selected: false,
    useButton: false
  }
)
</script>
