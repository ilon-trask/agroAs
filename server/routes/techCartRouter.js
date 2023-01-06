const Router = require("express");
const router = new Router();
const TechCartController = require("../controllers/TechCartController");

router.post("/", TechCartController.create);
router.get("/", TechCartController.getAll);
router.delete("/", TechCartController.delete);
router.patch("/", TechCartController.patchCart);
router.post("/:id", TechCartController.createOper);
router.get("/:id", TechCartController.getOper);
router.patch("/:id", TechCartController.patchOper);
router.delete("/:id/:ind", TechCartController.deleteOper);
router.get("/:id/:el/:cell", TechCartController.getProps);

module.exports = router;
