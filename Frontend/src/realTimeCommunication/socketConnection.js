import { io } from "socket.io-client";
import { setPendingFriendsInvitations } from "../features/friends/friendsSlice";
import store from "../store/store";
let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  if (!socket) {
    console.log(jwtToken);
    socket = io("http://localhost:3000", {
      auth: {
        token: jwtToken,
      },
    });

    socket.on("connect", () => {
      console.log("Successfully connected to socket.io server");
      console.log("Socket ID:", socket.id);
    });
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("friends-invitations", (data) => {
      const { pendingInvitations } = data;
      console.log("Received pending invitations:", pendingInvitations);
      store.dispatch(setPendingFriendsInvitations(pendingInvitations));
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket)
    throw new Error(
      "Socket not initialized. Call connectWithSocketServer first."
    );
  return socket;
};
