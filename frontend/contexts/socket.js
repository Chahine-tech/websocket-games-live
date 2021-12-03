import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(
  io("http://localhost:4242")
);
