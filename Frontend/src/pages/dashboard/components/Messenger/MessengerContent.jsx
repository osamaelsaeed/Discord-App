import { useEffect } from "react";
import { styled } from "@mui/system";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput";
import { getDirectChatHistory } from "../../../../realTimeCommunication/socketConnection";

const Wrapper = styled("div")({
  flexGrow: 1,
});
const MessangerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    //fetch chat history from specific user id
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);
  return (
    <Wrapper>
      <Messages chosenChatDetails={chosenChatDetails} />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessangerContent;
