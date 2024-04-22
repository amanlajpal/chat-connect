import Chat from "@/components/ui/chat/chat";
import { Chat as ChatInterface } from "@/interfaces/Chat";

function ChatList({
  chats,
  handleChatSelection,
}: {
  chats: ChatInterface[];
  handleChatSelection: (chat: ChatInterface) => void;
}) {
  return (
    <>
      <div className="h-full">
        {chats?.length ? (
          chats.map((chat: ChatInterface, index: number) => (
            <Chat
              chat={chat}
              key={index}
              handleChatSelection={handleChatSelection}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground">No chats yet!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatList;
