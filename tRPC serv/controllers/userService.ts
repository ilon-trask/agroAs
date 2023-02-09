// import bcrypt from "bcrypt";
// import { Request } from "express";
// import jwt from "jsonwebtoken";
// import ApiError from "../error/ApiError";
// import { user } from "../models/models";
// import { getHTTPStatusCodeFromError } from "@trpc/server/http";
// import { TRPCError } from "@trpc/server";

// const EmailOrPassErr: TRPCError = {
//   name: "TRPCError",
//   code: "BAD_REQUEST",
//   message: "Не коректний Email або пароль",
// };

// const userExist: TRPCError = {
//   name: "TRPCError",
//   code: "BAD_REQUEST",
//   message: "Користувач з таким email уже існує",
// };
// const userDontExist: TRPCError = {
//   name: "TRPCError",
//   code: "BAD_REQUEST",
//   message: "Такого користувача не існує",
// };
// const incorrectPass: TRPCError = {
//   name: "TRPCError",
//   code: "BAD_REQUEST",
//   message: "Неправельний пароль",
// };

// const generateJwt = (id: number, email: string, role: number) => {
//   return jwt.sign({ id, email, role }, process.env.SECRET_KEY!, {
//     expiresIn: "24h",
//   });
// };

// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   "https://bicofnobkczquxvztyzl.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY29mbm9ia2N6cXV4dnp0eXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ5MjQ5MTIsImV4cCI6MTk5MDUwMDkxMn0.jEd8pHzVzlqZxf-ioqC_QKoda_xqfD2nh4niJ1mea9s"
// );

// class UserController {
//   async registration(email: string, password: string, role: number | null) {
//     // console.log(password);
//     // console.log(email);

//     const { data, error } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     });
//     console.log(error);

//     if (error) return error;
//     console.log(data);

//     return data;
//     // if (!role) role = 1;
//     // if (!email || !password) return EmailOrPassErr;
//     // const candidate = await user.findOne({ where: { email } });
//     // if (candidate) return userExist;

//     // const hashPassword = await bcrypt.hash(password, 5);
//     // const User = await user.create({ email, role, password: hashPassword });
//     // // const basket = await Basket.create({ userId: user.id });
//     // const token = generateJwt(User.id, User.email, User.role);
//     // console.log(token);

//     // return token;
//   }
//   async login(email: string, password: string) {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     });
//     console.log(error);

//     if (error) return error;
//     console.log(data);
//     return data;
//     // const User = await user.findOne({ where: { email } });
//     // if (!User) return userDontExist;

//     // let comparePassword = bcrypt.compareSync(password, User.password);
//     // if (!comparePassword) return incorrectPass;

//     // const token = generateJwt(User.id, User.email, User.role);
//     // return token;
//   }
//   // async check(req, res, next) {
//   //   const token = generateJwt(req.User.id, req.User.email, req.User.role);
//   //   return token;
//   // }
// }
// export default new UserController();
