import ChatList from "@/components/ui/chat/ChatList";
import {
  ResizableHandle,
  ResizablePanelGroup,
} from "../components/ui/common/resizable";
import Sidebar from "../components/ui/layout/sidebar";
import ChatRoom from "../components/ui/layout/chatRoom";
import ChatWindow from "@/components/ui/chat/ChatWindow";
import { useCallback, useEffect } from "react";
import axiosInstance from "@/connections/axiosInstance";
import { useToast } from "../components/ui/common/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { setConnectionStatus } from "@/store/connectionStatusSlice";
import { CiLogout } from "react-icons/ci";
import {
  disconnectStompClient,
  getStompClient,
  initializeStompClient,
} from "@/connections/stompClient";
import {
  joinChat,
  leaveChat,
  setFetchedChats,
  setSelectedChat,
} from "@/store/chatsSlice";
import { Chat as ChatInterface } from "@/interfaces/Chat";
import { updateConversation, setMessage } from "@/store/conversationSlice";
import { Button } from "../components/ui/common/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const chatsFromGlobalState = useSelector((state: any) => {
    return state?.chats?.value;
  });
  const connectionStatus = useSelector(
    (state: any) => state?.connectionStatus?.value
  );
  const conversation = useSelector((state: any) => state?.conversation?.value);
  const user = useSelector((state: any) => state?.user?.value);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        let chatsToSet = response?.data?.data?.chats || [];
        chatsToSet = chatsToSet.filter((chat: any) => {
          return chat.id !== user.id;
        });
        dispatch(setFetchedChats(chatsToSet));
      })
      .catch((error) => {
        console.log(error, "error!");
        toast({
          title: error?.response?.data?.message || "Fetching all chats failed!",
          variant: "destructive",
        });
      });
  }, []);

  function onMessageReceived(payload: any) {
    var message = JSON.parse(payload?.body);
    if (message.status === "SENT") {
      if (message?.fromNumber === user?.phoneNumber) {
        message.status = "DELIVERED";
      } else {
        dispatch(
          setMessage({
            ...message,
          })
        );
      }
    } else if (message.status === "JOIN") {
      delete message.status;
      const chat = message;
      dispatch(joinChat(chat));
      toast({
        title: `${chat?.name} joined the chat!`,
      });
    } else if (message.status === "LEAVE") {
      const leaverNumber = message?.phoneNumber;
      const chat = message;
      dispatch(leaveChat(leaverNumber));
      toast({
        title: `${chat?.name} left the chat!`,
      });
    }
  }

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
        const conversationId = response?.data?.data?.conversationId;
        const messages = response?.data?.data?.messages?.map((message: any) => {
          delete message?.conversationId;
          return {
            ...message,
          };
        });
        dispatch(
          updateConversation({
            id: conversationId,
            messages: messages,
          })
        );
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
  const connectToStompClient = useCallback(async () => {
    // If already connected, return early
    if (getStompClient()?.connected) return;

    dispatch(setConnectionStatus("connecting"));
    if (user?.id) {
      const initializedSocket = await initializeStompClient();
      dispatch(setConnectionStatus("connected"));
      getStompClient()?.subscribe("/topic/public", onMessageReceived);
      // Send connected user info to the server
      getStompClient()?.send(
        "/app/chat.addUser",
        {}, // headers
        JSON.stringify(user) // body
      );
    }
  }, []);

  useEffect(() => {
    if (connectionStatus === "disconnected") {
      connectToStompClient();
    }
    return () => {
      if (connectionStatus === "connected") {
        disconnectStompClient();
      }
    };
  }, [connectionStatus]);

  useEffect(() => {
    const selectedChat = chatsFromGlobalState?.find((chat: ChatInterface) => {
      return chat.selected === true;
    });
    if (selectedChat && user?.id && selectedChat?.id) {
      fetchSelectedChatMessages([user?.id, selectedChat?.id]);
    }
  }, [chatsFromGlobalState]);
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <Sidebar>
          <div className="flex justify-center items-center h-[10%] bg-gray-100">
            <div className="absolute left-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  axiosInstance.post("/v1/auth/logout").then(() => {
                    navigate("/");
                    window.location.reload();
                  });
                }}
              >
                <CiLogout className="h-4 w-4" />
              </Button>
            </div>
            <p className="logo">Chat Connect</p>
          </div>
          <ChatList
            chats={chatsFromGlobalState?.filter((chat: ChatInterface) => {
              return chat.id !== user?.id;
            })}
            handleChatSelection={handleChatSelection}
          />
        </Sidebar>
        <ResizableHandle />
        <ChatRoom>
          <ChatWindow
            selectedChat={chatsFromGlobalState?.find((chat: ChatInterface) => {
              return chat.selected === true;
            })}
            selectedChatMessages={conversation?.messages} // selectedChatMessages
          />
        </ChatRoom>
      </ResizablePanelGroup>
    </div>
  );
}

export default Home;