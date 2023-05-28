import { Principal } from "..";
import { Iland, land } from "../models/models";
import { CreateLandType, PatchLandType } from "../routes/landRouter";

class landService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Iland[] | null = await land.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateLandType) {
    if (!user) return;
    const res: Iland = await land.create({
      name: data.name,
      area: data.area,
      cadastreNumber: data.cadastreNumber,
      businessPlanId: data.businessPlanId,
      enterpriseId: data.enterpriseId,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchLandType) {
    if (!user) return;
    await land.update(
      {
        name: data.name,
        area: data.area,
        cadastreNumber: data.cadastreNumber,
        businessPlanId: data.businessPlanId,
        enterpriseId: data.enterpriseId,
      },
      { where: { id: data.landId } }
    );
    const res: Iland | null = await land.findOne({
      where: { id: data.landId },
    });
    return res;
  }
  async delete(user: Principal | undefined, data: { landId: number }) {
    if (!user) return;
    const res = await land.destroy({ where: { id: data.landId } });
    return res;
  }
}
export default new landService();
