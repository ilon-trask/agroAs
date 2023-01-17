import Router from "express";
const router = Router();
import MachineService from "../controllers/MachineService";

router.post("/", (req, res) => {
  try {
    let data = req.body;
    console.log(data);

    const result = MachineService.create(data);
    result.then((result) => res.json(result));
  } catch (error) {
    res.status(404).json(error);
  }
});
router.get("/", (req, res) => {
  try {
    const data = MachineService.getAll();
    data.then((data) => res.json(data));
  } catch (error) {
    res.status(404).json(error);
  }
});
// router.delete("/", TractorController.delete);
// router.patch("/", TractorController.patchCart);

export default router;
