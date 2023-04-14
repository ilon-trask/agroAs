import { Principal } from "..";
import {
  IcultivationTechnologies,
  Iculture,
  Itech_cart,
  ItechnologicalEconomicJustification,
  cultivationTechnologies,
  culture,
  tech_cart,
  technologicalEconomicJustification,
} from "../models/models";
import { createTEJType } from "../routes/TEJRouter";

const include = [cultivationTechnologies, culture, tech_cart];

export interface resTechnologicalEconomicJustification
  extends ItechnologicalEconomicJustification {
  cultivationTechnology: IcultivationTechnologies;
  culture: Iculture;
  tech_cart: Itech_cart;
}

class TEJService {
  async getCultivationTechnologies() {
    const cultivation = await cultivationTechnologies.findAll();
    return cultivation;
  }
  async create(data: createTEJType, user: Principal | undefined) {
    if (!user) return;
    const cart = await tech_cart.findOne({ where: { id: data.cartId } });
    if (!cart) return;
    const TEJ = await technologicalEconomicJustification.create({
      cultivationTechnologyId: cart.cultivationTechnologyId,
      cultureId: cart.cultureId,
      comment: data.comment,
      techCartId: data.cartId,
      userId: user.sub,
    });
    const res: resTechnologicalEconomicJustification =
      await technologicalEconomicJustification.findOne({
        where: { id: TEJ.id },
        include: include,
      });

    return res;
  }
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: resTechnologicalEconomicJustification[] =
      await technologicalEconomicJustification.findAll({
        where: { userId: user.sub },
        include: include,
      });
    return res;
  }
}
export default new TEJService();
