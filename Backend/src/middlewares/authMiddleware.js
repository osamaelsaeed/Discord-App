import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("a token is required for authentication");
  }

  try {
    //remove the word Bearer to get token
    token = token.replace(/^Bearer\s+/, "");
    //decode the token using our secret
    const decoded = jwt.verify(token, ENV.TOKEN_SECRET_KEY);
    //if error happened during the verify decoding it will go to catch block
    //if succeced the decoded pay load will include for example
    //     {
    //   "id": "123",
    //   "email": "test@example.com",
    //   "role": "admin",
    //   "iat": 1694284472,
    //   "exp": 1694288072
    // }
    //that is why we make the new field req.user that will have this payload
    req.user = decoded;

    //to proceed if success
    return next();
  } catch (error) {
    console.log("error verifying token", error);
    return res.status(401).send("Invalid token");
  }
};

export default verifyToken;
