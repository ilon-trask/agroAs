import { Principal } from "..";
import { businessCategory, businessPlan } from "../models/models";
import {
  CreateBusinessPlan,
  DeleteBusinessPlan,
  PatchBusinessPlan,
  SetIsAgreeBusinessPlan,
  SetIsPublicBusinessPlan,
} from "../routes/businessRouter";

class BusinessService {
  async getCategory() {
    const category = await businessCategory.findAll();
    return category;
  }
  async get(user: Principal | undefined) {
    if (user) {
      const plans = await businessPlan.findAll({ where: { userId: user.sub } });
      return plans;
    } else {
      const plans = await businessPlan.findAll({
        where: { isPublic: true, isAgree: true },
      });
      return plans;
    }
  }
  async create(user: Principal | undefined, data: CreateBusinessPlan) {
    if (!user) throw new Error("юсер не увійшов");
    const plan = await businessPlan.create({
      name: data.name,
      businessCategoryId: data.businessCategoryId,
      userId: user.sub,
    });
    return plan;
  }
  async patch(user: Principal | undefined, data: PatchBusinessPlan) {
    if (!user) return;
    const ind = await businessPlan.update(
      {
        businessCategoryId: data.businessCategoryId,
        name: data.name,
      },
      { where: { id: data.planId } }
    );
    let res = undefined;
    if (ind[0] == 1) {
      res = await businessPlan.findOne({ where: { id: data.planId } });
    }
    return res;
  }
  async delete(user: Principal | undefined, data: DeleteBusinessPlan) {
    if (!user) throw new Error("");
    const plans = await businessPlan.destroy({
      where: { userId: user.sub, id: data.BusinessId },
    });
    return plans;
  }
  async setIsPublic(
    user: Principal | undefined,
    data: SetIsPublicBusinessPlan
  ) {
    if (!user) throw new Error("");
    const ind = await businessPlan.update(
      {
        isPublic: data.isPublic,
        isAgree: false,
        description: data.description,
      },
      { where: { id: data.BusinessId } }
    );
    let res = undefined;
    if (ind[0] == 1) {
      res = await businessPlan.findOne({ where: { id: data.BusinessId } });
    }
    return res;
  }
  async getNoAgree() {
    const res = businessPlan.findAll({
      where: { isPublic: true, isAgree: false },
    });
    return res;
  }
  async setIsAgree(user: Principal | undefined, data: SetIsAgreeBusinessPlan) {
    if (!user) throw new Error("");

    if (user.role == "ADMIN" || user.role == "service_role") {
      const ind = await businessPlan.update(
        { isAgree: data.isAgree, description: data.description },
        { where: { id: data.BusinessId } }
      );

      return ind;
    }
  }
}
export default new BusinessService();
