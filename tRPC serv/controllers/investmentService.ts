import { Principal } from "..";
import { Iinvestment, investment } from "../models/models";
import {
  CreateInvestmentType,
  PatchInvestmentType,
} from "../routes/investmentRouter";

class investmentService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Iinvestment[] = await investment.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateInvestmentType) {
    if (!user) return;
    const res: Iinvestment = await investment.create({
      cost: data.cost,
      date: data.date,
      name: data.name,
      origin: data.origin,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchInvestmentType) {
    if (!user) return;
    await investment.update(
      {
        name: data.name,
        cost: data.cost,
        date: data.date,
        origin: data.origin,
      },
      { where: { id: data.investmentId } }
    );
    const res: Iinvestment | null = await investment.findOne({
      where: { id: data.investmentId },
    });
    return res;
  }
  async delete(user: Principal | undefined, investmentId: number) {
    if (!user) return;
    return await investment.destroy({ where: { id: investmentId } });
  }
}
export default new investmentService();
