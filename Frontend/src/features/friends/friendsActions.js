import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../lib/authApi";

// import {
//   setFriends,
//   setPendingFriendsInvitations,
//   setOnlineUsers,
// } from "./friendsSlice";

// --- Async Thunks ---

export const sendFriendInvitation = createAsyncThunk(
  "friends/sendFriendInvitation",
  async ({ data, closeDialogHandler }, { rejectWithValue }) => {
    try {
      const response = await api.sendFriendInvitaion(data);
      if (closeDialogHandler) closeDialogHandler();
      return response;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data || error.message || "Something went wrong",
        status: error.response?.status || null,
      });
    }
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
