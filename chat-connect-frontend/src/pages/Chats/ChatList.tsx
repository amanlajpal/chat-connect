import Chat from "@/components/ui/chat/chat";
import { useToast } from "@/components/ui/common/use-toast";
import axiosInstance from "@/connections/axiosInstance";
import { setSelectedChat } from "@/store/chatsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chat as ChatInterface } from "@/interfaces/Chat";

function ChatList({ chats, handleChatSelection }: { chats: ChatInterface[], handleChatSelection: (chat: ChatInterface) => void }) {
  // const [chats, setChats] = useState([]);
  // // const chatsFromGlobalState = useSelector((state: any) => {
  // //   return state?.chats?.value?.filter(
  // //     (chat: any) => !(chat.sender === state?.username?.value)
  // //   );
  // // });
  // const { toast } = useToast();
  // const dispatch = useDispatch();
  // const handleChatSelection = (chat: any) => {
  //   // dispatch(setSelectedChat(chat));
  //   setChats((prevChats: any) => {
  //     return prevChats.map((prevChat: any) => {
  //       if (prevChat.id === chat.id) {
  //         return { ...prevChat, isSelected: true };
  //       } else {
  //         return { ...prevChat, isSelected: false };
  //       }
  //     });
  //   });
  // };
  // console.log(chats, "chats!");
  // useEffect(() => {
  //   axiosInstance
  //     .request({
  //       method: "GET",
  //       url: "/v1/allChats",
  //     })
  //     .then((response) => {
  //       console.log(response, "response!");
  //       const chatsToSet = response?.data?.data
  //       setChats(chatsToSet);
  //     })
  //     .catch((error) => {
  //       console.log(error, "error!");
  //       toast({
  //         title: error?.response?.data?.message || "Login Failed!",
  //         description: `Please try again with a different phone number`,
  //         variant: "destructive",
  //       });
  //     });
  // }, []);
  // useEffect(() => {
  //   setChats(chatsFromGlobalState);
  // }, [chatsFromGlobalState]);
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
