import { ref } from 'vue'
import type { User } from './types'

const initial = [
  {
    id: 1,
    from: 'Alice',
    to: 'You',
    content: 'Good morning!',
    time: '2023-09-12T08:00:00Z'
  },
  {
    id: 2,
    from: 'You',
    to: 'Alice',
    content: 'Good morning Alice! How was your weekend?',
    time: '2023-09-12T08:05:00Z'
  },
  {
    id: 3,
    from: 'Alice',
    to: 'You',
    content: 'It was great, I went hiking. How about you?',
    time: '2023-09-12T08:10:00Z'
  },
  {
    id: 4,
    from: 'You',
    to: 'Alice',
    content: 'Sounds lovely! I stayed in, watched some movies.',
    time: '2023-09-12T08:15:00Z'
  },
  {
    id: 5,
    from: 'Alice',
    to: 'You',
    content: 'Oh, watched anything interesting?',
    time: '2023-09-12T08:20:00Z'
  },
  {
    id: 6,
    from: 'You',
    to: 'Alice',
    content: 'Yeah, watched "Inception". A mind-bending experience as always.',
    time: '2023-09-12T08:25:00Z'
  },
  {
    id: 7,
    from: 'Alice',
    to: 'You',
    content: 'Absolutely! Christopher Nolan never disappoints.',
    time: '2023-09-12T08:30:00Z'
  },
  {
    id: 8,
    from: 'You',
    to: 'Alice',
    content: 'True that. Got plans for the week?',
    time: '2023-09-12T08:35:00Z'
  },
  {
    id: 9,
    from: 'Alice',
    to: 'You',
    content: 'Work mostly, but planning for a quiet dinner on Friday. You?',
    time: '2023-09-12T08:40:00Z'
  },
  {
    id: 10,
    from: 'You',
    to: 'Alice',
    content: 'Same here. Working on a new project. Catch you later?',
    time: '2023-09-12T08:45:00Z'
  },
  {
    id: 11,
    from: 'Alice',
    to: 'You',
    content: 'Sure, have a great day!',
    time: '2023-09-12T08:50:00Z'
  },
  {
    id: 12,
    from: 'Bob',
    to: 'You',
    content: 'Hey there! Long time no see.',
    time: '2023-09-12T09:00:00Z'
  },
  {
    id: 13,
    from: 'You',
    to: 'Bob',
    content: 'Bob! Indeed, it has been a while. How have you been?',
    time: '2023-09-12T09:05:00Z'
  },
  {
    id: 14,
    from: 'Bob',
    to: 'You',
    content: 'Been good. Busy with work mostly. How about you?',
    time: '2023-09-12T09:10:00Z'
  },
  {
    id: 15,
    from: 'You',
    to: 'Bob',
    content: 'Same here, working on a few exciting projects at the moment.',
    time: '2023-09-12T09:15:00Z'
  },
  {
    id: 16,
    from: 'Bob',
    to: 'You',
    content: 'Nice to hear that! Got any plans for the weekend?',
    time: '2023-09-12T09:20:00Z'
  },
  {
    id: 17,
    from: 'You',
    to: 'Bob',
    content: 'Not yet, probably going to take it easy. How about you?',
    time: '2023-09-12T09:25:00Z'
  },
  {
    id: 18,
    from: 'Bob',
    to: 'You',
    content: 'Thinking of going for a bike ride around the lake. Want to join?',
    time: '2023-09-12T09:30:00Z'
  },
  {
    id: 19,
    from: 'You',
    to: 'Bob',
    content: 'Sounds fun, I’m in! What time?',
    time: '2023-09-12T09:35:00Z'
  },
  {
    id: 20,
    from: 'Bob',
    to: 'You',
    content: 'How about 8 AM on Saturday?',
    time: '2023-09-12T09:40:00Z'
  },
  {
    id: 21,
    from: 'You',
    to: 'Bob',
    content: 'Perfect! See you then.',
    time: '2023-09-12T09:45:00Z'
  },
  {
    id: 22,
    from: 'Bob',
    to: 'You',
    content: 'Great! Looking forward to it.',
    time: '2023-09-12T09:50:00Z'
  },
  {
    id: 23,
    from: 'You',
    to: 'Bob',
    content: 'Me too! Catch you later.',
    time: '2023-09-12T09:55:00Z'
  },
  {
    id: 24,
    from: 'Bob',
    to: 'You',
    content: 'Sure thing! Take care.',
    time: '2023-09-12T10:00:00Z'
  },
  {
    id: 25,
    from: 'Alice',
    to: 'You',
    content: 'Forgot to ask, are we still on for our book club on Wednesday?',
    time: '2023-09-12T10:05:00Z'
  },
  {
    id: 26,
    from: 'You',
    to: 'Alice',
    content: 'Absolutely, wouldn’t miss it for the world!',
    time: '2023-09-12T10:10:00Z'
  },
  {
    id: 27,
    from: 'Alice',
    to: 'You',
    content: 'Great! See you then.',
    time: '2023-09-12T10:15:00Z'
  },
  {
    id: 28,
    from: 'You',
    to: 'Alice',
    content: 'Looking forward to it. Take care!',
    time: '2023-09-12T10:20:00Z'
  },
  {
    id: 29,
    from: 'Alice',
    to: 'You',
    content: 'You too, bye!',
    time: '2023-09-12T10:25:00Z'
  },
  {
    id: 30,
    from: 'You',
    to: 'Alice',
    content: 'Bye!',
    time: '2023-09-12T10:30:00Z'
  }
]

