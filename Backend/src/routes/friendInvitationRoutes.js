import express from "express";
import Joi from "joi";
import validator from "express-joi-validation";
import verifyToken from "../middlewares/authMiddleware.js";
import * as friendInvitationControllers from "../controllers/friendInvitation/friendInvitationControllers.js";

const router = express.Router();

const postInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});

const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

const validate = validator.createValidator({});

router.post(
  "/invite",
  verifyToken,
  validate.body(postInvitationSchema),
  friendInvitationControllers.postInvite
);

router.post(
  "/accept",
  verifyToken,
  validate.body(inviteDecisionSchema),
  friendInvitationControllers.postAccept
);

router.post(
  "/reject",
  verifyToken,
  validate.body(inviteDecisionSchema),
  friendInvitationControllers.postReject
);

export default router;
