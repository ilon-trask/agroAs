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
import {
  createTEJType,
  patchTEJType,
  setIsPublicTEJType,
} from "../routes/TEJRouter";

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
      cultivationTechnologyId: data.cultivationTechnologyId,
      cultureId: data.cultureId,
      comment: data.comment,
      area: cart.area,
      techCartId: data.cartId,
      userId: user.sub,
    });
    //@ts-ignore
    const res: resTechnologicalEconomicJustification =
      await technologicalEconomicJustification.findOne({
        where: { id: TEJ.id },
        include: include,
      });

    return res;
  }
  async get(user: Principal | undefined) {
    if (!user) return;
    //@ts-ignore
    const res: resTechnologicalEconomicJustification[] =
      await technologicalEconomicJustification.findAll({
        where: { userId: user.sub },
        include: include,
      });
    return res;
  }
  async delete(data: { TEJId: number }, user: Principal | undefined) {
    if (!user) return;
    const res = await technologicalEconomicJustification.destroy({
      where: { id: data.TEJId },
    });
    return res;
  }
  async patch(data: patchTEJType, user: Principal | undefined) {
    if (!user) return;
    const prev = await technologicalEconomicJustification.update(
      {
        comment: data.comment,
        area: data.area,
        cultivationTechnologyId: data.cultivationTechnologyId,
        cultureId: data.cultureId,
        techCartId: data.cartId,
      },
      { where: { id: data.TEJId } }
    );
    if (!prev[0]) return;
    //@ts-ignore
    const res: resTechnologicalEconomicJustification =
      await technologicalEconomicJustification.findOne({
        where: { id: data.TEJId },
        include: include,
      });
    return res;
  }
  async setIsPublic(data: setIsPublicTEJType, user: Principal | undefined) {
    if (!user) return;
    const prev = await technologicalEconomicJustification.update(
      {
        authorName: data.authorName,
        isPublic: data.isPublic,
        publicComment: data.publicComment,
      },
      { where: { id: data.TEJId } }
    );
    console.log(data.TEJId);

    if (!prev[0]) return;
    //@ts-ignore
    const res: resTechnologicalEconomicJustification =
      await technologicalEconomicJustification.findOne({
        where: { id: data.TEJId },
        include: include,
      });
    return res;
  }
  async getNoAgree() {
    //@ts-ignore
    const res: resTechnologicalEconomicJustification[] =
      await technologicalEconomicJustification.findAll({
        where: { isPublic: true, isAgree: false },
        include: include,
      });
    return res;
  }
  async setIsAgree(data: setIsPublicTEJType, user: Principal | undefined) {
    if (!user) return;
    console.log(data.isAgree);

    const prev = await technologicalEconomicJustification.update(
      {
        authorName: data.authorName,
        isPublic: data.isPublic,
        isAgree: data.isAgree,
        publicComment: data.publicComment,
      },
      { where: { id: data.TEJId } }
    );
    if (!prev[0]) return;
    //@ts-ignore
    const res: resTechnologicalEconomicJustification =
      await technologicalEconomicJustification.findOne({
        where: { id: data.TEJId },
        include: include,
      });
    return res;
  }
  async getAgree() {
    //@ts-ignore
    const res: resTechnologicalEconomicJustification[] =
      await technologicalEconomicJustification.findAll({
        where: { isAgree: true, isPublic: true },
        include: include,
      });
    return res;
  }
  async getTechnologies() {
    const res = await cultivationTechnologies.findAll();
    return res;
  }
}
export default new TEJService();
