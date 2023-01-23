import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError";
import { user } from "../models/models";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { TRPCError } from "@trpc/server";

const EmailOrPassErr: TRPCError = {
  name: "TRPCError",
  code: "BAD_REQUEST",
  message: "Не коректний Email або пароль",
};

const userExist: TRPCError = {
  name: "TRPCError",
  code: "BAD_REQUEST",
  message: "Користувач з таким email уже існує",
};
const userDontExist: TRPCError = {
  name: "TRPCError",
  code: "BAD_REQUEST",
  message: "Такого користувача не існує",
};
const incorrectPass: TRPCError = {
  name: "TRPCError",
  code: "BAD_REQUEST",
  message: "Неправельний пароль",
};

const generateJwt = (id: number, email: string, role: number) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY!, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(email: string, password: string, role: number | null) {
    if (!role) role = 1;
    if (!email || !password) return EmailOrPassErr;
    const candidate = await user.findOne({ where: { email } });
    if (candidate) return userExist;

    const hashPassword = await bcrypt.hash(password, 5);
    const User = await user.create({ email, role, password: hashPassword });
    // const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(User.id, User.email, User.role);
    console.log(token);

    return token;
  }
  async login(email: string, password: string) {
    const User = await user.findOne({ where: { email } });
    if (!User) return userDontExist;

    let comparePassword = bcrypt.compareSync(password, User.password);
    if (!comparePassword) return incorrectPass;

    const token = generateJwt(User.id, User.email, User.role);
    return token;
  }
  // async check(req, res, next) {
  //   const token = generateJwt(req.User.id, req.User.email, req.User.role);
  //   return token;
  // }
}
export default new UserController();
