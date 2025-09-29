import mongoose, { Schema } from "mongoose";

const friendInvitationSchema = new mongoose.Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const FriendInvitation = mongoose.model(
  "FriendInvitation",
  friendInvitationSchema
);

export default FriendInvitation;
