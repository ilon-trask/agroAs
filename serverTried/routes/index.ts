import express from "express";
const router = express();
import userRouter from "./userRouter";
import techCartRouter from "./techCartRouter";
import sectionRouter from "./sectionRouter";
import tractorRouter from "./tractorRouter";
import machineRouter from "./machineRouter";
import operRouter from "./operRouter";

router.use("/user", userRouter);
router.use("/cart", techCartRouter);
router.use("/oper", operRouter);
router.use("/sec", sectionRouter);
router.use("/tractor", tractorRouter);
router.use("/machine", machineRouter);

export default router;
