const Router = require("express");
const router = Router();
const MachineController = require("../controllers/MachineController");

router.post("/", MachineController.create);
router.get("/", MachineController.getAll);
// router.delete("/", TractorController.delete);
// router.patch("/", TractorController.patchCart);

module.exports = router;
