import {
  aggregate,
  Itech_cart,
  Itech_operation,
  tech_cart,
  tech_operation,
} from "../models/models";

import { getOper, prope, prope2 } from "./OperService";

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

  let sum = 0;
  let res: { carts: Itech_cart[]; opers: Itech_operation[]; props: prope[] };

  carts.sort((a, b) => a.id! - b.id!);
  for (let i = 0; i < carts.length; i++) {
    sum = 0;
    let el = carts[i];

    let { opers, props } = await getOper(el.id!);

    if (opers) {
      opers.forEach((el) => {
        sum +=
          el.costMaterials! ||
          el.costServices! ||
          el.costTransport! ||
          +el.costCars! +
            +el.costFuel! +
            +el.costHandWork! +
            +el.costMachineWork! ||
          el.costHandWork!;
      });

      el.totalCost = sum;
    }
    res = { carts, opers, props };
  }
  //@ts-ignore
  return res;
}

class TechCartService {
  async create(data: Idata) {
    const { nameCart, area, salary, priceDiesel, totalCost = 0 } = data;
    console.log();

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
    return getCart();
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
