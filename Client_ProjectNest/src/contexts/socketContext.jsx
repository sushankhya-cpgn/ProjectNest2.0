import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

function useSocket() {
  const socket = useContext(SocketContext);
  if (socket === undefined) throw new Error("socket context used outside");
  return socket;
}

function SocketProvider({ children }) {
  //   const socket = io("http://localhost:8001");
  const socket = useMemo(() => io("http://localhost:8001"), []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketProvider, useSocket };
