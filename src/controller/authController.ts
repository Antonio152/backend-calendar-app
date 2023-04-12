import bcrypt from "bcryptjs";
import { Response, Request } from "express";
import { ILoginUser, INewUser } from "./types/authTypes";
import { Umodel } from "../models/UserModel";
import { generateJWT } from "../jwt/jwt";
import { IPayloadJWT } from "../middlewares/types/validar-jwtTypes";

export const createUser = async (req: Request, res: Response):Promise<Response> => {
  const { email, password } = req.body as INewUser;

  try {
    let NewUser = await Umodel.findOne({ email });

    if (NewUser) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese email",
      });
    }

    NewUser = new Umodel(req.body as INewUser);

    // ! Encrypt password
    const salt = bcrypt.genSaltSync();
    NewUser.password = bcrypt.hashSync(password, salt);

    // ! Save user in database
    await NewUser.save();

    // ! Generate JWT
    const token = await generateJWT(NewUser.id,NewUser.name)
    
    return res.status(201).json({
      ok: true,
      uid: NewUser.id,
      name: NewUser.name,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... contacte al administrador",
    });
  }
};

export const loginUser = async(req: Request, res: Response):Promise<Response> => {
  const { email, password } = req.body as ILoginUser;

  try {
    let LoginUser = await Umodel.findOne({ email });

    if (!LoginUser) {
      return res.status(400).json({
        ok: false,
        msg: "No se encontró un usuario con ese email",
      });
    }

    // ! Confirm password
    const validPassword = bcrypt.compareSync(password, LoginUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    // ! Generate JWT
    const token = await generateJWT(LoginUser.id,LoginUser.name)

    return res.status(200).json({
      ok: true,
      uid: LoginUser.id,
      name: LoginUser.name,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... contacte al administrador",
    });
  }

};

export const renewToken = async(req: Request, res: Response):Promise<void> => {
  const { uid, name } = req.body as IPayloadJWT;
  const token = await generateJWT(uid,name)

  res.status(200).json({
    ok: true,
    uid,
    name,
    token
  });
};
