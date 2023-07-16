import { Principal } from "..";
import {
  busProd,
  businessPlan,
  cultivationTechnologies,
  culture,
  enterprise,
  financing,
  IbusinessPlan,
  IcultivationTechnologies,
  Iculture,
  Ienterprise,
  Ifinancing,
  Iresume,
  ItitlePage,
  resume,
  titlePage,
  Iproduct,
  product,
} from "../models/models";
import {
  CreateBusinessPlan,
  DeleteBusinessPlan,
  PatchBusinessPlan,
  SetIsAgreeBusinessPlan,
  SetIsPublicBusinessPlan,
} from "../routes/businessRouter";
export interface includeProduct extends Iproduct {
  culture: Iculture | undefined;
}
export interface resBusinessPlan extends IbusinessPlan {
  resume: Iresume;
  titlePage: ItitlePage;
  enterprise: Ienterprise | undefined;
  financings: Ifinancing[];
  busProds: {
    businessPlanId: number;
    cultivationTechnologyId: number;
    productId: number;
    product: includeProduct | undefined;
    id: number;
    cultivationTechnology: IcultivationTechnologies | undefined;
    area: number;
    year: number | null;
  }[];
}
const includes = [
  { model: resume },
  { model: titlePage },
  { model: financing },
  { model: enterprise },
  {
    model: busProd,
    include: [
      { model: product, include: { model: culture } },
      { model: cultivationTechnologies },
    ],
  },
  // { model: cultivationTechnologies },
];
function changeFinancing(res: resBusinessPlan[]) {
  res = JSON.parse(JSON.stringify(res));

  res.forEach((res) => {
    res.financings = res.financings.map((el) => {
      let area = 1;
      if (el.cultureId) {
        area = res.busProds
          .filter((e) => e.product?.cultureId == el.cultureId)
          .reduce((p, c) => p + c.area, 0);
      } else {
        area =
          res.busProds.length > 0
            ? res.busProds.reduce((p, c) => p + c.area, 0)
            : 0;
      }
      if (el.calculationMethod == "На гектар") {
        el.cost = el.cost * area;
      }
      return el;
    });
  });
  return res;
}
class BusinessService {
  // async getCategory() {
  //   const category = await businessCategory.findAll();
  //   return category;
  // }
  async get(user: Principal | undefined) {
    if (user) {
      //@ts-ignore
      let plans: resBusinessPlan[] = await businessPlan.findAll({
        where: { userId: user.sub },
        //@ts-ignore
        include: includes,
      });

      plans = changeFinancing(plans);
      return plans;
    } else {
      //@ts-ignore
      let plans: resBusinessPlan[] = await businessPlan.findAll({
        where: { isPublic: true, isAgree: true },
        //@ts-ignore
        include: includes,
      });
      plans = changeFinancing(plans);
      return plans;
    }
  }
  async create(user: Principal | undefined, data: CreateBusinessPlan) {
    if (!user) return;
    console.log(data);

    //@ts-ignore
    const plan: resBusinessPlan = await businessPlan.create(
      {
        name: data.name,
        topic: data.topic,
        initialAmount: data.initialAmount,
        dateStart: data.dateStart,
        enterpriseId: data.enterpriseId,
        realizationTime: data.realizationTime,
        userId: user.sub,
      },
      //@ts-ignore
      { include: includes }
    );
    for (let i = 0; i < data.cultureIds.length; i++) {
      const el = data.cultureIds[i];
      //@ts-ignore
      for (let j = 0; j < el.tech.length; j++) {
        const e = el.tech[j];
        const last = await busProd.findOne({
          order: [["id", "DESC"]],
        });

        await busProd.create({
          id: last?.id! + 1,
          businessPlanId: plan?.id,
          cultureId: el.id,
          cultivationTechnologyId: e.techId,
          area: e.area,
          year: e.year,
        });
      }
    }
    //@ts-ignore
    const res: resBusinessPlan | null = await businessPlan.findOne({
      where: { id: plan.id },
      //@ts-ignore
      include: includes,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchBusinessPlan) {
    if (!user) return;

    const ind = await businessPlan.update(
      {
        dateStart: data.dateStart,
        initialAmount: data.initialAmount,
        enterpriseId: data.enterpriseId,
        realizationTime: data.realizationTime,
        topic: data.topic,
        name: data.name,
      },
      { where: { id: data.planId } }
    );
    let res: resBusinessPlan | undefined | null = undefined;
    if (ind[0] == 1) {
      //@ts-ignore
      res = await businessPlan.findOne({
        where: { id: data.planId },
        //@ts-ignore
        include: includes,
      });
      //@ts-ignore
      await busProd.destroy({ where: { businessPlanId: res.id } });
      for (let i = 0; i < data.cultureIds.length; i++) {
        const el = data.cultureIds[i];
        //@ts-ignore
        for (let j = 0; j < el.tech.length; j++) {
          const e = el.tech[j];
          const last = await busProd.findOne({
            order: [["id", "DESC"]],
          });
          await busProd.create({
            id: last?.id! + 1,
            businessPlanId: res?.id,
            cultureId: el.id,
            cultivationTechnologyId: e.techId,
            area: e.area,
            year: e.year,
          });
        }
      }
      //@ts-ignore
      res = await businessPlan.findOne({
        where: { id: data.planId },
        //@ts-ignore
        include: includes,
      });
    }
    res = changeFinancing([res!])[0];
    return res;
  }
  async delete(user: Principal | undefined, data: DeleteBusinessPlan) {
    if (!user) return;
    const plans = await businessPlan.destroy({
      where: { userId: user.sub, id: data.planId },
    });
    return plans;
  }
  async setIsPublic(
    user: Principal | undefined,
    data: SetIsPublicBusinessPlan
  ) {
    if (!user) return;
    const ind = await businessPlan.update(
      {
        isPublic: data.isPublic,
        isAgree: data.isPublic,
        description: data.description,
      },
      { where: { id: data.planId } }
    );
    let res: resBusinessPlan | null | undefined = undefined;
    if (ind[0] == 1) {
      //@ts-ignore
      res = await businessPlan.findOne({
        where: { id: data.planId },
        //@ts-ignore
        include: includes,
      });
    }
    return res;
  }
  async getNoAgree() {
    //@ts-ignore
    const res: resBusinessPlan[] = await businessPlan.findAll({
      where: { isPublic: true, isAgree: false },
      //@ts-ignore
      include: includes,
    });
    return res;
  }
  async getPublic() {
    //@ts-ignore
    const res: resBusinessPlan[] = await businessPlan.findAll({
      where: { isPublic: true },
      //@ts-ignore
      include: includes,
    });
    return res;
  }
  async setIsAgree(user: Principal | undefined, data: SetIsAgreeBusinessPlan) {
    if (!user) return;

    if (user.role == "ADMIN" || user.role == "service_role") {
      const ind = await businessPlan.update(
        { isAgree: data.isAgree, description: data.description },
        { where: { id: data.planId } }
      );

      return ind;
    }
  }
  async addFinancing(data: { businessId: number; value: number[] }) {
    const business = await businessPlan.findOne({
      where: { id: data.businessId },
    });
    //@ts-ignore
    await business.setFinancings(null);
    for (let i = 0; i < data.value.length; i++) {
      const el = data.value[i];
      //@ts-ignore
      await business.addFinancing(el);
    }
    //@ts-ignore
    let res: resBusinessPlan = await businessPlan.findOne({
      where: { id: data.businessId },
      //@ts-ignore
      include: includes,
    });
    res = changeFinancing([res])[0];
    return res;
  }
}
export default new BusinessService();
