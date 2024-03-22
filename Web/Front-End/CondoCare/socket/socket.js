import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
    const socket = useState(io("http://localhost:3000", {transports: ['websocket']}))[0];
    return socket;
}
