<template>
  <div class="demo bg-gray-100 rounded-lg">
    <div class="container mx-auto grid grid-cols-4 gap-4 p-4">
      <ChatSidebar
        class="col-span-1"
        :online-users="onlineUsers"
        :selected-user="selectedUser"
        @select-user="selectUser"
      />
      <div class="col-span-2">
        <DirectMessage
          :selected-user="selectedUser"
          :messages="messages"
          :notifications="notifications"
        />
        <MessageInput @send-message="handleMessage" />
      </div>
      <NotificationArea class="col-span-1" :notifications="notifications" />
    </div>
  </div>
  <button
    class="mt-4 font-sans bg-mt-coral rounded-md py-1 px-2 font-bold text-white"
    @click="initialize"
  >
    Reset Demo
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChatSidebar from './ChatSidebar.vue';
import DirectMessage from './DirectMessage.vue';
import MessageInput from './MessageInput.vue';
import NotificationArea from './NotificationArea.vue';
import { User } from './types';
import useFakeData from './useFakeData';

// Mock a live API using fake data
const { onlineUsers, messages, notifications, initialize } = useFakeData();

const selectedUser = ref<User>(onlineUsers.value[0]);
const selectUser = (user: User) => {
  selectedUser.value = user;
};

const handleMessage = (message) => {
  messages.value.unshift({
    id: messages.value.length + 1,
    from: 'You',
    to: selectedUser.value.name,
    content: message,
    time: new Date().toLocaleTimeString(),
  });
};
</script>

<style>
.demo {
  @apply -ml-64 relative left-32;
}

.content .demo h3 {
  @apply mt-0;
}

.content .demo ul {
  @apply list-none ml-0 p-0;
}
</style>
