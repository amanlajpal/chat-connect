import { ResizablePanel } from "../common/resizable";

function ChatRoom(props: { children: React.ReactNode }) {
  return <ResizablePanel defaultSize={65}>{props?.children}</ResizablePanel>;
}

export default ChatRoom;
