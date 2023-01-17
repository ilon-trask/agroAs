import { log } from "console";
import Router, { Request, Response } from "express";
const router = Router();
import TractorService from "../controllers/TractorService";

router.post("/", (req, res) => {
  try {
    let data = req.body;
    const result = TractorService.create(data);
    result.then((result) => res.json(result));
  } catch (error) {
    res.status(404).json(error);
  }
});
router.get("/", (req, res) => {
  try {
    let tractors = TractorService.getAll();
    tractors.then((result) => res.json(result));
  } catch (error) {
    res.status(404).json(error);
  }
});
// router.delete("/", TractorController.delete);
// router.patch("/", TractorController.patchCart);

export default router;
