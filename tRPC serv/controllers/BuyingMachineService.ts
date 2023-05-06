import { Op } from "sequelize";
import { Principal } from "..";
import {
  agricultural_machine,
  buying_machine,
  Ibuying_machine,
  outcome,
} from "../models/models";
import { Imachine } from "../models/models";
import {
  CreateBuyingMachine,
  PatchBuyingMachine,
} from "../routes/buyingMachineRouter";

class buyingMachineService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const machine: Ibuying_machine[] = await buying_machine.findAll({
      where: { userId: user.sub },
    });
    return machine;
  }
  async create(user: Principal | undefined, data: CreateBuyingMachine) {
    if (!user) return;
    const res: Ibuying_machine = await buying_machine.create({
      amount: data.amount,
      brand: data.brand,
      cost: data.cost,
      date: data.date,
      name: data.name,
      purpose: data.purpose,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchBuyingMachine) {
    if (!user) return;
    await buying_machine.update(
      {
        amount: data.amount,
        brand: data.brand,
        cost: data.cost,
        date: data.date,
        name: data.name,
        purpose: data.purpose,
      },
      { where: { id: data.buyingId } }
    );
    const res: Ibuying_machine | null = await buying_machine.findOne({
      where: { id: data.buyingId },
    });
    return res;
  }
  async delete(user: Principal | undefined, buyingId: number) {
    if (!user) return;
    await outcome.destroy({ where: { buyingMachineId: buyingId } });
    const res = await buying_machine.destroy({ where: { id: buyingId } });
    return res;
  }
}
export default new buyingMachineService();
