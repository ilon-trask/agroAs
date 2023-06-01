import { Principal } from "..";
import { financing, Ifinancing } from "../models/models";
import {
  CreateFinancingType,
  PatchFinancingType,
} from "../routes/financingRouter";

class FinancingService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Ifinancing[] | null = await financing.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateFinancingType) {
    if (!user) return;
    let res: Ifinancing = await financing.create({
      cost: data.cost,
      date: data.date,
      type: data.type,
      name: data.name,
      purpose: data.purpose,
      calculationMethod: data.calculationMethod,
      calculationType: data.calculationType,
      isUseCost: data.isUseCost,
      cultureId: data.cultureId,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchFinancingType) {
    if (!user) return;
    await financing.update(
      {
        cost: data.cost,
        date: data.date,
        name: data.name,
        isUseCost: data.isUseCost,
        purpose: data.purpose,
        calculationMethod: data.calculationMethod,
        calculationType: data.calculationType,
        cultureId: data.cultureId,
      },
      { where: { id: data.financingId } }
    );
    const res: Ifinancing | null = await financing.findOne({
      where: { id: data.financingId },
    });
    if (!res) return;
    return res;
  }
  async delete(user: Principal | undefined, data: { financingId: number }) {
    if (!user) return;
    const res = await financing.destroy({ where: { id: data.financingId } });
    return res;
  }
}
export default new FinancingService();
