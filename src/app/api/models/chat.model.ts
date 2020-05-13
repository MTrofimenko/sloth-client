export interface Chat {
  id: string;
  name: string;
  status: ChatStatus;
  members: ChatMember[];
}

export interface ChatTile {
  id: string;
  name: string;
  status: ChatStatus;
  lastMessage: string;
  lastDate: Date;
  isCurrent: boolean;
  isPending: boolean;
}

export interface ChatMember {
  chatMemberId: string;
  userId: string;
  status: number;
  publicKey: string;
}

export interface CreateChatRequest {
  name: string;
  memberIds: string[];
  creatorPublicKey: string;
}

export enum ChatStatus {
  Active,
  Pending,
  Aborted,
  Deleted,
}
export enum ChatMemberStatus {
  Active,
  Pending,
  Aborted,
  Removed,
}
