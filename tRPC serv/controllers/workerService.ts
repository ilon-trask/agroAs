import { Principal } from "..";
import { worker, Iworker } from "../models/models";
import { CreateWorkerType, PatchWorkerType } from "../routes/workerRouter";

class workerService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Iworker[] | null = await worker.findAll({
      where: { userId: user.sub },
    });
    return res;
  }
  async create(user: Principal | undefined, data: CreateWorkerType) {
    if (!user) return;
    const res: Iworker = await worker.create({
      amount: data.amount,
      dateFrom: data.dateFrom!,
      dateTo: data.dateTo!,
      isConst: data.isConst,
      salary: data.salary,
      enterpriseId: data.enterpriseId,
      jobId: data.jobId,
      class: data.class,
      userId: user.sub,
    });
    return res;
  }
  async patch(user: Principal | undefined, data: PatchWorkerType) {
    if (!user) return;
    await worker.update(
      {
        amount: data.amount,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        isConst: data.isConst,
        salary: data.salary,
        enterpriseId: data.enterpriseId,
        class: data.class,
        jobId: data.jobId,
      },
      { where: { id: data.workerId } }
    );
    const res: Iworker | null = await worker.findOne({
      where: { id: data.workerId },
    });
    return res;
  }
  async delete(user: Principal | undefined, data: { workerId: number }) {
    if (!user) return;
    const res = await worker.destroy({ where: { id: data.workerId } });
    return res;
  }
}
export default new workerService();
