import { useRef, useEffect } from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./MessagesHeader";
import { useSelector } from "react-redux";
import DUMMY_MESSAGES from "./DummyMessages";
import Message from "./Message";
const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <MainContainer>
      <MessagesHeader name={chosenChatDetails?.name} />
      {DUMMY_MESSAGES.map((message, index) => {
        return (
          <Message
            key={message._id}
            content={message.content}
            username={message.author.username}
            sameAuthor={message.sameAuthor}
            date={message.date}
            sameDay={message.sameDay}
          />
        );
      })}
    </MainContainer>
  );
};

export default Messages;
