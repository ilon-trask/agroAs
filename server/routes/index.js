const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const techCartRouter = require("./techCartRouter");
const sectionRouter = require("./sectionRouter");
const tractorRouter = require("./tractorRouter");
const machineRouter = require("./machineRouter");

router.use("/user", userRouter);
router.use("/cart", techCartRouter);
router.use("/sec", sectionRouter);
router.use("/tractor", tractorRouter);
router.use("/machine", machineRouter);

module.exports = router;
