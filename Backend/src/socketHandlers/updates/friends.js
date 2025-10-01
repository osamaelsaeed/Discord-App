import User from "../../models/userModel.js";
import FriendInvitation from "../../models/friendInvitation.js";
import { getActiveConnections } from "../../serverStore.js";
import { getIO } from "../../socketServer.js";
export const updateFriendsPendingInvitations = async (userId) => {
  //one user can be logged in multiple device mobile laptop
  //each device will have diff socket id but all has one userId
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username email");

    //find if user with specified userId has active connection
    //because we need to check in store if the user is logged in
    const recieverList = getActiveConnections(userId);

    //emit to all devices of the reciver
    const io = getIO();
    console.log(io, "this is io");

    recieverList.forEach((recieverSocketId) => {
      io.to(recieverSocketId).emit(
        "friends-invitations",
        {
          pendingInvitations: pendingInvitations ? pendingInvitations : [],
        },
        console.log("runned")
      );
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateFriends = async (userId) => {
  try {
    // find active connections of specific id (online users)
    const receiverList = getActiveConnections(userId);

    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username email"
      );

      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            email: f.email,
            username: f.username,
          };
        });

        // get io server instance
        const io = getIO();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit(
            "friends-list",
            {
              friends: friendsList ? friendsList : [],
            },
            console.log("friend list socket emitted")
          );
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
