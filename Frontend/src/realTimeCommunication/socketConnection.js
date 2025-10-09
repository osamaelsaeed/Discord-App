import { io } from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../features/friends/friendsSlice";
import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../components/shared/utils/chat";
let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  if (!socket) {
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

    socket.on("friends-list", (data) => {
      const { friends } = data;
      console.log("Recieved new friend", friends);

      store.dispatch(setFriends(friends));
    });

    socket.on("online-users", (data) => {
      const { onlineUsers } = data;
      store.dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("direct-chat-history", (data) => {
      updateDirectChatHistoryIfActive(data);
    });
  }
  return socket;
};

export const sendDirectMessage = (data) => {
  console.log(data, "data to server");
  if (!socket) {
    console.error("❌ Cannot send direct message — socket not connected yet");
    return;
  }

  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};

export const getSocket = () => {
  if (!socket)
    throw new Error(
      "Socket not initialized. Call connectWithSocketServer first."
    );
  return socket;
};
