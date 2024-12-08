import { io } from "socket.io-client";

const io = socketIo(server, {
  cors: {
    origin: "https://flrou.site",
    credentials: true,
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});
// export const socket = io("http://localhost:9000");
