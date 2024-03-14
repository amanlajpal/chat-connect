import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;
export const initializeStompClient = () => {
    let socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);
    stompClient = stompClient
        ?.connect({}) // connect to the server
};

export const getStompClient = () => {
    return stompClient;
};

