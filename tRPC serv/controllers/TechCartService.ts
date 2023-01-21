import { tech_cart } from "../models/models";

interface Idata {
  id?: number;
  nameCart: string;
  area: number;
  totalCost?: number;
  salary: number;
  priceDiesel: number;
  userId?: number;
}

class TechCartService {
  async create(data: Idata) {
    const { nameCart, area, salary, priceDiesel, totalCost = 0 } = data;
    const techCart = await tech_cart.create({
      nameCart,
      area,
      totalCost,
      salary,
      priceDiesel,
    });

    return techCart;
  }
  async getAll() {
    const techCart = await tech_cart.findAll();
    return techCart;
  }
  async patchCart(data: Idata) {
    const { id, nameCart, area, salary, priceDiesel } = data;
    const techCart = await tech_cart.update(
      { nameCart, area, salary, priceDiesel },
      { where: { id: id } }
    );
    return techCart;
  }

  delete(id: number) {
    const techCart = tech_cart.destroy({ where: { id: id } });
    return techCart;
  }
}

export = new TechCartService();
