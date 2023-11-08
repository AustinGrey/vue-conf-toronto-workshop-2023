<template>
  <div class="col-span-2">
    <div v-if="selectedUser" class="px-4 flex items-center mb-4">
      <div class="text-lg font-semibold mr-2">{{ selectedUser.name }}</div>
      <OnlineIndicator :is-online="selectedUser.isOnline" />
    </div>
    <MessageList :messages="filteredMessages" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MessageList from './MessageList.vue'
import OnlineIndicator from './OnlineIndicator.vue'
import { User } from './types'

const props = defineProps<{ selectedUser: User; messages: any[] }>()
const filteredMessages = computed(() =>
  props.messages.filter((message) => {
    // From the selected user
    if (message.from === props.selectedUser.name) {
      return true
    }

    if (message.from === 'You' && message.to === props.selectedUser.name) {
      return true
    }
  })
)
</script>
