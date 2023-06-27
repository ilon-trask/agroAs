import IncomeStore from "src/store/IncomeStore";
import { resBusinessPlan } from "../../../../../tRPC serv/controllers/BusinessService";
import { resTechCartsWithOpers } from "../../../../../tRPC serv/controllers/TechCartService";
import { Iworker } from "../../../../../tRPC serv/models/models";
import getYearFromString from "../../funcs/getYearFromString";
import useVegetationYears from "../useVegetationYears";
import useBusinessPlanData from "./useBusinessPlanData";

function useBusinessPlanFinancingData(
  start: number,
  end: number,
  myBusiness: resBusinessPlan,
  thisMaps: resTechCartsWithOpers[],
  income: IncomeStore,
  thisWorkers: Iworker[]
) {
  let sumPermanent = 0,
    sumGeneralProduction = 0,
    sumVariables = 0,
    sumOutcome = 0,
    sumDirect = 0,
    sumIncome = 0,
    sumFin = 0,
    sumFinancing = 0,
    res = [];
  for (let i = start; i < end; i++) {
    if (i == start) {
      res.push({
        date: i + ".01",
        permanent: 0,
        direct: 0,
        generalProduction: 0,
        variables: 0,
        outcome: 0,
        financingFin: 0,
        fin: 0,
        financing: 0,
      });
    }
    const direct = useBusinessPlanData.direct(myBusiness, thisMaps, i, start);
    const fin = useBusinessPlanData.fin(myBusiness, i, start, income);
    const financing = useBusinessPlanData.financing(myBusiness, i, start);
    const permanent = useBusinessPlanData.permanent(thisWorkers);
    const generalProduction = useBusinessPlanData.generalProduct(thisWorkers);
    const variables = useBusinessPlanData.variables(thisWorkers, sumDirect);
    const outcome = useBusinessPlanData.outcome(thisWorkers, sumDirect);

    sumPermanent += permanent;
    sumDirect += direct;
    sumGeneralProduction += generalProduction;
    sumVariables += variables;
    sumOutcome += outcome;
    sumIncome += financing + fin;
    sumFin += fin;
    sumFinancing += financing;
    res.push({
      date: i + ".12",
      permanent: permanent,
      direct: direct,
      generalProduction: generalProduction,
      variables: variables,
      outcome: outcome,
      incomeNum: financing + fin,
      fin: fin,
      financing: financing,
    });
  }
  res.push({
    date: "Разом",
    permanent: sumPermanent,
    direct: sumDirect,
    generalProduction: sumGeneralProduction,
    variables: sumVariables,
    outcome: sumOutcome,
    incomeNum: sumIncome,
    fin: sumFin,
    financing: sumFinancing,
  });
  return res;
}

export default useBusinessPlanFinancingData;
