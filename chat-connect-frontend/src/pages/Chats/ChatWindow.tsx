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
  // const selectedChat = useSelector((state: any) => {
  //   const selectedChat = state?.chats?.value?.find(
  //     (chat: any) => chat.isSelected === true
  //   );
  //   return selectedChat;
  // });
  // const connectionStatus = useSelector(
  //   (state: any) => state?.connectionStatus?.value
  // );
  // const username = useSelector((state: any) => state?.username?.value);
  // const selectedChatMessages =
  //   selectedChat?.messages?.filter((message: any) => {
  //     return message?.receiver === username || message?.sender === username;
  //   }) || [];

  // const dispatch = useDispatch();
  // const { toast } = useToast();
  // useEffect(() => {
  //   try {
  //     toast({
  //       title: `Welcome to Chat App!`,
  //       description: `You are now connected to the chat server.`,
  //       duration: 50000000,
  //     });
  //     if (connectionStatus === "connected") {
  //       function onMessageReceived(payload: any) {
  //         console.log(payload, "payload - on message received!");
  //         var message = JSON.parse(payload?.body);
  //         if (message.type === "CHAT") {
  //           console.log(message, "message - chat!");
  //           dispatch(addChatMessage({
  //             ...message,
  //             sentAt: new Date(message?.sentAt).toLocaleTimeString(),
  //           }));
  //         } else if (message.type === "JOIN") {
  //           dispatch(joinChat(message));
  //           toast({
  //             title: `${message?.sender} joined the chat!`,
  //           });
  //         } else if (message.type === "LEAVER") {
  //           dispatch(leaveChat(message));
  //           toast({
  //             title: `${message?.sender} left the chat!`,
  //           });
  //         }
  //       }
  //       getStompClient()?.subscribe("/topic/public", onMessageReceived);
  //       // Tell your username to the server
  //       getStompClient()?.send(
  //         "/app/chat.addUser",
  //         {}, // headers
  //         JSON.stringify({
  //           sender: username,
  //           type: "JOIN",
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error, "error - chat window!");
  //   }
  // }, [connectionStatus, dispatch, username]);
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
