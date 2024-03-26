import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/common/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card";

function Chat(props: any) {
  const { chat, handleChatSelection } = props;

  const handleClick = () => {
    handleChatSelection(chat);
  };

  return (
    <div>
      <Card
        className={`
            flex 
            justify-left 
            items-center 
            m-4 px-8
            hover:bg-gray-100 
            active:bg-gray-300
            focus:outline-none 
            h-20
            ${chat?.isSelected ? "bg-gray-200" : ""}
        `}
        onClick={handleClick}
      >
        <Avatar>
          <AvatarImage src={chat?.profile_photo} />
          <AvatarFallback>
            {chat?.first_name?.slice(0, 2)?.toUpperCase() || "DP"}
          </AvatarFallback>
        </Avatar>
        <CardHeader className="py-3">
          <CardTitle>{chat?.first_name + " " + chat?.last_name}</CardTitle>
          {chat?.lastMessage ? (
            <CardDescription>{chat?.lastMessage}</CardDescription>
          ) : (
            <CardDescription className="text-muted-foreground">
              No messages yet
            </CardDescription>
          )}
        </CardHeader>
        <p className="text-right text-sm text-muted-foreground ml-auto">
          {chat?.lastMessageTime || "Just now"}
        </p>
      </Card>
    </div>
  );
}

export default Chat;
