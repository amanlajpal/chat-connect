import Message from "./Message";

interface Conversation{
    id: number;
    fromUserId?: number;
    toUserId?: number;
    messages: Message[];
    joinedAt?: Date;
}

export default Conversation;