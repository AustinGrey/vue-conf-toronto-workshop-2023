<template>
  <div class="bg-gray-200 p-4 rounded-md">
    <h3 class="mb-4">Online Users</h3>
    <ul>
      <li v-for="user in onlineUsers" :key="user.id">
        <OnlineIndicator
          :user="user"
          :selected="user.id === selectedUser.id"
          use-button
          @click="$emit('select-user', user)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import OnlineIndicator from './OnlineIndicator.vue'
import type { User } from './types'

defineProps<{ onlineUsers: User[]; selectedUser: User }>()
defineEmits(['select-user'])
</script>
