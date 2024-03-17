import { ToastAction } from "@/components/ui/common/toast";
import { useToast } from "@/components/ui/common/use-toast";
import { setConnectionStatus } from "@/store/connectionStatusSlice";
import { useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient: any = null;
const initializeStompClient = async (username: any) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(username, "username - initialize stomp client!");
      let socket = new SockJS("http://localhost:8080/ws");
      let messageReceived = "Connected to WebSocket server!";
      // const { toast } = useToast();
      // const dispatch = useDispatch();
      console.log(socket, "socket");
      stompClient = Stomp.over(socket);
      // connect to the server
      stompClient?.connect({}, (x) => {
        console.log(x, "x - on connect!");
        console.log("connected to websocket server!");
        // Subscribe to the Public Topic
        console.log("connected to websocket server!");

        function onMessageReceived(payload: any) {
          console.log(payload, "payload - on message received!");
          var message = JSON.parse(payload?.body);
          messageReceived = message;
          resolve(messageReceived);
          if (message.type === "JOIN") {
            console.log(message.sender + " joined!");
          } else if (message.type === "LEAVE") {
            console.log(message.sender + " left!");
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
        stompClient?.subscribe("/topic/public", onMessageReceived);

        // Tell your username to the server
        stompClient.send(
          "/app/chat.addUser",
          {}, // headers
          JSON.stringify({ sender: username, type: "JOIN" })
        );
      }); // headers
    } catch (error) {
      reject(error);
      console.log(error, "Could not connect to WebSocket server.");
    }
  });
};

const getStompClient = () => {
  return stompClient;
};

export { initializeStompClient, getStompClient };
