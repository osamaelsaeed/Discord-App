import User from "../../models/userModel.js";
import FriendInvitation from "../../models/friendInvitation.js";
export const postInvite = async (req, res) => {
  try {
    const { targetMailAddress } = req.body;
    const { userId, email } = req.user;

    //check if friend that we would like to invite is not user

    if (email.toLowerCase() === targetMailAddress.toLowerCase()) {
      return res.status(409).json({
        success: false,
        message: "Sorry, you cannot become friends with yourself!",
      });
    }

    // check if there is a user with this email
    const targetUser = await User.findOne({
      email: targetMailAddress.toLowerCase(),
    });

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: `Friend with email ${targetMailAddress} not found. Please check the email address again!`,
      });
    }

    //check if invitation is already sent
    const invitationAlreadyReceived = await FriendInvitation.findOne({
      senderId: userId,
      receiverId: targetUser._id,
    });

    if (invitationAlreadyReceived) {
      return res.status(409).json({
        success: false,
        message: "Invitation has been already sent!",
      });
    }

    //check if user we would like to invite is already our friend
    const usersAlreadyFriends = targetUser.friends.find(
      (friendId) => friendId.toString() === userId.toString()
    );

    if (usersAlreadyFriends) {
      return res.status(409).json({
        success: false,
        message: "Friend already added please check friend list",
      });
    }

    //sasve friend to db
    const newInvitation = await FriendInvitation.create({
      senderId: userId,
      receiverId: targetUser._id,
    });

    // if sent saved to db updated friends invitiaions should appear immediatly for both sender and reciver for online users

    return res.status(200).json({
      success: true,
      message: "Invitation sent successfully!",
    });
  } catch (error) {
    console.error("Invite error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong on the server",
    });
  }
};
