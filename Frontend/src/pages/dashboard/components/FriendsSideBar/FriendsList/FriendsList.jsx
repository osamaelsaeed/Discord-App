import { styled } from "@mui/material";
import FriendsListItem from "./FriendsListItem";
import { useSelector } from "react-redux";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList = () => {
  const friends = useSelector((state) => state.friends.friends);
  const onlineUsers = useSelector((state) => state.friends.onlineUsers);
  console.log(friends, "Friends");
  console.log(onlineUsers, "Online");

  function checkOnlineUsers(friends, onlineUsers) {
    return friends.map((friend) => ({
      ...friend,
      isOnline: onlineUsers.some((user) => user.userId === friend.id),
    }));
  }

  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map((f) => (
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
