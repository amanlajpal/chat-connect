import { MessageStatus } from "@/interfaces/Message";
import { RiCheckDoubleLine } from "react-icons/ri";
import { RiCheckLine } from "react-icons/ri";

function Message(props: {
  messageText: string;
  status: MessageStatus;
  time: string | Date;
}) {
  return (
    <div className="bg-white w-1/2 px-4 py-1 border border-inherit rounded-lg">
      <div className="flex items-center gap-2">
        <p className="text-sm">{props?.messageText}</p>
      </div>
      <div className="flex justify-end gap-1">
        <span className="text-right text-muted-foreground text-xs">
          {`${props?.time}`}
        </span>
        {props?.status === "SENT" ? (
          <RiCheckLine />
        ) : (
          <RiCheckDoubleLine />
        )}
      </div>
    </div>
  );
}

export default Message;
