import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setPendingFriendsInvitations: (state, action) => {
      state.pendingFriendsInvitations = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setFriends, setPendingFriendsInvitations, setOnlineUsers } =
  friendsSlice.actions;
export default friendsSlice.reducer;
