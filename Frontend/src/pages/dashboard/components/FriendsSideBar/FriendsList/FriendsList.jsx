import { styled } from "@mui/material";
import FriendsListItem from "./FriendsListItem";
const DUMMY_FRIENDS = [
  {
    id: 1,
    username: "Mahmoud",
    isOnline: true,
  },
  {
    id: 2,
    username: "Ahmed",
    isOnline: false,
  },
  {
    id: 3,
    username: "Osama",
    isOnline: false,
  },
];

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});
const FriendsList = () => {
  return (
    <MainContainer>
      {DUMMY_FRIENDS.map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

export default FriendsList;
