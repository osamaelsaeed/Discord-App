import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env.js";
const postLogin = async (req, res) => {
  try {
    //extracting the body variables
    const { email, password } = req.body;

    //check in db if user with this email found
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      // send new token
      //create the jwt token for the user to be able to access protected routes
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        ENV.TOKEN_SECRET_KEY,
        {
          //this token will expire in 24h
          expiresIn: "24h",
        }
      );
      return res.status(200).json({
        userDetails: {
          email: user.email,
          token: token,
          username: user.username,
        },
      });
    }
    return res.status(400).send("Invalid credentials, Please try again");
  } catch (error) {
    return res.status(500).send("Something went wrong, Please try again");
  }
  res.send("login route");
};

export default postLogin;
