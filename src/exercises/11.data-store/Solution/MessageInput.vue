<template>
  <form class="message-input mt-4 flex font-sans" @submit.prevent="handleMessage">
    <input
      v-model="newMessage"
      class="flex-grow p-2 border rounded-l-md"
      placeholder="Type your message here..."
    />
    <button
      type="submit"
      class="bg-blue-500 hover:bg-mt-dark-blue transition-colors duration-150 text-white px-4 py-2 rounded-r-md"
    >
      Send
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useMessages from './useMessages'

const props = defineProps<{ to: string }>()

const newMessage = ref('')
const { sendMessage } = useMessages()

const handleMessage = () => {
  sendMessage(newMessage.value, props.to)
  newMessage.value = ''
}
</script>
