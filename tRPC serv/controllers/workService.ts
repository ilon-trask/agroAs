import { Principal } from "..";
import { Ispecial_work, special_work } from "../models/models";
import { CreateProps, DeleteProps, PatchProps } from "../routes/workRouter";

class workService {
  async get(user: Principal | undefined) {
    if (user) {
      return await special_work.findAll({ where: { userId: user?.sub } });
    } else {
      return await special_work.findAll({ where: { isPublic: true } });
    }
  }
  async create(data: CreateProps, user: Principal | undefined) {
    let res: Ispecial_work | null = null;
    if (user) {
      res = await special_work.create({ ...data, userId: user?.sub });
    }
    return res;
  }
  async delete(data: DeleteProps, user: Principal | undefined) {
    let res: any | null = null;
    if (user) {
      res = await special_work.destroy({ where: { id: data.workId } });
    }
    return res;
  }
  async patch(data: PatchProps, user: Principal | undefined) {
    let res: any | null = null;
    if (user) {
      await special_work.update(
        { ...data, userId: user?.sub },
        { where: { id: data.workId } }
      );
      res = await special_work.findOne({ where: { id: data.workId } });
    }
    return res;
  }
  async setIsPublic() {}
}
export default new workService();
