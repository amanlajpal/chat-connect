import ChatList from "@/pages/Chats/ChatList";
import { ResizableHandle, ResizablePanelGroup } from "../common/resizable";
import Sidebar from "./sidebar";
import ChatRoom from "./chatRoom";
import ChatWindow from "@/pages/Chats/ChatWindow";
import { useEffect, useState } from "react";
import axiosInstance from "@/connections/axiosInstance";
import { useToast } from "../common/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { setConnectionStatus } from "@/store/connectionStatusSlice";
// import { setUsername } from "@/store/usernameSlice";
import {
  getStompClient,
  initializeStompClient,
} from "@/connections/stompClient";
import { addChatMessage, joinChat, leaveChat, setFetchedChats } from "@/store/chatsSlice";

function Main() {
  const [chats, setChats] = useState([]);
  const chatsFromGlobalState = useSelector((state: any) => {
    return state?.chats?.value
  });
  const user = useSelector((state: any) => state?.user?.value);
  const { toast } = useToast();
  const dispatch = useDispatch();
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
        const chatsToSet = response?.data?.data;
        dispatch(setFetchedChats(chatsToSet));
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

  function onMessageReceived(payload: any) {
    console.log(payload, "payload - on message received!");
    var message = JSON.parse(payload?.body);
    if (message.status === "CHAT") {
      console.log(message, "message - chat!");
      dispatch(
        addChatMessage({
          ...message,
          sentAt: new Date(message?.sentAt).toLocaleTimeString(),
        })
      );
    } else if (message.status === "JOIN") {
      const joineeNumber = message?.fromNumber;
      dispatch(joinChat(joineeNumber));
      toast({
        title: message?.messageText,
      });
    } else if (message.status === "LEAVE") {
      const leaverNumber = message?.fromNumber;
      dispatch(leaveChat(leaverNumber));
      toast({
        title: message?.messageText,
      });
    }
  }
  // const onMessageReceived = (payload: any) => {
  //   const message = JSON.parse(payload?.body);
  //   console.log(message, "message!");
  //   setChats((prevChats: any) => {
  //     return prevChats.map((prevChat: any) => {
  //       if (prevChat.id === message.chatId) {
  //         return {
  //           ...prevChat,
  //           messages: [...prevChat.messages, message],
  //         };
  //       } else {
  //         return prevChat;
  //       }
  //     });
  //   });
  // };

  const connectToSocket = async () => {
    dispatch(setConnectionStatus("connecting"));
    // let username = signupData?.name.trim();
    // dispatch(setUsername(username));
    if (user?.id) {
      const initializedSocket = await initializeStompClient();
      dispatch(setConnectionStatus("connected"));
      getStompClient()?.subscribe("/topic/public", onMessageReceived);
      // Tell your username to the server
      getStompClient()?.send(
        "/app/chat.addUser",
        {}, // headers
        JSON.stringify(user) // body
      );
      console.log(initializedSocket, "initialized socket!");
    }
  };

  useEffect(() => {
    connectToSocket();
  }, []);
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <Sidebar>
          <div className="flex justify-center items-center h-[10%] bg-gray-100">
            <p className="logo">Chat Connect</p>
          </div>
          <ChatList chats={chatsFromGlobalState} handleChatSelection={handleChatSelection} />
        </Sidebar>
        <ResizableHandle />
        <ChatRoom>
          <ChatWindow
            selectedChat={chats?.find((chat) => {
              return chat.isSelected === true;
            })}
          />
        </ChatRoom>
      </ResizablePanelGroup>
    </div>
  );
}

export default Main;
