import store from "../../../store/store";
import { setMessages } from "../../../features/chat/chatSlice";
export const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;
  //find id of user from token and id from active conversation opend in browser
  const receiverUserId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().auth.userDetails.userDetails._id;
  if (receiverUserId && userId) {
    const usersInConversation = [receiverUserId, userId];
    updateChatHistoryIfSameConversationActive({
      participants,
      usersInConversation,
      messages,
    });
  }
};
const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInConversation,
  messages,
}) => {
  const result = participants.every(function (participantId) {
    return usersInConversation.includes(participantId);
  });
  if (result) {
    store.dispatch(setMessages(messages));
  }
};
