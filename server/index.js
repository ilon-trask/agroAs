const fs = require("fs");
require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middlewaire/ErrorHandlingMiddleware");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler);

app.get("/", (req, res) => {
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
