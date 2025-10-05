import { styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import WelcomeMessage from "./WelcomeMessage";
import MessengerContent from "./MessengerContent";
const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  marginTop: "48px",
  display: "flex",
});
const Messenger = ({ chosenChatDetails }) => {
  chosenChatDetails = useSelector((state) => state.chat.chosenChatDetails);

  return (
    <MainContainer>
      {!chosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessengerContent chosenChatDetails={chosenChatDetails} />
      )}
    </MainContainer>
  );
};

export default Messenger;
