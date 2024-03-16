import { ToastAction } from "@/components/ui/common/toast";
import { useToast } from "@/components/ui/common/use-toast";
import { setConnectionStatus } from "@/store/connectionStatusSlice";
import { useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient: any = null;
export const initializeStompClient = (username: any) => {
  console.log(username, "username - initialize stomp client!")
  const { toast } = useToast();
  const dispatch = useDispatch();
  let socket = new SockJS("http://localhost:8080/ws");
  console.log(socket, "socket");
  stompClient = Stomp.over(socket);
  stompClient = stompClient
    ?.connect({}) // connect to the server
    ?.then((x: any) => {
      console.log(x, "x");
      // Subscribe to the Public Topic
      console.log("connected to websocket server!");
      stompClient
        ?.subscribe("http://localhost:8080/ws/topic/public")
        ?.then((response: any) => {
          console.log(response, "response");
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
          onMessageReceived(response);
        });

      // Tell your username to the server
      stompClient.send(
        "/app/chat.addUser",
        {}, // headers
        JSON.stringify({ sender: username, type: "JOIN" })
      );

      dispatch(setConnectionStatus("connected"));
    })
    ?.catch((error: any) => {
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
    });
};

export const getStompClient = () => {
  return stompClient;
};
