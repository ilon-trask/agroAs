import { tech_cart } from "../models/models";

interface Idata {
  id?: number;
  nameCart: string;
  area: number;
  salary: number;
  priceDiesel: number;
  price?: number;
}

class TechCartService {
  async create(data: Idata) {
    const { nameCart, area, salary, priceDiesel, price = 0 } = data;
    const techCart = await tech_cart.create({
      nameCart,
      area,
      salary,
      priceDiesel,
    });

    return techCart;
  }
  getAll() {
    const techCart = tech_cart.findAll();

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
    // const techOperation = TechOperation.destroy({
    //   where: { techCartId: id },
    // });
    // techOperation.then(() => {
    const techCart = tech_cart.destroy({ where: { id: id } });
    return techCart;
    // techCart.then(res.redirect("http://localhost:3000/"));
    // });
  }
}

export = new TechCartService();
