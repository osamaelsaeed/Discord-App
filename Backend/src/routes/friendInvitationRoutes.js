import express from "express";
import Joi from "joi";
import validator from "express-joi-validation";
import verifyToken from "../middlewares/authMiddleware.js";
import * as friendInvitationControllers from "../controllers/friendInvitation/friendInvitationControllers.js";

const router = express.Router();

const postInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});

const validate = validator.createValidator({});

router.post(
  "/invite",
  verifyToken,
  validate.body(postInvitationSchema),
  friendInvitationControllers.postInvite
);

export default router;
