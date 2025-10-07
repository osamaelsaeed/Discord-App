import mongoose, { Schema } from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

export default mongoose.model("Conversation", conversationSchema);
