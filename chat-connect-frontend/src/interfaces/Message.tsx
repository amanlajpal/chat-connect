interface Message {
  id?: number;
  messageText: string;
  fromNumber: string;
  status: MessageStatus;
  sentAt?: Date;
  conversationId: number;
}

enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  JOIN = "JOIN",
  LEAVE = "LEAVE",
  TYPING = "TYPING",
  STOP_TYPING = "STOP_TYPING",
}

export { MessageStatus };
export default Message;
