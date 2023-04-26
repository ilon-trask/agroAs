import { Principal } from "..";
import { Ioutcome, outcome, tech_cart } from "../models/models";
import { createOutcomeType } from "../routes/outcomeRouter";

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
    const cart = await tech_cart.findOne({ where: { id: data.cartId } });
    if (!cart) return;
    const res: Ioutcome | undefined = await outcome.create({
      name: cart.nameCart,
      group: data.group,
      type: data.type,
      userId: user.sub,
      techCartId: data.cartId,
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
}
export default new outcomeService();
