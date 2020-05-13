export interface ChatMessage {
  id: string;
  message: string;
  chatMemberId?: string;
  userId: string;
  sendDate: Date; // TODO on backend
  replyToMessageId?: string;
  forwardFromUserId?: string;
}

export interface CreateChatMessageRequest {
  message: string;
  replyToMessageId?: string;
  forwardFromUserId?: string;
}
