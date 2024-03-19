import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient: any = null;
const initializeStompClient = async (username: any) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(username, "username - initialize stomp client!");
      let socket = new SockJS("http://localhost:8080/ws");
      console.log(socket, "socket");
      stompClient = Stomp.over(socket);
      // connect to the server
      stompClient?.connect({}, (response:any) => {
        resolve(response);
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
