import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";

function getStartAndEndBusinessPlan(myBusiness: resBusinessPlan | undefined) {
  const start = +(myBusiness?.dateStart?.split("-")[0] || 0);
  const end = +start + +(myBusiness?.realizationTime || 0);
  return { start, end };
}

export default getStartAndEndBusinessPlan;
