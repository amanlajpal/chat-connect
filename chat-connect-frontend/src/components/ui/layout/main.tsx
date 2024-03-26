import ChatList from "@/pages/Chats/ChatList";
import { ResizableHandle, ResizablePanelGroup } from "../common/resizable";
import Sidebar from "./sidebar";
import ChatRoom from "./chatRoom";
import ChatWindow from "@/pages/Chats/ChatWindow";
import { useEffect, useState } from "react";
import axiosInstance from "@/connections/axiosInstance";
import { useToast } from "../common/use-toast";

function Main() {
  const [chats, setChats] = useState([]);
  // const chatsFromGlobalState = useSelector((state: any) => {
  //   return state?.chats?.value?.filter(
  //     (chat: any) => !(chat.sender === state?.username?.value)
  //   );
  // });
  const { toast } = useToast();
  // const dispatch = useDispatch();
  const handleChatSelection = (chat: any) => {
    // dispatch(setSelectedChat(chat));
    setChats((prevChats: any) => {
      return prevChats.map((prevChat: any) => {
        if (prevChat.id === chat.id) {
          return { ...prevChat, isSelected: true };
        } else {
          return { ...prevChat, isSelected: false };
        }
      });
    });
  };
  console.log(chats, "chats!");
  useEffect(() => {
    axiosInstance
      .request({
        method: "GET",
        url: "/v1/allChats",
      })
      .then((response) => {
        console.log(response, "response!");
        const chatsToSet = response?.data?.data
        setChats(chatsToSet);
      })
      .catch((error) => {
        console.log(error, "error!");
        toast({
          title: error?.response?.data?.message || "Login Failed!",
          description: `Please try again with a different phone number`,
          variant: "destructive",
        });
      });
  }, []);
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <Sidebar>
          <div className="flex justify-center items-center h-[10%] bg-gray-100">
            <p className="logo">Chat Connect</p>
          </div>
          <ChatList chats={chats} handleChatSelection={handleChatSelection}/>
        </Sidebar>
        <ResizableHandle />
        <ChatRoom>
          <ChatWindow selectedChat={chats?.find((chat)=>{
            return chat.isSelected === true
          })}/>
        </ChatRoom>
      </ResizablePanelGroup>
    </div>
  );
}

export default Main;
