import { Principal } from "..";
import { Iproduction, Isale, production, sale } from "../models/models";
import { createProductionType } from "../routes/productionRouter";
import { createSaleType } from "../routes/saleRouter";
class SaleService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Isale[] | null = await sale.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: createSaleType) {
    if (!user) return;
    const res: Isale | null = await sale.create({
      amount: data.amount,
      date: data.date,
      price: data.price,
      userId: user.sub,
      productionId: data.productionId,
    });
    return res;
  }
}
export default new SaleService();
