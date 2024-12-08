import React, { useState, useEffect, createContext } from "react";
import { socket } from "./socket";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
      setIsConnected(false);
    });

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
