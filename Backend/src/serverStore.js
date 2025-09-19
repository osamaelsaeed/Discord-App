export const connectedUsers = new Map();

export const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  console.log(connectedUsers);
};

export const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("user with id", socketId, "disconnected");
    console.log("new connected users", connectedUsers);
  }
};
