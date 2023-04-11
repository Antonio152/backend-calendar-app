import { Router } from "express";
import { check } from "express-validator";
import { validatefields } from "../middlewares/validateFields";
import {
  createUser,
  loginUser,
  renewToken,
} from "../controller/authController";
import { validarJWT } from "../middlewares/validar-jwt";
const router = Router();

// ! ****** Route /api/auth


// * This route is for new users
router.post(
  "/new",
  [
    // ! Middlewares
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validatefields
  ],
  createUser
);

// * This route is for login
router.post("/",[
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validatefields
] ,loginUser);

// * This route is for renew token
router.get("/renew",validarJWT ,renewToken);

export default router;
