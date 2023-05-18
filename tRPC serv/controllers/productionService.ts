import { Principal } from "..";
import { Iproduction, production } from "../models/models";
import {
  createProductionType,
  PatchProductionType,
} from "../routes/productionRouter";
class ProductionService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Iproduction[] | null = await production.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: createProductionType) {
    if (!user) return;
    const res: Iproduction | null = await production.create({
      productId: data.productId,
      isPrimary: data.isPrimary,
      techCartId: data.techCartId,
      year: data.year,
      isPlan: false,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchProductionType) {
    if (!user) return;
    const { isPrimary, prodId, productId, techCartId, year } = data;
    await production.update(
      {
        isPrimary,
        productId,
        techCartId,
        year,
      },
      { where: { id: prodId } }
    );
    const res: Iproduction | null = await production.findOne({
      where: { id: prodId },
    });
    return res;
  }
  async delete(user: Principal | undefined, data: { prodId: number }) {
    if (!user) return;
    return await production.destroy({ where: { id: data.prodId } });
  }

  async setIsPlan(
    user: Principal | undefined,
    data: { prodId: number; isPlan: boolean }
  ) {
    if (!user) return;
    await production.update(
      { isPlan: data.isPlan },
      { where: { id: data.prodId } }
    );
    const res: Iproduction | null = await production.findOne({
      where: { id: data.prodId },
    });
    return res;
  }
}
export default new ProductionService();
