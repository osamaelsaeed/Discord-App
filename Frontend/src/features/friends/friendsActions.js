import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../lib/authApi";
import toast from "react-hot-toast";

// import {
//   setFriends,
//   setPendingFriendsInvitations,
//   setOnlineUsers,
// } from "./friendsSlice";

// --- Async Thunks ---
export const sendFriendInvitation = createAsyncThunk(
  "friends/sendFriendInvitation",
  async ({ data, closeDialogHandler }) => {
    const response = await api.sendFriendInvitaion(data);
    console.log(response); // should always be an object

    if (response.success) {
      toast.success(response.message);
      if (closeDialogHandler) closeDialogHandler();
    } else {
      toast.error(response.message || "Something went wrong");
    }

    return response;
  }
);

// export const acceptFriendInvitation = createAsyncThunk(
//   "friends/acceptFriendInvitation",
//   async (data) => {
//     const response = await api.acceptFriendInvitation(data);

//     if (response.error) {
//       toast.error(
//         response.exception?.response?.data || "Failed to accept invitation"
//       );
//     } else {
//       toast.success("Invitation accepted!");
//     }

//     return response;
//   }
// );

// export const rejectFriendInvitation = createAsyncThunk(
//   "friends/rejectFriendInvitation",
//   async (data) => {
//     const response = await api.rejectFriendInvitation(data);

//     if (response.error) {
//       toast.error(
//         response.exception?.response?.data || "Failed to reject invitation"
//       );
//     } else {
//       toast.success("Invitation rejected!");
//     }

//     return response;
//   }
// );

// export const fetchFriends = () => async (dispatch) => {
//   const response = await api.getFriends();
//   if (!response.error) dispatch(setFriends(response));
// };

// export const fetchPendingFriendsInvitations = () => async (dispatch) => {
//   const response = await api.getPendingFriendsInvitations();
//   if (!response.error) dispatch(setPendingFriendsInvitations(response));
// };

// export const fetchOnlineUsers = () => async (dispatch) => {
//   const response = await api.getOnlineUsers();
//   if (!response.error) dispatch(setOnlineUsers(response));
// };
