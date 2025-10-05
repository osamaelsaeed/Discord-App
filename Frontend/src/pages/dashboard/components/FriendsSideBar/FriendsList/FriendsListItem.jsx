import { Button, Typography } from "@mui/material";
import Avatar from "../../../../../components/shared/Avatar";
import OnlineIndicator from "./OnlineIndicator";
import { useDispatch } from "react-redux";
import {
  chatTypes,
  setChosenChatDetails,
} from "../../../../../features/chat/chatSlice";
const FriendsListItem = ({ id, username, isOnline }) => {
  const dispatch = useDispatch();
  const handleChooseActiveConversation = () => {
    dispatch(
      setChosenChatDetails({
        chatDetails: { id, name: username },
        chatType: chatTypes.DIRECT,
      })
    );
  };

  return (
    <Button
      onClick={handleChooseActiveConversation}
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Avatar username={username} />
      <Typography
        style={{
          marginLeft: "7px",
          fontWeight: 700,
          color: "#8e9297",
        }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

export default FriendsListItem;
