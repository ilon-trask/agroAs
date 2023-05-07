import { Principal } from "..";
import { Iproduction, production } from "../models/models";
import { createProductionType } from "../routes/productionRouter";
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
      userId: user.sub,
    });
    return res;
  }
}
export default new ProductionService();
