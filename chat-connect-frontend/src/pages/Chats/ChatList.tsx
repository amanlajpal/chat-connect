import Chat from "@/components/ui/chat/chat";

function ChatList(props: any) {
  const { chats } = props;
  return (
    <>
      <div className="h-full">
        {chats?.length ? (
          chats.map((chat: any) => <Chat chat={chat} />)
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground">No chats yet</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatList;
