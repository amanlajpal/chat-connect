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
import { useState } from "react";

function Chat() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <Card
        className={`
            flex 
            justify-left 
            items-center 
            m-4 px-10
            hover:bg-gray-100 
            active:bg-gray-300
            focus:outline-none 
            h-20
            ${isClicked ? 'bg-gray-200' : ''}
        `}
        onClick={handleClick}
      >
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <CardHeader className="py-3">
          <CardTitle>Deep</CardTitle>
          <CardDescription>Last chat message!</CardDescription>
        </CardHeader>
        <p className="text-right text-sm text-muted-foreground ml-auto">12:00 PM</p>
      </Card>
    </div>
  );
}

export default Chat;
