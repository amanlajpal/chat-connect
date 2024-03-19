import Chat from "@/components/ui/chat/chat";
import { setSelectedChat } from "@/store/chatsSlice";
import { useDispatch, useSelector } from "react-redux";

function ChatList() {
  const chats = useSelector((state: any) => {
    return state?.chats?.value?.filter(
      (chat: any) => !(chat.sender === state?.username?.value)
    );
  });
  const dispatch = useDispatch();
  const handleChatSelection = (chat: any) => {
    dispatch(setSelectedChat(chat));
  };
  return (
    <>
      <div className="h-full">
        {chats?.length ? (
          chats.map((chat: any, index: number) => (
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
