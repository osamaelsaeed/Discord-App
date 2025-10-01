import axiosInstance from "./axios";
import { logout } from "../components/shared/utils/auth";

export const login = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  console.log(response);
  return response.data;
};

export const register = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  console.log(response);
  return response.data;
};

export const sendFriendInvitaion = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/friend-invitation/invite",
      data
    );
    return response.data; // always return payload
  } catch (exception) {
    checkResponseCode(exception);

    // normalize error to always include success + message
    return {
      success: false,
      message:
        exception.response?.data?.message ||
        exception.message ||
        "Something went wrong",
    };
  }
};

export const acceptFriendInvitation = async (data) => {
  try {
    return await axiosInstance.post("/friend-invitation/accept", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async (data) => {
  try {
    return await axiosInstance.post("/friend-invitation/reject", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};
