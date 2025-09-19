import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;
  console.log("🔑 Incoming socket token:", token);

  if (!token) {
    console.error("❌ No token provided in handshake.auth");
    return next(new Error("NOT_AUTHORIZED"));
  }

  try {
    const decodedToken = jwt.verify(token, ENV.TOKEN_SECRET_KEY);
    socket.user = decodedToken; // attach user info to socket
    return next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return next(new Error("NOT_AUTHORIZED"));
  }
};
export default verifyTokenSocket;
