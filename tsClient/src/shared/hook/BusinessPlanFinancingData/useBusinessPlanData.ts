import getYearFromString from "src/shared/funcs/getYearFromString";
import IncomeStore from "src/store/IncomeStore";
import { resBusinessPlan } from "../../../../../tRPC serv/controllers/BusinessService";
import { Iworker } from "../../../../../tRPC serv/models/models";

class BusinessPlanData {
  variables(thisWorkers: Iworker[], direct: number, i: number, start: number) {
    return this.generalProduct(thisWorkers, i, start) + direct;
  }
  outcome(thisWorkers: Iworker[], direct: number, i: number, start: number) {
    return (
      this.permanent(thisWorkers, i, start) +
      this.generalProduct(thisWorkers, i, start) +
      direct
    );
  }
  itrLaborRemuneration(thisWorkers: Iworker[], i: number, start: number) {
    return Math.round(
      thisWorkers
        ?.filter(
          (el) => el.class == "Інженерно технічний" && el.year == i - start
        )
        .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0)
    );
  }
  generalProduct(thisWorkers: Iworker[], i: number, start: number) {
    return Math.round(
      thisWorkers
        ?.filter(
          (el) => el.class == "Інженерно технічний" && el.year == i - start
        )
        .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 1.235
    );
  }
  permanent(thisWorkers: Iworker[], i: number, start: number) {
    return Math.round(
      thisWorkers
        ?.filter((el) => el.class == "Адміністративний" && el.year == i - start)
        .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 1.235
    );
  }
  direct(myBusiness: resBusinessPlan, i: number, start: number) {
    return myBusiness.busProds
      .filter((el) => el.year == i - start)
      .reduce((p, c) => {
        let res =
          Math.round(
            (c.tech_cart?.totalCostHandWork ||
              0 + c.tech_cart?.totalCostMachineWork! ||
              0) *
              c.area *
              0.235
          ) +
            c.tech_cart?.costHectare! * c.area || 0;
        return p + res;
      }, 0);
  }
  financing(myBusiness: resBusinessPlan, i: number, start: number) {
    let financing = myBusiness.financings
      .filter((el) => getYearFromString(el.date) == i)
      .reduce((p, c) => p + (c.costBP || 0), 0);
    // if (i == start) {
    //   financing += myBusiness.initialAmount;
    // }
    return financing;
  }
  fin(
    myBusiness: resBusinessPlan,
    i: number,
    start: number,
    income: IncomeStore
  ) {
    return myBusiness?.busProds
      .filter((el) => el.year == i - start)
      ?.reduce((p, c) => {
        const vegetationYear = c.vegetationYear;
        return +(
          p +
            +(
              +(
                c.area *
                  vegetationYear?.potentialYieldPerHectare! *
                  (vegetationYear?.allCoeff || 1) || 0
              ).toFixed(2) * (c.price || 0)
            ) || 0
        ).toFixed(2);
      }, 0);
  }
}
export default new BusinessPlanData();
