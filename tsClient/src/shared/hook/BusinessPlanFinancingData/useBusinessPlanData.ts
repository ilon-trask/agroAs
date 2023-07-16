import getYearFromString from "src/shared/funcs/getYearFromString";
import IncomeStore from "src/store/IncomeStore";
import { resBusinessPlan } from "../../../../../tRPC serv/controllers/BusinessService";
import { resTechCartsWithOpers } from "../../../../../tRPC serv/controllers/TechCartService";
import { Iworker } from "../../../../../tRPC serv/models/models";
import useVegetationYears from "../useVegetationYears";

class BusinessPlanData {
  variables(thisWorkers: Iworker[], sumDirect: number) {
    return this.generalProduct(thisWorkers) + sumDirect;
  }
  outcome(thisWorkers: Iworker[], sumDirect: number) {
    return (
      this.permanent(thisWorkers) + this.generalProduct(thisWorkers) + sumDirect
    );
  }
  itrLaborRemuneration(thisWorkers: Iworker[]) {
    return Math.round(
      thisWorkers
        ?.filter((el) => el.class == "Інженерно технічний")
        .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0)
    );
  }
  generalProduct(thisWorkers: Iworker[]) {
    return Math.round(
      thisWorkers
        ?.filter((el) => el.class == "Інженерно технічний")
        .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 1.235
    );
  }
  permanent(thisWorkers: Iworker[]) {
    return Math.round(
      thisWorkers
        ?.filter((el) => el.class == "Адміністративний")
        .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 1.235
    );
  }
  direct(
    myBusiness: resBusinessPlan,
    thisMaps: resTechCartsWithOpers[],
    i: number,
    start: number
  ) {
    return myBusiness.busProds.reduce((p, c) => {
      let cart = thisMaps.find(
        (e) =>
          e.cultureId == c.product?.cultureId &&
          e.cultivationTechnologyId == c.cultivationTechnologyId &&
          +e.year.split("")[0] == i - start
      );

      let res =
        Math.round(
          (cart?.totalCostHandWork || 0 + cart?.totalCostMachineWork! || 0) *
            c.area *
            0.235
        ) +
          cart?.costHectare! * c.area || 0;
      return p + res;
    }, 0);
  }
  financing(myBusiness: resBusinessPlan, i: number, start: number) {
    let financing = myBusiness.financings
      .filter((el) => getYearFromString(el.date) == i)
      .reduce((p, c) => p + c.cost, 0);
    if (i == start) {
      financing += myBusiness.initialAmount;
    }
    return financing;
  }
  fin(
    myBusiness: resBusinessPlan,
    i: number,
    start: number,
    income: IncomeStore
  ) {
    return myBusiness?.busProds?.reduce((p, c) => {
      const yearName = useVegetationYears[i - start + 1].name;
      const myYield = income.yieldPlant?.find(
        (e) => e.cultureId == c.product?.cultureId
      );

      const vegetation = income.vegetationYear?.find(
        (e) => e.yieldPlantId == myYield?.id && e.year == yearName
      );
      const sum =
        Math.round(
          (myYield?.yieldPerHectare! * c.area * vegetation?.allCoeff! || 0) *
            100
        ) / 100;
      return p + sum * c.product?.culture?.priceBerry! * 1000;
    }, 0);
  }
}
export default new BusinessPlanData();
