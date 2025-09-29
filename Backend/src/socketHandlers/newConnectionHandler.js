import { connectedUsers, addNewConnectedUser } from "../serverStore.js";
export const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  console.log(userDetails);
  const userId = userDetails.userId;
  for (const [sockId, user] of connectedUsers.entries()) {
    if (user.userId === userId) {
      console.log(`🔄 Removing old socket for user ${userId}: ${sockId}`);
      connectedUsers.delete(sockId);
      io.sockets.sockets.get(sockId)?.disconnect(true);
    }
  }

  addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });
};
