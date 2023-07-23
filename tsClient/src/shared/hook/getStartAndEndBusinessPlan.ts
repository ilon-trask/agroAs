import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";

function getStartAndEndBusinessPlan(myBusiness: resBusinessPlan) {
  const start = +myBusiness?.dateStart?.split("-")[0]!;
  const end = +start + +myBusiness?.realizationTime!;
  return { start, end };
}

export default getStartAndEndBusinessPlan;
