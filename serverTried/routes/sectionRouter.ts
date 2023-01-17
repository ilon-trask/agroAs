import Router from "express";
const router = Router();
import SectionService from "../controllers/SectionService";

router.get("/", (req, res) => {
  const data = SectionService.getAll();
  data.then((result) => res.json(result));
});

export default router;
