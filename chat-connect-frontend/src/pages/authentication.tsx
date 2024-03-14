import { Button } from "@/components/ui/common/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card";
import { Input } from "@/components/ui/common/input";
import { Label } from "@/components/ui/common/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/common/tabs";
import { ToastAction } from "@/components/ui/common/toast";
import { useToast } from "@/components/ui/common/use-toast";
import { setConnectionStatus } from "@/store/connectionStatusSlice";
import { setStompClient } from "@/store/stompClientSlice";
import { setUsername } from "@/store/usernameSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export function Authentication() {
  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const connectionStatus = useSelector(
    (state: any) => state?.connectionStatus?.value
  );
  console.log(connectionStatus, "connection status!");
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleSubmit = () => {
    dispatch(setConnectionStatus("connecting"));
    let username = signupData?.name.trim();

    if (username) {
      dispatch(setUsername(username));
      var socket = new SockJS("http://localhost:8080/ws");
      let stompClient = Stomp.over(socket);
      function onMessageReceived(payload: any) {
        console.log(payload, "payload - on message received!");
        var message = JSON.parse(payload.body);
        if (message.type === "JOIN") {
          toast({
            title: message.sender + " joined!",
          });
        } else if (message.type === "LEAVE") {
          toast({
            title: message.sender + " left!",
          });
        } else {
          // messageElement.classList.add("chat-message");
          console.log(message, "message - on message received!");
          // var avatarElement = document.createElement("i");
          // var avatarText = document.createTextNode(message.sender[0]);
          // avatarElement.appendChild(avatarText);
          // avatarElement.style["background-color"] = getAvatarColor(
          //   message.sender
          // );

          // messageElement.appendChild(avatarElement);

          // var usernameElement = document.createElement("span");
          // var usernameText = document.createTextNode(message.sender);
          // usernameElement.appendChild(usernameText);
          // messageElement.appendChild(usernameElement);
        }

        // var textElement = document.createElement("p");
        // var messageText = document.createTextNode(message.content);
        // textElement.appendChild(messageText);

        // messageElement.appendChild(textElement);

        // messageArea.appendChild(messageElement);
        // messageArea.scrollTop = messageArea.scrollHeight;
      }
      function onConnected() {
        // Subscribe to the Public Topic
        console.log("connected to websocket server!");
        stompClient.subscribe(
          "http://localhost:8080/ws/topic/public",
          onMessageReceived
        );

        // Tell your username to the server
        stompClient.send(
          "/app/chat.addUser",
          {}, // headers
          JSON.stringify({ sender: username, type: "JOIN" })
        );
        dispatch(setStompClient(stompClient));
        dispatch(setConnectionStatus("connected"));
      }

      function onError(error: any) {
        toast({
          title: "Error: Could not connect to WebSocket server.",
          description: "Please refresh this page to try again!",
          action: (
            <ToastAction
              altText="Refresh"
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh
            </ToastAction>
          ),
        });
        dispatch(setConnectionStatus("disconnected"));
        console.log(error, "Could not connect to WebSocket server.");
      }
      stompClient.connect({}, onConnected, onError);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen overflow-y-hidden">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" defaultValue="" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Link to={"/home"}>Login</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Enter your details to create an account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={signupData?.name || ""}
                  onChange={(event) =>
                    setSignupData((prevSignupData) => {
                      return { ...prevSignupData, name: event?.target?.value };
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={signupData?.phone || ""}
                  onChange={(event) =>
                    setSignupData((prevSignupData) => {
                      return { ...prevSignupData, phone: event?.target?.value };
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signupData?.password || ""}
                  onChange={(event) =>
                    setSignupData((prevSignupData) => {
                      return {
                        ...prevSignupData,
                        password: event?.target?.value,
                      };
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild onClick={handleSubmit}>
                <Link to={"/home"}>Signup</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
