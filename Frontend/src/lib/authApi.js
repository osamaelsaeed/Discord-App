import { axiosInstance } from "./axios";

//public routes
export const login = async (data) => {
  try {
    return await axiosInstance.post("/auth/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  try {
    return await axiosInstance.post("/auth/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
