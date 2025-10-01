import { styled } from "@mui/material";
import PendingInvitationsListItem from "./PendingInvitationsListItem";
import { useSelector } from "react-redux";
// import { fetchPendingFriendsInvitations } from "../../features/friends/friendsActions";
// import { useEffect } from "react";
const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});
const PendingInvitationsList = () => {
  // const dispatch = useDispatch();
  const pendingInvitations = useSelector(
    (state) => state.friends.pendingFriendsInvitations
  );

  // useEffect(() => {
  //   dispatch(fetchPendingFriendsInvitations()); // ✅ fetch from backend
  // }, [dispatch]);
  return (
    <MainContainer>
      {pendingInvitations.map((f) => (
        <PendingInvitationsListItem
          key={f._id}
          id={f._id}
          username={f.senderId.username}
          email={f.senderId.email}
        />
      ))}
    </MainContainer>
  );
};

export default PendingInvitationsList;
