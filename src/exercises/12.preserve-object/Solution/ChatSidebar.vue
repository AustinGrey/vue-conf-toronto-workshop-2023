<template>
  <div class="bg-gray-200 p-4 rounded-md">
    <h3 class="mb-4">Online Users</h3>
    <ul>
      <li
        v-for="user in onlineUsers"
        :key="user.id"
        class="mb-2 cursor-pointer bg-white p-2 rounded-md border-2 hover:bg-gray-100 transition-colors duration-150"
        :class="{ 'border-blue-500': user.id === selectedUser.id }"
        @click="$emit('select-user', user)"
      >
        <div class="flex items-center">
          <OnlineIndicator :user="user" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import OnlineIndicator from './OnlineIndicator.vue'
import { User } from './useFakeMessages'

defineProps<{ onlineUsers: User[]; selectedUser: User }>()
defineEmits(['select-user'])
</script>
