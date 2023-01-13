const Router = require("express");
const router = Router();
const TractorController = require("../controllers/TractorController");

router.post("/", TractorController.create);
router.get("/", TractorController.getAll);
// router.delete("/", TractorController.delete);
// router.patch("/", TractorController.patchCart);

module.exports = router;
