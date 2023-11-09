<template>
  <div class="online-indicator">
    <div
      class="h-3 w-3 rounded-full bg-gray-700"
      :class="{
        'bg-green-500': user.isOnline
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {type User} from "./types";
defineProps<{ user: User }>()
</script>
