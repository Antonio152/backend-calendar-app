import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { IPayloadJWT } from "./types/validar-jwtTypes";
export const validarJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // * Read token in header
  const token = req.header("x-token");
  // * Validate if token exists
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }
  // * Validate if token is valid
  try {
    const { uid, name } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED!
    ) as IPayloadJWT;

    // ! TODO: CHECK THIS
    /* 
        req.uid = uid
        req.name = name 
    */
    req.body.uid = uid;
    req.body.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
  return next();
};
