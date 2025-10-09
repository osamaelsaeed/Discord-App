import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env.js";
const postRegister = async (req, res) => {
  try {
    //extracting the body variables
    const { username, email, password } = req.body;

    //check if user exsits
    const userExisits = await User.exists({
      email: email.toLowerCase(),
    });

    if (userExisits) {
      return res.status(409).send("Email already used");
    }

    // if not exsit encrypt password ans save to the db with a salt of 10
    const encryptedPassword = await bcrypt.hash(password, 10);

    //create user document and save it in the db
    //create will automatically save to the db
    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

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

    return res.status(201).json({
      userDetails: {
        email: user.email,
        username: user.username,
        token: token,
        _id: user._id,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default postRegister;
