import { Principal } from "..";
import { businessCategory, businessPlan } from "../models/models";
import {
  CreateBusinessPlan,
  PatchBusinessPlan,
} from "../routes/businessRouter";

class BusinessService {
  async getCategory() {
    const category = await businessCategory.findAll();
    return category;
  }
  async get(user: Principal | undefined) {
    if (!user) throw new Error("");
    const plans = await businessPlan.findAll({ where: { userId: user.sub } });
    return plans;
  }
  async create(user: Principal | undefined, data: CreateBusinessPlan) {
    if (!user) throw new Error("");
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
        id: data.planId,
        businessCategoryId: data.businessCategoryId,
        name: data.name,
      },
      { where: { id: data.planId } }
    );
    return ind;
  }
  async delete(user: Principal | undefined, busId: number) {
    if (!user) throw new Error("");
    const plans = await businessPlan.destroy({
      where: { userId: user.sub, id: busId },
    });
    return plans;
  }
}
export default new BusinessService();
