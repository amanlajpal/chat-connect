import { useState } from "react";
import { Button } from "../common/button";
import { Textarea } from "../common/textarea";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { getStompClient } from "@/connections/stompClient";

function ChatInput() {
  const [messageInput, setMessageInput] = useState("");
  const stompClient = getStompClient();
  const username = useSelector((state: any) => state?.username?.value);
  function sendMessage(messageInput: any) {
    var messageContent = messageInput.trim();
    if (messageContent && stompClient) {
      var chatMessage = {
        sender: username,
        content: messageContent,
        type: "CHAT",
      };
      stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
    }
  }
  return (
    <div className="flex gap-4 fixed bottom-4 w-[60%]">
      <Textarea
        placeholder="Type your message here."
        className="w-[85%] min-h-[4rem]"
        onChange={(event: any) => setMessageInput(event?.target?.value)}
        value={messageInput || ""}
      />
      <Button
        variant="outline"
        className="h-auto w-[15%] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        size="icon"
        onClick={() => {
          sendMessage(messageInput);
          setMessageInput("");
        }}
      >
        <AiOutlineSend className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default ChatInput;
