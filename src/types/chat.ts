export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  read: boolean
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantImage: string
  lastMessageTime: string
  messages: Message[]
  unreadCount: number
}