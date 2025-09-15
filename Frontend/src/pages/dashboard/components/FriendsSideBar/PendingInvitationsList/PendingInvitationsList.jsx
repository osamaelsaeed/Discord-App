import { styled } from "@mui/material";
import PendingInvitationsListItem from "./PendingInvitationsListItem";
const DUMMY_INVITATIONS = [
  {
    _id: 1,
    senderId: {
      username: "Tarek",
      email: "Tm354@gmail.com",
    },
  },
  {
    _id: 2,
    senderId: {
      username: "Ramy",
      email: "Rm453@gmail.com",
    },
  },
];

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});
const PendingInvitationsList = () => {
  return (
    <MainContainer>
      {DUMMY_INVITATIONS.map((f) => (
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
