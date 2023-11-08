<template>
  <div class="col-span-2">
    <div v-if="selectedUser" class="px-4 flex items-center mb-4">
      <div class="text-lg font-semibold mr-2">{{ selectedUser.name }}</div>
      <OnlineIndicator :is-online="selectedUser.isOnline" />
    </div>
    <MessageList :messages="combined" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MessageList from './MessageList.vue'
import OnlineIndicator from './OnlineIndicator.vue'
import { User, Notification } from './types'

const props = defineProps<{
  selectedUser: User
  messages: any[]
  notifications: Notification[]
}>()

const filteredNotifications = computed(() =>
  props.notifications.filter((n) => n.from === props.selectedUser.name)
)

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

const combined = computed(() => {
  const val = [...filteredMessages.value, ...filteredNotifications.value].sort((a, b) => {
    return new Date(`12/12/12 ${b.time}`).getTime() - new Date(`12/12/12 ${a.time}`).getTime()
  })
  return val
})
</script>
