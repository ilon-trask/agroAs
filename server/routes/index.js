const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const techCartRouter = require("./techCartRouter");
const sectionRouter = require("./sectionRouter");

router.use("/user", userRouter);
router.use("/cart", techCartRouter);
router.use("/sec", sectionRouter);

module.exports = router;
