import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
import getMonthFromString from "./getMonthFromString";

function getMonthsFromBusiness(myBusiness: resBusinessPlan) {
  return 13 - getMonthFromString(myBusiness.dateStart);
}

export default getMonthsFromBusiness;
