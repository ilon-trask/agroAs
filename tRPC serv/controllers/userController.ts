import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError";
import user from "../models/models";

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Не коректний email або пароль"));
    }
    const candidate = await user.findOne({ where: { email } });
    console.log(candidate);
    if (candidate) {
      return next(ApiError.badRequest("Користувач з таким email уже існує"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const User = await user.create({ email, role, password: hashPassword });
    // const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(User.id, User.email, User.role);

    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const User = await user.findOne({ where: { email } });
    if (!User) {
      return next(ApiError.internal("Такого користувача нема"));
    }
    let comparePassword = bcrypt.compareSync(password, User.password);
    if (!comparePassword) {
      return next(ApiError.internal("Такого користувача нема"));
    }
    const token = generateJwt(User.id, User.email, User.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const token = generateJwt(req.User.id, req.User.email, req.User.role);
    res.json({ token });
  }
}
module.exports = new UserController();
