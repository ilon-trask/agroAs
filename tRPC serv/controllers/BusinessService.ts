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
  tech_cart,
} from "../models/models";
import {
  ChangeProductType,
  CreateBusinessPlan,
  CreateBusProd,
  DeleteBusinessPlan,
  PatchBusinessPlan,
  PatchBusProd,
  SetIsAgreeBusinessPlan,
  SetIsPublicBusinessPlan,
} from "../routes/businessRouter";
import {
  cartsIncludes,
  changeCarts,
  resTechCartsWithOpers,
} from "./TechCartService";
export interface includeProduct extends Iproduct {
  culture: Iculture | undefined;
}
export interface resBusProd {
  businessPlanId: number;
  cultivationTechnologyId: number;
  techCartId: number | null;
  productId: number;
  product: includeProduct | undefined;
  id: number;
  cultivationTechnology: IcultivationTechnologies | undefined;
  area: number;
  year: number | null;
  tech_cart: resTechCartsWithOpers | null;
}
export interface resBusinessPlan extends IbusinessPlan {
  resume: Iresume;
  titlePage: ItitlePage;
  enterprise: Ienterprise | undefined;
  financings: Ifinancing[];
  busProds: resBusProd[];
}
const includes = [
  { model: resume },
  { model: titlePage },
  { model: financing },
  { model: enterprise },
  {
    model: busProd,
    include: [
      { model: tech_cart, include: cartsIncludes },
      { model: product, include: { model: culture } },
      { model: cultivationTechnologies },
    ],
  },
];
async function changeFinancing(res: resBusinessPlan[]) {
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
  res = await Promise.all(
    res.map(async (el) => {
      el.busProds = await Promise.all(
        el.busProds.map(async (prod) => {
          return {
            ...prod,
            tech_cart: (await changeCarts([prod.tech_cart]))[0],
          };
        })
      );
      return el;
    })
  );
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

      plans = await changeFinancing(plans);
      return plans;
    } else {
      //@ts-ignore
      let plans: resBusinessPlan[] = await businessPlan.findAll({
        where: { isPublic: true, isAgree: true },
        //@ts-ignore
        include: includes,
      });
      plans = await changeFinancing(plans);
      return plans;
    }
  }
  async create(user: Principal | undefined, data: CreateBusinessPlan) {
    if (!user) return;

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
    //@ts-ignore
    let res: resBusinessPlan | undefined | null = await businessPlan.findOne({
      where: { id: data.planId },
      //@ts-ignore
      include: includes,
    });
    res = (await changeFinancing([res!]))[0];
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
    res = (await changeFinancing([res]))[0];
    return res;
  }
  async createBusProd(user: Principal | undefined, data: CreateBusProd) {
    if (!user) return;
    const last = await busProd.findOne({
      order: [["id", "DESC"]],
    });
    await busProd.create({
      id: last?.id! + 1,
      area: data.area,
      year: data.year,
      businessPlanId: data.businessPlanId,
      cultivationTechnologyId: data.cultivationTechnologyId,
      productId: data.productId,
      techCartId: data.techCartId,
    });
    //@ts-ignore
    let res: resBusinessPlan | undefined | null = await businessPlan.findOne({
      where: { id: data.businessPlanId },
      //@ts-ignore
      include: includes,
    });
    res = (await changeFinancing([res!]))[0];
    return res;
  }
  async patchBusProd(user: Principal | undefined, data: PatchBusProd) {
    if (!user) return;
    await busProd.update(
      {
        area: data.area,
        businessPlanId: data.businessPlanId,
        cultivationTechnologyId: data.cultivationTechnologyId,
        productId: data.productId,
        techCartId: data.techCartId,
        year: data.year,
      },
      { where: { id: data.ownId } }
    );
    //@ts-ignore
    let res: resBusinessPlan | undefined | null = await businessPlan.findOne({
      where: { id: data.businessPlanId },
      //@ts-ignore
      include: includes,
    });
    res = (await changeFinancing([res!]))[0];
    return res;
  }
  async deleteBusProd(user: Principal | undefined, data: any) {}
  //   async changeProducts(user: Principal | undefined, data: ChangeProductType) {
  //     if (!user) return;
  //     await busProd.destroy({ where: { businessPlanId: data.busId } });
  //     for (let i = 0; i < data.productIds.length; i++) {
  //       const el = data.productIds[i];
  //       //@ts-ignore
  //       for (let j = 0; j < el.tech.length; j++) {
  //         const e = el.tech[j];
  //         const last = await busProd.findOne({
  //           order: [["id", "DESC"]],
  //         });
  //         await busProd.create({
  //           id: last?.id! + 1,
  //           businessPlanId: data?.busId,
  //           productId: el.productId,
  //           cultivationTechnologyId: e.cultivationTechnologyId,
  //           area: +e.area,
  //           year: el.year,
  //         });
  //       }
  //     }
  //     //@ts-ignore
  //     let res: resBusinessPlan = await businessPlan.findOne({
  //       where: { id: data.busId },
  //       //@ts-ignore
  //       include: includes,
  //     });
  //     res = changeFinancing([res])[0];
  //     return res;
  //   }
}
export default new BusinessService();
