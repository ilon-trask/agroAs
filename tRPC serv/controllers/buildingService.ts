import { Principal } from "..";
import { building, Ibuilding } from "../models/models";
import {
  CreateBuildingType,
  PatchBuildingType,
} from "../routes/buildingRouter";

class BuildingService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Ibuilding[] | null = await building.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateBuildingType) {
    if (!user) return;
    const res: Ibuilding = await building.create({
      name: data.name,
      date: data.date,
      year: data.year,
      description: data.description,
      startPrice: data.startPrice,
      businessPlanId: data.businessPlanId,
      enterpriseId: data.enterpriseId,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchBuildingType) {
    if (!user) return;
    await building.update(
      {
        name: data.name,
        startPrice: data.startPrice,
        date: data.date,
        description: data.description,
        businessPlanId: data.businessPlanId,
        enterpriseId: data.enterpriseId,
      },
      { where: { id: data.buildId } }
    );
    const res: Ibuilding | null = await building.findOne({
      where: { id: data.buildId },
    });
    return res;
  }
  async delete(user: Principal | undefined, data: { buildId: number }) {
    if (!user) return;
    const res = await building.destroy({ where: { id: data.buildId } });
    return res;
  }
}
export default new BuildingService();
