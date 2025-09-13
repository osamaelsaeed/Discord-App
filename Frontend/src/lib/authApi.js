import axiosInstance from "./axios";

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
