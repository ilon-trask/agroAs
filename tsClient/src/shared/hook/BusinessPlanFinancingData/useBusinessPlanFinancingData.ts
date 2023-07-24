import IncomeStore from "src/store/IncomeStore";
import { resBusinessPlan } from "../../../../../tRPC serv/controllers/BusinessService";
import { Iworker } from "../../../../../tRPC serv/models/models";
import useBusinessPlanData from "./useBusinessPlanData";

function useBusinessPlanFinancingData(
  start: number,
  end: number,
  myBusiness: resBusinessPlan,
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
  for (let i = start; i <= end; i++) {
    if (i == start) {
      res.push({
        date: i + ".01",
        permanent: 0,
        direct: 0,
        generalProduction: 0,
        variables: 0,
        outcome: 0,
        incomeNum: 0,
        fin: 0,
        financing: 0,
      });
    }
    const direct = useBusinessPlanData.direct(myBusiness, i, start);
    const fin = useBusinessPlanData.fin(myBusiness, i, start, income);
    const financing = useBusinessPlanData.financing(myBusiness, i, start);
    const permanent = useBusinessPlanData.permanent(thisWorkers, i, start);
    const generalProduction = useBusinessPlanData.generalProduct(
      thisWorkers,
      i,
      start
    );
    const variables = useBusinessPlanData.variables(
      thisWorkers,
      sumDirect,
      i,
      start
    );
    const outcome = useBusinessPlanData.outcome(
      thisWorkers,
      sumDirect,
      i,
      start
    );
    console.log(direct);

    sumPermanent += permanent;
    sumDirect += direct;
    sumGeneralProduction += generalProduction;
    sumVariables += variables;
    sumOutcome += outcome;
    sumIncome += financing + fin;
    sumFin += fin;
    sumFinancing += financing;
    let akk = {
      date: i + ".12",
      permanent: permanent,
      direct: direct,
      generalProduction: generalProduction,
      variables: variables,
      outcome: outcome,
      incomeNum: (financing + fin).toFixed(),
      fin: fin.toFixed(),
      financing: financing.toFixed(),
    };
    console.log("akk");
    console.log(akk);

    res.push(akk);
  }
  console.log(sumDirect);
  res.push({
    date: "Разом",
    permanent: sumPermanent,
    direct: sumDirect,
    generalProduction: sumGeneralProduction,
    variables: sumVariables,
    outcome: sumOutcome,
    incomeNum: sumIncome.toFixed(),
    fin: sumFin.toFixed(),
    financing: sumFinancing.toFixed(),
  });
  return res;
}

export default useBusinessPlanFinancingData;
