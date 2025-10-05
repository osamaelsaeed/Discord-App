import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
function ChoosenOptionLabel({ name }) {
  name = useSelector((state) => state.chat.chosenChatDetails?.name);
  return (
    <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}>
      {`${name ? `Chosen conversation: ${name}` : ""}`}
    </Typography>
  );
}

export default ChoosenOptionLabel;
