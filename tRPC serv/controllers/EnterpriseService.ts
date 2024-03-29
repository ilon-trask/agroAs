import { Principal } from "..";
import { enterprise, Ienterprise } from "../models/models";
import {
  CreateEnterpriseType,
  PatchEnterpriseLeader,
  PatchEnterpriseType,
} from "../routes/enterpriseRouter";

class EnterpriseService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Ienterprise[] | null = await enterprise.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateEnterpriseType) {
    if (!user) return;
    const res: Ienterprise = await enterprise.create({
      name: data.name,
      form: data.form,
      taxGroup: data.taxGroup,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchEnterpriseType) {
    if (!user) return;
    await enterprise.update(
      {
        name: data.name,
        form: data.form,
        taxGroup: data.taxGroup,
      },
      { where: { id: data.entId } }
    );
    const res: Ienterprise | null = await enterprise.findOne({
      where: { id: data.entId },
    });
    return res;
  }
  async delete(user: Principal | undefined, data: { entId: number }) {
    if (!user) return;
    const res = await enterprise.destroy({ where: { id: data.entId } });
    return res;
  }
  async patchEnterpriseLeader(
    user: Principal | undefined,
    data: PatchEnterpriseLeader
  ) {
    await enterprise.update({ ...data }, { where: { id: data.enterpriseId } });
    const res: Ienterprise | null = await enterprise.findOne({
      where: { id: data.enterpriseId },
    });
    return res;
  }
}
export default new EnterpriseService();
