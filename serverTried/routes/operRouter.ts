import Router from "express";
const router = Router();
import OperService from "../controllers/OperService";
import { Icell } from "../controllers/OperService";

router.post("/:id", (req, res) => {
  try {
    const data = req.body;
    const oper = OperService.createOper(data);
    res.json(oper);
  } catch (e) {
    res.json(e);
  }
});
router.get("/:id", (req, res) => {
  try {
    const data = req.params;
    const id = +data.id;

    const oper = OperService.getOper(id);
    oper.then((data) => {
      let resData = data;
      resData.sort((a, b) => a.id! - b.id!);
      return res.json(resData);
    });
  } catch (e) {
    res.json(e);
  }
});
router.patch("/:id", (req, res) => {
  try {
    const data = req.body;
    const oper = OperService.patchOper(data);
    return res.json(oper);
  } catch (e) {
    return res.json(e);
  }
});
router.delete("/:id/:ind", (req, res) => {
  try {
    const { id, ind } = req.params;
    const [elem, akk] = req.body;
    const oper = OperService.deleteOper(+id, +ind, elem, +akk);
    return res.json(oper);
  } catch (e) {
    return res.json(e);
  }
});

router.get("/:id/:el/:cell", (req, res) => {
  try {
    let { id, el, cell } = req.params;
    const oper = OperService.getProps(+id, +el, cell);
    oper.then((data) => {
      res.json(data);
    });
  } catch (error) {
    res.json(error);
  }
});

export default router;
