import { Principal } from "..";
import { grant, Igrant, income } from "../models/models";
import { CreateCreditType, PatchCreditType } from "../routes/creditRouter";
import { CreateGrantType, PatchGrantType } from "../routes/grantRouter";

class GrantService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Igrant[] | null = await grant.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateGrantType) {
    if (!user) return;
    const res: Igrant = await grant.create({
      cost: data.cost,
      date: data.date,
      name: data.name,
      purpose: data.purpose,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchGrantType) {
    if (!user) return;
    await grant.update(
      {
        cost: data.cost,
        date: data.date,
        name: data.name,
        purpose: data.purpose,
      },
      { where: { id: data.grantId } }
    );
    const res: Igrant | null = await grant.findOne({
      where: { id: data.grantId },
    });
    return res;
  }
  async delete(user: Principal | undefined, data: { grantId: number }) {
    if (!user) return;
    await income.destroy({ where: { grantId: data.grantId } });
    const res = await grant.destroy({ where: { id: data.grantId } });
    return res;
  }
}
export default new GrantService();
