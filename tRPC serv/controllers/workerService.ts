import { Principal } from "..";
import { worker, Iworker } from "../models/models";
import { CreateWorkerType, PatchWorkerType } from "../routes/workerRouter";
import { getBusinessPlan } from "./BusinessService";
export function changeWorkerRes(arr: Iworker[]) {
  arr = JSON.parse(JSON.stringify(arr));

  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (el.dateFrom && el.dateTo) {
      el.amountOfMounths =
        +el.dateTo.split("-")[1] - +el.dateFrom.split("-")[1];
    } else {
      el.amountOfMounths = 12;
    }
  }

  return arr;
}
class workerService {
  async get(user: Principal | undefined) {
    if (!user) return;
    const res: Iworker[] | null = await worker.findAll({
      where: { userId: user.sub },
    });
    // console.log(res);

    if (!res) return;

    return changeWorkerRes(res);
  }
  async create(user: Principal | undefined, data: CreateWorkerType) {
    if (!user) return;
    let res: Iworker = await worker.create({
      amount: data.amount,
      dateFrom: data.dateFrom!,
      dateTo: data.dateTo!,
      year: data.year,
      isConst: data.isConst,
      salary: data.salary,
      enterpriseId: data.enterpriseId,
      form: data.form,
      jobId: data.jobId,
      class: data.class,
      userId: user.sub,
      businessPlanId: data.businessPlanId,
    });

    return getBusinessPlan(data.businessPlanId);
  }
  async patch(user: Principal | undefined, data: PatchWorkerType) {
    if (!user) return;
    await worker.update(
      {
        amount: data.amount,
        dateFrom: data.dateFrom!,
        dateTo: data.dateTo!,
        isConst: data.isConst,
        salary: data.salary,
        enterpriseId: data.enterpriseId,
        class: data.class,
        form: data.form,
        jobId: data.jobId,
      },
      { where: { id: data.workerId } }
    );

    return getBusinessPlan(data.businessPlanId);
  }
  async delete(user: Principal | undefined, data: { workerId: number }) {
    if (!user) return;
    const res = await worker.destroy({ where: { id: data.workerId } });
    return res;
  }
}
export default new workerService();
