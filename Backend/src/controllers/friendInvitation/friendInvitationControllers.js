import User from "../../models/userModel.js";
import FriendInvitation from "../../models/friendInvitation.js";
import {
  updateFriendsPendingInvitations,
  updateFriends,
} from "../../socketHandlers/updates/friends.js";
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
    updateFriendsPendingInvitations(targetUser._id.toString());
    //send pending invitations to the reciever with socket
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

export const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const invitation = await FriendInvitation.findById(id);
    if (!invitation) {
      return res.status(404).json({
        success: false,
        message: `Invitation with id ${id} not found. Please check the id again!`,
      });
    }

    const { senderId, receiverId } = invitation;

    //add friends to both users
    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const recieverUser = await User.findById(receiverId);
    recieverUser.friends = [...recieverUser.friends, senderId];

    await senderUser.save();
    await recieverUser.save();

    //delete invtitation
    await FriendInvitation.findByIdAndDelete(id);

    // update list of friends if the users are online
    updateFriends(senderId.toString());
    updateFriends(receiverId.toString());

    // update list of pending invitaion of the reciever
    updateFriendsPendingInvitations(receiverId.toString());

    return res.status(200).json({
      success: true,
      message: "Invitation Accepted!",
    });
  } catch (error) {
    console.error("Accept invitation error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong on the server",
    });
  }
};

export const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    //remove invitation from friend invitation collection
    const invitationExists = await FriendInvitation.exists({ _id: id });
    if (!invitationExists) {
      return res.status(404).json({
        success: false,
        message: `Invitation with id ${id} not found. Please check the id again!`,
      });
    }

    await FriendInvitation.findByIdAndDelete(id);
    // update pending invitations
    updateFriendsPendingInvitations(userId);
    return res.status(200).json({
      success: true,
      message: "Invitation rejected!",
    });
  } catch (error) {
    console.error("Reject invitation error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong on the server",
    });
  }
};
