import { Principal } from "..";
import {
  administration,
  buying_machine,
  Ioutcome,
  outcome,
  tech_cart,
} from "../models/models";
import { createOutcomeType, patchOutcomeType } from "../routes/outcomeRouter";

export type IoutcomeType = "Інвестиційні" | "Операційні" | "Не визначено";
export type IoutcomeGroup =
  | "Прямі"
  | "Загально виробничі"
  | "Постійні"
  | "Не визначино";
class outcomeService {
  async create(user: Principal | undefined, data: createOutcomeType) {
    if (!user) return;
    const res: Ioutcome | undefined = await outcome.create({
      name: data.name,
      costMonth: data.costMonth,
      date: data.date,
      group: data.group,
      userId: user.sub,
      businessPlanId: data.businessPlanId!,
      type: data.type,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: patchOutcomeType) {
    if (!user) return;
    // const cart = await tech_cart.findOne({ where: { id: data.propId } });
    // const buying = await buying_machine.findOne({
    //   where: { id: data.propId },
    // });
    // const adm = await administration.findOne({ where: { id: data.propId } });

    // let buyingId;
    // let cartId;
    // let admId;
    // let propName = undefined;
    // if (data.group == "Прямі") {
    //   cartId = data.propId;
    //   propName = cart?.nameCart;
    // } else if (data.group == "Постійні") {
    //   admId = data.propId;
    //   propName = adm?.name;
    // }
    await outcome.update(
      {
        group: data.group,
        // techCartId: cartId,
        // buyingMachineId: buyingId,
        // administrationId: admId,
        // name: propName,
        type: data.type,
      },
      { where: { id: data.outcomeId } }
    );
    const res: Ioutcome | null = await outcome.findOne({
      where: { id: data.outcomeId },
    });
    return res;
  }
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Ioutcome[] | undefined = await outcome.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async setIsUsing(
    user: Principal | undefined,
    data: { outcomeId: number; value: boolean }
  ) {
    if (!user) return;

    await outcome.update(
      { isUsing: data.value },
      { where: { id: data.outcomeId } }
    );
    const res: Ioutcome | null = await outcome.findOne({
      where: { id: data.outcomeId },
    });
    return res;
  }
  async delete(user: Principal | undefined, outcomeId: number) {
    if (!user) return;
    const res = await outcome.destroy({ where: { id: outcomeId } });
    return res;
  }
}
export default new outcomeService();
