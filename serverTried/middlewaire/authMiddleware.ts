import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export = function (req, res, next) {
  if (req.method === "OPTION") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Не авторизований" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Не авторизований" });
  }
};
