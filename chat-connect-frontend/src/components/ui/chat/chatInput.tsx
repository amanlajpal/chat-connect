import { Button } from "../common/button";
import { Textarea } from "../common/textarea";
import { AiOutlineSend } from "react-icons/ai";

function ChatInput() {
  return (
    <div className="flex gap-4 fixed bottom-4 w-[60%]">
      <Textarea placeholder="Type your message here." className="w-[85%] min-h-[4rem]" />
      <Button variant="outline" className="h-auto w-[15%] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" size="icon">
        <AiOutlineSend className="h-4 w-4"/>
      </Button>
    </div>
  );
}

export default ChatInput;
