import Conversation from "../../models/conversation.js";
import message from "../../models/message.js";
import { getActiveConnections } from "../../serverStore.js";

import { getIO } from "../../socketServer.js";

export const updateChatHistory = async (
  conversationID,
  toSpecifiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationID).populate({
    path: "messages",
    model: "Model",
    populate: {
      path: "author",
      model: "User",
      select: "username _id",
    },
  });

  if (conversation) {
    const io = getIO();
    if (toSpecifiedSocketId) {
      // initial update of chat history
      return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }
    //check if users of this conversation is online
    //if yes emit to them update of messages
    conversation.participants.forEach((userId) => {
      const activeConnections = getActiveConnections(userId.toString());
      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};
