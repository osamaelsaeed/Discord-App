import Message from "../models/message.js";
import Conversation from "../models/conversation.js";
import { updateChatHistory } from "./updates/chat.js";
export const directMessageHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    //create new message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });

    //find if conversation exsit with this two users if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });
    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      //perform and update to sender and reciever if online
      updateChatHistory(conversation._id.toString());
    } else {
      //create new conversation if !conversation
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      //perform and update to sender and reciver if online
      updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};
