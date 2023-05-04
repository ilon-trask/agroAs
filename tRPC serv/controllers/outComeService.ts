import { Principal } from "..";
import { buying_machine, Ioutcome, outcome, tech_cart } from "../models/models";
import { createOutcomeType, patchOutcomeType } from "../routes/outcomeRouter";

export type IoutcomeType = "Інвестиційні" | "Операційні" | "Не визначено";
export type IoutcomeGroup =
  | "Прямі"
  | "Загально виробничі"
  | "Постійні"
  | "Купівля техніки і обладнання"
  | "Будівництво будівель і споруд"
  | "Не визначино";
class outcomeService {
  async create(user: Principal | undefined, data: createOutcomeType) {
    if (!user) return;

    const cart = await tech_cart.findOne({ where: { id: data.propId } });
    const buying = await buying_machine.findOne({
      where: { id: data.propId },
    });
    let buyingId;
    let cartId;
    if (data?.group == "Купівля техніки і обладнання") {
      buyingId = data.propId;
    } else if (data.group == "Прямі") {
      cartId = data.propId;
    }
    const res: Ioutcome | undefined = await outcome.create({
      name: cart?.nameCart! || buying?.name!,
      group: data.group,
      type: data.type,
      userId: user.sub,
      techCartId: cartId,
      buyingMachineId: buyingId,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: patchOutcomeType) {
    if (!user) return;
    const cart = await tech_cart.findOne({ where: { id: data.propId } });
    const buying = await buying_machine.findOne({
      where: { id: data.propId },
    });
    let buyingId;
    let cartId;
    if (data?.group == "Купівля техніки і обладнання") {
      buyingId = data.propId;
    } else if (data.group == "Прямі") {
      cartId = data.propId;
    }
    await outcome.update(
      {
        group: data.group,
        techCartId: cartId,
        buyingMachineId: buyingId,
        name: cart?.nameCart! || buying?.name!,
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
