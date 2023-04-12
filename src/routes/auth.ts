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
    check("name", "El nombre es requerido").not().isEmpty(),
    check("email", "El email es requerido").isEmail(),
    check("password", "La contraseña es requerida").isLength({ min: 6 }),
    validatefields
  ],
  createUser
);

// * This route is for login
router.post("/",[
    check("email", "El email es requerido").isEmail(),
    check("password", "La contraseña es requerida").isLength({ min: 6 }),
    validatefields
] ,loginUser);

// * This route is for renew token
router.get("/renew",validarJWT ,renewToken);

export default router;
