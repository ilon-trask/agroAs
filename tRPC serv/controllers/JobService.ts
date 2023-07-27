import { Op } from "sequelize";
import { Principal } from "..";
import { job, Ijob } from "../models/models";
import { CreateJobType, PatchJobType } from "../routes/jobRouter";

class JobService {
  async get(user: Principal | undefined) {
    const res: Ijob[] | null = await job.findAll({
      //@ts-ignore
      where: { [Op.or]: { userId: user.sub, userId: null } },
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateJobType) {
    if (!user) return;
    const res: Ijob = await job.create({
      name: data.name,
      isFOP: data.isFOP,
      isFOPWith: data.isFOPWith,
      isQO: data.isQO,
      userId: user.role == "service_role" ? null : user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchJobType) {
    if (!user) return;
    await job.update(
      {
        name: data.name,
        isFOP: data.isFOP,
        isFOPWith: data.isFOPWith,
        isQO: data.isQO,
      },
      { where: { id: data.jobId } }
    );
    const res: Ijob | null = await job.findOne({
      where: { id: data.jobId },
    });
    return res;
  }
  async delete(user: Principal | undefined, data: { jobId: number }) {
    if (!user) return;
    const res = await job.destroy({ where: { id: data.jobId } });
    return res;
  }
}
export default new JobService();
