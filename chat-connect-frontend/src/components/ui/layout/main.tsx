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
import {
  addChatMessage,
  joinChat,
  leaveChat,
  setFetchedChats,
  setSelectedChat,
} from "@/store/chatsSlice";
import { Chat as ChatInterface } from "@/interfaces/Chat";
function Main() {
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const chatsFromGlobalState = useSelector((state: any) => {
    return state?.chats?.value;
  });
  const user = useSelector((state: any) => state?.user?.value);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const handleChatSelection = (chat: any) => {
    dispatch(setSelectedChat(chat));
  };
  useEffect(() => {
    axiosInstance
      .request({
        method: "GET",
        url: "/v1/allChats",
      })
      .then((response) => {
        const chatsToSet = response?.data?.data;
        dispatch(setFetchedChats(chatsToSet));
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
      delete message.status;
      const chat = message;
      dispatch(joinChat(chat));
      toast({
        title: `${chat?.name} joined the chat!`,
      });
    } else if (message.status === "LEAVE") {
      const leaverNumber = message?.fromNumber;
      const chat = message;
      dispatch(leaveChat(leaverNumber));
      toast({
        title: `${chat?.name} left the chat!`,
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

  const fetchSelectedChatMessages = (userIds: Number[]) => {
    axiosInstance
      .request({
        method: "GET",
        url: `/v1/users/messages`,
        params: {
          userId1: userIds[0],
          userId2: userIds[1],
        },
      })
      .then((response) => {
        setSelectedChatMessages(response?.data?.data);
      })
      .catch((error) => {
        console.log(error, "error!");
        toast({
          title: error?.response?.data?.message || "Fetching messages failed!",
          description: `Please try again later.`,
          variant: "destructive",
        });
      });
  };
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

  useEffect(() => {
    const selectedChat = chatsFromGlobalState?.find((chat: ChatInterface) => {
      return chat.selected === true;
    });
    if(selectedChat && user?.id && selectedChat?.id) {
      fetchSelectedChatMessages([user?.id, selectedChat?.id]);
    }
  }, [chatsFromGlobalState]);
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <Sidebar>
          <div className="flex justify-center items-center h-[10%] bg-gray-100">
            <p className="logo">Chat Connect</p>
          </div>
          <ChatList
            chats={chatsFromGlobalState}
            handleChatSelection={handleChatSelection}
          />
        </Sidebar>
        <ResizableHandle />
        <ChatRoom>
          <ChatWindow
            selectedChat={chatsFromGlobalState?.find((chat: ChatInterface) => {
              return chat.selected === true;
            })}
            selectedChatMessages={selectedChatMessages} // selectedChatMessages
          />
        </ChatRoom>
      </ResizablePanelGroup>
    </div>
  );
}

export default Main;
