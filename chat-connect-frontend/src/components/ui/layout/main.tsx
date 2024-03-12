import ChatList from "@/pages/Chats/ChatList";
import { ResizableHandle, ResizablePanelGroup } from "../common/resizable";
import Sidebar from "./sidebar";
import ChatRoom from "./chatRoom";
import ChatWindow from "@/pages/Chats/ChatWindow";

function Main() {
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <Sidebar>
          <div className="flex justify-center items-center h-[10%] bg-gray-100">
            <p className="logo">Chat Connect</p>
          </div>
          <ChatList />
        </Sidebar>
        <ResizableHandle />
        <ChatRoom>
          <ChatWindow />
        </ChatRoom>
      </ResizablePanelGroup>
    </div>
  );
}

export default Main;
