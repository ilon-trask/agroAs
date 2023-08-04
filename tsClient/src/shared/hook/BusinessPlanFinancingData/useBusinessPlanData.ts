import getYearFromString from "src/shared/funcs/getYearFromString";
import {
  resBusinessPlan,
  resBusProd,
} from "../../../../../tRPC serv/controllers/BusinessService";
import { Ioutcome, Iworker } from "../../../../../tRPC serv/models/models";

class BusinessPlanData {
  salaryFundFromCart(busProd: resBusProd) {
    return (
      (busProd.tech_cart?.totalCostHandWork ||
        0 + busProd.tech_cart?.totalCostMachineWork! ||
        0) * busProd.area
    );
  }
  salaryFundMonth(thisWorkers: Iworker[]) {
    return thisWorkers.reduce((p, c) => p + c.amount, 0);
  }
  salaryFundMonthWithTax(thisWorkers: Iworker[]) {
    return this.salaryFundMonth(thisWorkers) * 1.235;
  }
  salaryFundYear(thisWorkers: Iworker[]) {
    return thisWorkers.reduce(
      (p, c) => p + c.amount * (c.amountOfMounths || 0),
      0
    );
  }
  salaryFundYearWithTax(thisWorkers: Iworker[]) {
    return this.salaryFundYear(thisWorkers) * 1.235;
  }
  // OPFund(busProds: resBusProd[]) {
  //   return busProds.reduce((p, c) => {
  //     return p + this.oneOPFund(c);
  //   }, 0);
  // }
  // oneESV_VZ(busProd: resBusProd) {
  // return this.oneOPFund(busProd) * 0.235;
  // }
  OP_ADM_Fund(thisWorkers: Iworker[]) {
    return thisWorkers
      .filter((el) => el.class == "Адміністративний")
      .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0);
  }
  ESV_VZ_ADM(thisWorkers: Iworker[]) {
    return this.OP_ADM_Fund(thisWorkers) * 0.235;
  }
  // oneDirect(busProd: resBusProd) {
  //   return (
  //     this.oneOPFund(busProd) +
  //     (busProd.tech_cart?.costHectare! * busProd.area || 0)
  //   );
  // }
  variables(thisWorkers: Iworker[], busProds: resBusProd[]) {
    return this.totalProduction(thisWorkers) + this.sumDirect(busProds);
  }
  yearVariables(
    outcomes: Ioutcome[],
    myBusiness: resBusinessPlan,
    i: number,
    start: number
  ) {
    return (
      this.yearGeneralProduct(outcomes, i, start) +
      this.yearDirect(myBusiness, i, start)
    );
  }
  yearOutcome(
    outcomes: Ioutcome[],
    myBusiness: resBusinessPlan,
    i: number,
    start: number
  ) {
    return (
      this.yearPermanent(outcomes, i, start) +
      this.yearGeneralProduct(outcomes, i, start) +
      this.yearDirect(myBusiness, i, start)
    );
  }
  yearItrLaborRemuneration(thisWorkers: Iworker[], i: number, start: number) {
    return Math.round(
      thisWorkers
        ?.filter(
          (el) => el.class == "Інженерно технічний" && el.year == i - start
        )
        .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0)
    );
  }
  OP_ITR_Fund(thisWorkers: Iworker[]) {
    return Math.round(
      thisWorkers
        ?.filter((el) => el.class == "Інженерно технічний")
        .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0)
    );
  }
  ESV_VZ_ITR(thisWorkers: Iworker[]) {
    return this.OP_ITR_Fund(thisWorkers) * 0.235;
  }
  totalProduction(thisWorkers: Iworker[]) {
    return (
      this.OP_ITR_Fund(thisWorkers) + this.OP_ITR_Fund(thisWorkers) * 0.235
    );
  }
  yearGeneralProduct(outcomes: Ioutcome[], i: number, start: number) {
    return Math.round(
      outcomes
        ?.filter(
          (el) => el.group == "Загально виробничі" && el.year == i - start
        )
        .reduce((p, c) => p + (c.costYear || 0), 0) * 1.235
    );
  }
  yearPermanent(outcomes: Ioutcome[], i: number, start: number) {
    return Math.round(
      outcomes
        ?.filter((el) => el.group == "Постійні" && el.year == i - start)
        .reduce((p, c) => p + (c.costYear || 0), 0) * 1.235
    );
  }
  sumPermanent(outcomes: Ioutcome[]) {
    outcomes
      ?.filter((el) => el.group == "Постійні")
      .reduce((p, c) => p + (c.costYear || 0), 0) * 1.235;
  }
  yearDirect(myBusiness: resBusinessPlan, i: number, start: number) {
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
  sumDirect(busProds: resBusProd[]) {
    return busProds.reduce((p, c) => {
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
  // yearESV(myBusiness: resBusinessPlan, i: number, start: number) {
  //   return myBusiness.busProds
  //     .filter((el) => el.year == i - start)
  //     .reduce((p, c) => {
  //       return (
  //         p +
  //         Math.round(
  //           (c.tech_cart?.totalCostHandWork ||
  //             0 + c.tech_cart?.totalCostMachineWork! ||
  //             0) *
  //             c.area *
  //             0.235
  //         )
  //       );
  //     });
  // }
  yearFinancing(myBusiness: resBusinessPlan, i: number, start: number) {
    let financing = myBusiness.financings
      .filter((el) => getYearFromString(el.date) == i)
      .reduce((p, c) => p + (c.costBP || 0), 0);
    // if (i == start) {
    //   financing += myBusiness.initialAmount;
    // }
    return financing;
  }
  yearFin(myBusiness: resBusinessPlan, i: number, start: number) {
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
