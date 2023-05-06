import { Principal } from "..";
import {
  businessPlan,
  culture,
  IbusinessPlan,
  Iresume,
  ItitlePage,
  resume,
  titlePage,
} from "../models/models";
import {
  CreateBusinessPlan,
  DeleteBusinessPlan,
  PatchBusinessPlan,
  SetIsAgreeBusinessPlan,
  SetIsPublicBusinessPlan,
} from "../routes/businessRouter";
export interface resBusinessPlan extends IbusinessPlan {
  resume: Iresume;
  titlePage: ItitlePage;
}
const includes = [{ model: resume }, { model: titlePage }, { model: culture }];
class BusinessService {
  // async getCategory() {
  //   const category = await businessCategory.findAll();
  //   return category;
  // }
  async get(user: Principal | undefined) {
    if (user) {
      //@ts-ignore
      const plans: resBusinessPlan[] = await businessPlan.findAll({
        where: { userId: user.sub },
        include: includes,
      });
      return plans;
    } else {
      //@ts-ignore
      const plans: resBusinessPlan[] = await businessPlan.findAll({
        where: { isPublic: true, isAgree: true },
        include: includes,
      });
      return plans;
    }
  }
  async create(user: Principal | undefined, data: CreateBusinessPlan) {
    if (!user) return;
    //@ts-ignore
    const plan: resBusinessPlan = await businessPlan.create(
      {
        name: data.name,
        initialAmount: data.initialAmount,
        dateStart: data.dateStart,
        enterpriseId: data.enterpriseId,
        realizationTime: data.realizationTime,
        userId: user.sub,
      },
      { include: includes }
    );
    data.cultureIds.forEach((el) => {
      //@ts-ignore
      plan.addCulture(el);
    });
    //@ts-ignore
    const res: resBusinessPlan | null = await businessPlan.findOne({
      where: { id: plan.id },
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

        name: data.name,
      },
      { where: { id: data.planId } }
    );
    let res: resBusinessPlan | undefined | null = undefined;
    if (ind[0] == 1) {
      //@ts-ignore
      res = await businessPlan.findOne({
        where: { id: data.planId },
        include: includes,
      });
      //@ts-ignore
      await res.setCultures([]);
      for (let i = 0; i < data.cultureIds.length; i++) {
        const el = data.cultureIds[i];
        //@ts-ignore
        await res.addCulture(el);
      }
      //@ts-ignore
      res = await businessPlan.findOne({
        where: { id: data.planId },
        include: includes,
      });
    }
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
        isAgree: false,
        description: data.description,
      },
      { where: { id: data.planId } }
    );
    let res: resBusinessPlan | null | undefined = undefined;
    if (ind[0] == 1) {
      //@ts-ignore
      res = await businessPlan.findOne({
        where: { id: data.planId },
        include: includes,
      });
    }
    return res;
  }
  async getNoAgree() {
    //@ts-ignore
    const res: resBusinessPlan[] = await businessPlan.findAll({
      where: { isPublic: true, isAgree: false },
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
}
export default new BusinessService();
