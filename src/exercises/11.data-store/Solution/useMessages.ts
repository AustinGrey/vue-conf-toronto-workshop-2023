import { reactive, toRefs } from 'vue'
import useFakeData from './useFakeData'

const state = reactive({
  // Initialize with fake data
  messages: useFakeData().messages
})

export default () => {
  const { messages } = toRefs(state)

  const sendMessage = (message: string, to: string) => {
    messages.value.unshift({
      id: messages.value.length + 1,
      from: 'You',
      to,
      content: message,
      time: new Date().toLocaleTimeString()
    })
  }

  return { messages, sendMessage }
}
