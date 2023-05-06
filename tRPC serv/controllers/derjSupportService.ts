import { Principal } from "..";
import { derj_support, Iderj_support, income } from "../models/models";
import { CreateDerjType, PatchDerjType } from "../routes/derjSupportRouter";
import {
  CreateInvestmentType,
  PatchInvestmentType,
} from "../routes/investmentRouter";

class derjSupportService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Iderj_support[] = await derj_support.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateDerjType) {
    if (!user) return;
    const res: Iderj_support = await derj_support.create({
      cost: data.cost,
      date: data.date,
      name: data.name,
      purpose: data.purpose,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchDerjType) {
    if (!user) return;
    await derj_support.update(
      {
        name: data.name,
        cost: data.cost,
        date: data.date,
        purpose: data.purpose,
      },
      { where: { id: data.derjId } }
    );
    const res: Iderj_support | null = await derj_support.findOne({
      where: { id: data.derjId },
    });
    return res;
  }
  async delete(user: Principal | undefined, derjId: number) {
    if (!user) return;
    await income.destroy({ where: { derjSupportId: derjId } });
    return await derj_support.destroy({ where: { id: derjId } });
  }
}
export default new derjSupportService();
