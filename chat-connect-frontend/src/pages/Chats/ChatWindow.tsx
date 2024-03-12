import ChatInput from "@/components/ui/chat/chatInput";
import MessageArea from "@/components/ui/chat/messageArea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/common/avatar";

function ChatWindow() {
  return (
    <section className="h-full">
      <header className="flex items-center h-[10%] border-b border-inherit">
        <Avatar className="ml-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <h2 className="mx-4">Deep</h2>
      </header>
      <div
        className="
        p-4 flex flex-col h-[90%] 
        gap-2 bg-repeat 
        bg-[url('./img/message-window-pattern.jpg')] 
        bg-[length:300px]
        relative
        "
      >
        <MessageArea />
        <ChatInput />
      </div>
    </section>
  );
}

export default ChatWindow;
