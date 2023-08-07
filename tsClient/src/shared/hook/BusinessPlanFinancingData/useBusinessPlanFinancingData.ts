import { resBusinessPlan } from "../../../../../tRPC serv/controllers/BusinessService";
import useBusinessPlanData from "./useBusinessPlanData";

function useBusinessPlanFinancingData(
  start: number,
  end: number,
  myBusiness: resBusinessPlan
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
    // const direct = useBusinessPlanData.oneDirect(myBusiness, i, start);
    const direct = useBusinessPlanData.yearDirect(myBusiness, i, start);
    const fin = useBusinessPlanData.yearFin(myBusiness, i, start);
    const financing = useBusinessPlanData.yearFinancing(myBusiness, i, start);
    const permanent = useBusinessPlanData.yearPermanent(
      myBusiness.outcomes,
      i,
      start
    );
    const generalProduction = useBusinessPlanData.yearGeneralProduct(
      myBusiness.outcomes,
      i,
      start
    );
    const variables = useBusinessPlanData.yearVariables(
      myBusiness.outcomes,
      myBusiness,
      i,
      start
    );
    const outcome = useBusinessPlanData.yearOutcome(
      myBusiness.outcomes,
      myBusiness,
      i,
      start
    );

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
    res.push(akk);
  }

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
