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

export const getActiveConnections = (userId) => {
  const activeConnections = [];
  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      //key is the socket id we need to get all devices socket id for this user to emit event to all the devices
      activeConnections.push(key);
    }
  });
  return activeConnections;
};

export const getOnlineUsers = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};
