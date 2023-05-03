import { Principal } from "..";
import { credit, Icredit, income } from "../models/models";
import { CreateCreditType, PatchCreditType } from "../routes/creditRouter";

class CreditService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Icredit[] | null = await credit.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateCreditType) {
    if (!user) return;
    const res: Icredit = await credit.create({
      cost: data.cost,
      date: data.date,
      name: data.name,
      purpose: data.purpose,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchCreditType) {
    if (!user) return;
    await credit.update(
      {
        cost: data.cost,
        date: data.date,
        name: data.name,
        purpose: data.purpose,
      },
      { where: { id: data.creditId } }
    );
    const res: Icredit | null = await credit.findOne({
      where: { id: data.creditId },
    });
    return res;
  }
  async delete(user: Principal | undefined, data: { creditId: number }) {
    if (!user) return;
    await income.destroy({ where: { creditId: data.creditId } });
    const res = await credit.destroy({ where: { id: data.creditId } });
    return res;
  }
}
export default new CreditService();
