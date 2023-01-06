const Router = require("express");
const router = new Router();
const SectionController = require("../controllers/SectionController");

router.get("/", SectionController.getAll);

module.exports = router;
