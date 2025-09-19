import { Server } from "socket.io";
import authSocket from "./middlewares/authSocket.js";
import { newConnectionHandler } from "./socketHandlers/newConnectionHandler.js";
import { disconnectHandler } from "./socketHandlers/disconnectHandler.js";
let io;

export const initSocketServer = (server) => {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });

    io.use((socket, next) => {
      authSocket(socket, next);
    });
    io.on("connection", (socket) => {
      console.log("conn");
      console.log("User connected:", socket.id);
      newConnectionHandler(socket, io);
      socket.on("disconnect", () => {
        disconnectHandler(socket);
      });
    });

    console.log("Socket.IO server initialized");
  }
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.IO not initialized. Call initSocketServer() first."
    );
  }
  return io;
};
