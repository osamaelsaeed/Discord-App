import { styled } from "@mui/material";
import AddFriendsButton from "./AddFriendsButton";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./FriendsList/FriendsList";
import PendingInvitaionsList from "./PendingInvitationsList/PendingInvitationsList";
const MainContainer = styled("div")({
  width: "224px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#2F3136",
});
const FriendsSideBar = () => {
  return (
    <MainContainer>
      <AddFriendsButton />
      <FriendsTitle title="Private Messages" />
      <FriendsList />
      <FriendsTitle title="Invitaions" />
      <PendingInvitaionsList />
    </MainContainer>
  );
};

export default FriendsSideBar;
