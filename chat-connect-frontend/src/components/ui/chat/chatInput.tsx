import { useEffect, useState } from "react";
import { Button } from "../common/button";
import { Textarea } from "../common/textarea";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getStompClient } from "@/connections/stompClient";
import { setMessage } from "@/store/conversationSlice";
import Message, { MessageStatus } from "@/interfaces/Message";

function ChatInput() {
  const [messageInput, setMessageInput] = useState("");
  const user = useSelector((state: any) => state?.user?.value);
  const conversation = useSelector((state: any) => state?.conversation?.value);
  const dispatch = useDispatch();
  let stompClient = getStompClient();
  function sendMessage(messageInput: any) {
    var messageContent = messageInput.trim();
    if (messageContent && stompClient) {
      const message: Message = {
        messageText: messageContent,
        fromNumber: user?.phoneNumber,
        status: MessageStatus.SENT,
        conversationId: conversation?.id,
      };
      stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify(message)
      );
      dispatch(
        setMessage({
          ...message,
        })
      );
    }else{
      console.log("Error sending message!");
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
