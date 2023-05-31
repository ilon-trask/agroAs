import { Principal } from "..";
import { financing, Ifinancing, income } from "../models/models";
import {
  CreateFinancingType,
  PatchFinancingType,
} from "../routes/financingRouter";

function giveRes(data: Ifinancing[]) {
  const res: Ifinancing[] = JSON.parse(JSON.stringify(data));
  res.map((el) => {
    el.businessCost = 0;
    return el;
  });
  return res;
}

class FinancingService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Ifinancing[] | null = await financing.findAll({
      where: { userId: user.sub },
    });
    return giveRes(res);
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
      userId: user.sub,
    });
    return giveRes([res])[0];
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
      },
      { where: { id: data.financingId } }
    );
    const res: Ifinancing | null = await financing.findOne({
      where: { id: data.financingId },
    });
    if (!res) return;
    return giveRes([res])[0];
  }
  async delete(user: Principal | undefined, data: { financingId: number }) {
    if (!user) return;
    await income.destroy({ where: { financingId: data.financingId } });
    const res = await financing.destroy({ where: { id: data.financingId } });
    return res;
  }
}
export default new FinancingService();