const live = [
  {
    id: 31,
    from: 'Alice',
    to: 'You',
    content: 'Hey, I was wondering if you are free to catch up this weekend?',
    time: '2023-09-12T11:00:00Z'
  },
  {
    id: 32,
    from: 'Alice',
    to: 'You',
    content: 'Also, have you seen the new movie that released last week?',
    time: '2023-09-12T11:10:00Z'
  },
  {
    id: 33,
    from: 'Alice',
    to: 'You',
    content: 'Just checking in to see how you are doing.',
    time: '2023-09-12T11:20:00Z'
  },
  {
    id: 34,
    from: 'Alice',
    to: 'You',
    content: 'Let me know when you are free to talk, miss our chats!',
    time: '2023-09-12T11:30:00Z'
  },
  {
    id: 35,
    from: 'Bob',
    to: 'You',
    content: 'Hey, long time no chat! How have things been?',
    time: '2023-09-12T12:00:00Z'
  },
  {
    id: 36,
    from: 'Bob',
    to: 'You',
    content: 'Wanted to share some exciting news with you!',
    time: '2023-09-12T12:10:00Z'
  },
  {
    id: 37,
    from: 'Bob',
    to: 'You',
    content: 'Remember our discussion about the new project? I managed to get it off the ground!',
    time: '2023-09-12T12:20:00Z'
  },
  {
    id: 38,
    from: 'Bob',
    to: 'You',
    content: 'Would love to catch up soon and discuss it in detail.',
    time: '2023-09-12T12:30:00Z'
  }
]

// Adjust time relative to now
const initMessages = () => {
  let current = new Date().getTime()
  const adjustedMessages: any[] = []

  ;[...initial].reverse().forEach((message) => {
    const diff = Math.floor(Math.random() * 200 + 20)
    current = current - diff * 1000
    const formatted = new Date(current).toLocaleTimeString()
    adjustedMessages.push({
      ...message,
      time: formatted
    })
  })

  return adjustedMessages
}

const initialTime = 5000
let initialized = false

const messages = ref<any[]>([])
const onlineUsers = ref<User[]>([])
const notifications = ref()

const addLiveMessage = () => {
  const message = live.shift()
  messages.value.unshift({
    ...message,
    time: new Date().toLocaleTimeString()
  })

  if (live.length === 0) {
    return
  }

  const wait = Math.floor((Math.random() * 20 + 5) * 1000)
  setTimeout(addLiveMessage, wait)
}

const initialize = () => {
  messages.value = initMessages()
  onlineUsers.value = [
    { id: 1, name: 'Alice', isOnline: false, status: '🏝' },
    { id: 2, name: 'Bob', isOnline: true, status: '🤠' }
  ]
  notifications.value = [{ id: 1, content: 'Bob is now online' }]

  setTimeout(addLiveMessage, initialTime + 4000)
  setTimeout(() => {
    onlineUsers.value[0].isOnline = true
    notifications.value.push({ id: 2, content: 'Alice is now online' })
  }, initialTime)
}

export default () => {
  if (!initialized) {
    initialized = true
    initialize()
  }

  return {
    messages,
    onlineUsers,
    notifications,
    initialize
  }
}
