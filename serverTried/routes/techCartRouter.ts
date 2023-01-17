import Router from "express";
const router = Router();
import TechCartService from "../controllers/TechCartService";

interface Idata {
  id: number;
  nameCart: string;
  area: number;
  salary: number;
  priceDiesel: number;
  price?: number;
}

router.post("/", (req, res) => {
  try {
    const data = req.body;
    const cart = TechCartService.create(data);
    cart.then((data) => res.json(data));
  } catch (error) {
    res.status(404).json(error);
  }
});
router.get("/", (req, res) => {
  try {
    const cart: Promise<Array<Idata>> = TechCartService.getAll();
    cart.then((data) => {
      data.sort((a, b) => a.id - b.id);
      console.log(data);
      return res.json(data);
    });
  } catch (error) {
    res.status(404).json(error);
  }
});
router.patch("/", (req, res) => {
  try {
    const data = req.body;
    const cart = TechCartService.patchCart(data);
    cart.then((data) => res.json(data));
  } catch (error) {
    res.status(404).json(error);
  }
});
router.delete("/", (req, res) => {
  try {
    const { id } = req.body;
    TechCartService.delete(id);
    res.json("deleted");
  } catch (error) {
    res.status(404).json(error);
  }
});

export default router;
