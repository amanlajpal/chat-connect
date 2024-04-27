import ChatInput from "@/components/ui/chat/chatInput";
import MessageArea from "@/components/ui/chat/messageArea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/common/avatar";
import { Chat as ChatInterface } from "@/interfaces/Chat";
import Message from "@/interfaces/Message";
import { ScrollArea } from "@/components/ui/common/scroll-area";
function ChatWindow({
  selectedChat,
  selectedChatMessages,
}: {
  selectedChat: ChatInterface;
  selectedChatMessages: Message[];
}) {
  return (
    <section className="h-full">
      {selectedChat ? (
        <>
          <header className="flex items-center h-[10%] border-b border-inherit">
            <Avatar className="ml-8">
              <AvatarImage src={selectedChat?.profilePhoto} />
              <AvatarFallback>
                {selectedChat?.name?.slice(0, 2)?.toUpperCase() || "DP"}
              </AvatarFallback>
            </Avatar>
            <h2 className="mx-4">{selectedChat?.name}</h2>
          </header>
          <div
            className="
        flex flex-col h-[90%] 
        gap-2 bg-repeat 
        bg-[url('./img/message-window-pattern.jpg')] 
        bg-[length:300px]
        relative
        "
          >
            <ScrollArea className="h-full w-full p-4">
              <MessageArea messages={selectedChatMessages || []} />
            </ScrollArea>
            <ChatInput />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-muted-foreground">
            Select a chat to start messaging!
          </p>
        </div>
      )}
    </section>
  );
}
export default ChatWindow;
