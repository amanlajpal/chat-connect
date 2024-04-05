import { useSelector } from "react-redux";
import Message from "./message";
import MessageInterface from "@/interfaces/Message";

function MessageArea(props: any) {
  const { messages } = props;

  const user = useSelector((state: any) => state?.user?.value);

  return (
    <>
      {messages?.map((message: MessageInterface, index: number) => {
        if (message?.fromNumber === user?.phoneNumber) {
          return (
            <div key={index} className="flex justify-end mb-1">
              <Message
                messageText={message?.messageText}
                time={message?.sentAt || "Now"}
              />
            </div>
          );
        } else {
          return (
            <div key={index} className="flex justify-start mb-1">
              <Message
                messageText={message?.messageText}
                time={message?.sentAt || "Now"}
              />
            </div>
          );
        }
      })}
      {/* Add a margin block to the bottom of the message area */}
      <div style={{ marginBlock: "100px" }}></div>
    </>
  );
}

export default MessageArea;
