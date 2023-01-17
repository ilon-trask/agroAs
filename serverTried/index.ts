import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import express, { Express, Response, Request } from "express";
import sequelize from "./db";
// import fileUpload from "express-fileupload";
import router from "./routes/index";
import errorHandler from "./middlewaire/ErrorHandlingMiddleware";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, "static")));
// app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "working" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
