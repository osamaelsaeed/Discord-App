import { connectedUsers, addNewConnectedUser } from "../serverStore.js";
import {
  updateFriendsPendingInvitations,
  updateFriends,
} from "./updates/friends.js";
export const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  const userId = userDetails.userId;
  for (const [sockId, user] of connectedUsers.entries()) {
    if (user.userId === userId) {
      connectedUsers.delete(sockId);
      io.sockets.sockets.get(sockId)?.disconnect(true);
    }
  }

  addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  //update friends pending invitation initially at start
  updateFriendsPendingInvitations(userId);

  //update friends list initially at start
  updateFriends(userId);
};
