import {
  aggregate,
  Itech_cart,
  tech_cart,
  tech_operation,
} from "../models/models";

export interface Idata {
  id?: number;
  nameCart: string;
  area: number;
  totalCost?: number;
  salary: number;
  priceDiesel: number;
  userId?: number;
}

async function getCart() {
  const carts: Itech_cart[] = await tech_cart.findAll();
  return carts;
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

    return getCart();
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
    const cart = await tech_cart.findOne({ where: { id: id } });
    if (!cart) throw new Error("");
    const Oper = await tech_operation.findAll({ where: { techCartId: id } });

    Oper.forEach(async (el) => {
      const costMechanical = await aggregate.update(
        { pricePerHourServicePersonnel: Math.round(cart.salary / 176) },
        { where: { techOperationId: el.id } }
      );
    });

    return getCart();
  }

  delete(id: number) {
    const techCart = tech_cart.destroy({ where: { id: id } });
    return getCart();
  }
}

export default new TechCartService();
