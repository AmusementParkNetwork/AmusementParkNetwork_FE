import { io } from "socket.io-client";

export const socket = io("https://api.flrou.site", {
  withCredentials: true,
  transports: ["websocket"],
});
// export const socket = io("http://localhost:9000");
