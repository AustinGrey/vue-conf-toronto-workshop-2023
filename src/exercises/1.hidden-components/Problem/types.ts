export type User = {
  id: number
  name: string
  isOnline: boolean
}

export type Notification = {
  id: number
  from: string
  content: string
  time: string
}

export type Message = {
  id: number
  from: string
  to: string
  content: string
  time: string
}
