import express from "express";
import authController from "../controllers/authentication/authControllers.js";
import Joi from "joi";
import validator from "express-joi-validation";

const router = express.Router();

//for validating the data sent to the routes we will use joi and express-joi-validation
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$"))
    .message(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required(),
  email: Joi.string().email().required(),
})
  .required()
  .min(1);

const loginSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$"))
    .message(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required(),
  email: Joi.string().email().required(),
})
  .required()
  .min(1);

//create validator instance
const validate = validator.createValidator({});

router.post(
  "/register",
  validate.body(registerSchema),
  authController.postRegister
);
router.post("/login", validate.body(loginSchema), authController.postLogin);
export default router;
