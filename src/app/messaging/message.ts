export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  receiverId: number;
  adId?: number;
  content: string;
  messageType: MessageType;
  status: MessageStatus;
  sentAt: string;
  readAt?: string;
  attachments: MessageAttachment[];
}

export interface Conversation {
  id: number;
  participants: number[];
  adId?: number;
  adTitle?: string;
  lastMessage: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MessageAttachment {
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE'
}

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED'
}

export interface SendMessageRequest {
  receiverId: number;
  content: string;
  adId?: number;
  messageType: MessageType;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
