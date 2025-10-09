import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";
import DateSeprator from "./DateSeprator";
const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

// Helper function to format dates
const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: String(date.getMonth() + 1).padStart(2, "0"),
    dd: String(date.getDate()).padStart(2, "0"),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyyy/gi, (matched) => map[matched]);
};

const Messages = ({ chosenChatDetails }) => {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <MainContainer>
      <MessagesHeader name={chosenChatDetails?.name} />
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.author._id === messages[index - 1].author._id;

        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") ===
            convertDateToHumanReadable(
              new Date(messages[index - 1].date),
              "dd/mm/yy"
            );

        return (
          <div key={message._id} style={{ width: "97%" }}>
            {(!sameDay || index === 0) && (
              <DateSeprator
                date={convertDateToHumanReadable(
                  new Date(message.date),
                  "dd/mm/yy"
                )}
              />
            )}
            <Message
              content={message.content}
              username={message.author.username}
              sameAuthor={sameAuthor}
              sameDay={sameDay}
              date={convertDateToHumanReadable(
                new Date(message.date),
                "dd/mm/yy"
              )}
            />
          </div>
        );
      })}
    </MainContainer>
  );
};

export default Messages;
