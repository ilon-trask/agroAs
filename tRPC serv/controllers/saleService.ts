import { Principal } from "..";
import { income, Iproduction, Isale, production, sale } from "../models/models";
import { createProductionType } from "../routes/productionRouter";
import { createSaleType, PatchSaleType } from "../routes/saleRouter";
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
      isPlan: false,
      userId: user.sub,
      productionId: data.productionId,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchSaleType) {
    if (!user) return;
    await sale.update(
      {
        amount: data.amount,
        date: data.date,

        price: data.price,
        productionId: data.productionId,
      },
      { where: { id: data.saleId } }
    );
    const res: Isale | null = await sale.findOne({
      where: { id: data.saleId },
    });
    return res;
  }
  async delete(user: Principal | undefined, data: { saleId: number }) {
    if (!user) return;
    const res = await sale.destroy({ where: { id: data.saleId } });
    await income.destroy({ where: { saleId: data.saleId } });
    return res;
  }
  async setIsPlan(
    user: Principal | undefined,
    data: { saleId: number; isPlan: boolean }
  ) {
    if (!user) return;
    await sale.update({ isPlan: data.isPlan }, { where: { id: data.saleId } });
    const res = await sale.findOne({ where: { id: data.saleId } });
    return res;
  }
}
export default new SaleService();
