import { Table, Th, Thead, Tr, Heading, Tbody, Td } from "@chakra-ui/react";
import React, { RefObject, useContext } from "react";
import { Context } from "src/main";
import getYearFromString from "src/shared/funcs/getYearFromString";
import useVegetationYears from "src/shared/hook/useVegetationYears";
import Description from "src/ui/Description";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
import { resTechCartsWithOpers } from "../../../../tRPC serv/controllers/TechCartService";
import { Iworker } from "../../../../tRPC serv/models/models";

function PlanedIndicatorsBusinessPlan({
  start,
  end,
  myBusiness,
  aref,
  thisWorkers,
  thisMaps,
}: {
  start: number;
  end: number;
  myBusiness: resBusinessPlan;
  thisWorkers: Iworker[];
  aref: RefObject<HTMLTableElement>;
  thisMaps: resTechCartsWithOpers[];
}) {
  const { income } = useContext(Context);
  return (
    <>
      <Table size={"sm"} ref={aref}>
        <Thead>
          <Tr>
            <Th colSpan={9}>
              <SectionTitle>Показники планові</SectionTitle>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={9}>
              <Description>
                Критичний обсяг виробництва або рівень беззбитковості (точка
                беззбитковості) відображає величину виручки від реалізації
                продукції проекту, при якій повністю покриваються всі витрати на
                виробництво продукції, не отримуючи при цьому прибутку. Його
                розрахунок проводиться в натуральному і вартісному виразах.
              </Description>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={9}>
              <TableName>Визначення точки беззбитковості (тис. грн.)</TableName>
            </Th>
          </Tr>
          <Tr>
            <Td colSpan={9} py={1}>
              <TableNumber></TableNumber>
            </Td>
          </Tr>
          <Tr>
            <Th p={0}></Th>
            <Th p={0}>Постійні</Th>
            <Th p={0} fontWeight={"normal"}>
              Прямі
            </Th>
            <Th p={0} fontWeight={"normal"}>
              Заг&nbsp;вир
            </Th>
            <Th p={0}>Змінні</Th>
            <Th p={0}>Витрати</Th>
            <Th p={0}>Дохід</Th>
            <Th p={0} fontWeight={"normal"}>
              Виручка
            </Th>
            <Th p={0} fontWeight={"normal"}>
              Залучення коштів
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td px={1}>
              {myBusiness?.dateStart.split("-")[0] +
                "." +
                myBusiness?.dateStart.split("-")[1]}
            </Td>
            <Td px={1}>0</Td>
            <Td px={1}>0</Td>
            <Td px={1}>0</Td>
            <Td px={1}>0</Td>
            <Td px={1}>0</Td>
            <Td px={1}>0</Td>
            <Td px={1}>0</Td>
            <Td px={1}>0</Td>
          </Tr>
          {(() => {
            const res = [];
            let sumPermanent = 0,
              sumGeneralProduction = 0,
              sumVariables = 0,
              sumOutcome = 0,
              sumDirect = 0,
              sumIncome = 0,
              sumFin = 0,
              sumFinancing = 0;
            for (let i = start; i < end; i++) {
              let fin = 0;
              let direct = (() => {
                let sumDirect = 0;
                myBusiness.busCuls.forEach((el) => {
                  let cart = thisMaps.find(
                    (e) =>
                      e.cultureId == el.cultureId &&
                      e.cultivationTechnologyId == el.cultivationTechnologyId &&
                      +e.year.split("")[0] == i - start
                  );

                  let res =
                    Math.round(
                      (cart?.totalCostHandWork ||
                        0 + cart?.totalCostMachineWork! ||
                        0) *
                        el.area *
                        0.235
                    ) +
                      cart?.costHectare! * el.area || 0;
                  console.log("ref");
                  console.log(res);
                  sumDirect += res;
                });
                return sumDirect;
              })();
              myBusiness?.busCuls?.forEach((el) => {
                const yearName = useVegetationYears[i - start + 1].name;
                const myYield = income.yieldPlant.find(
                  (e) => e.cultureId == el.cultureId
                );

                const vegetation = income.vegetationYear.find(
                  (e) => e.yieldPlantId == myYield?.id && e.year == yearName
                );
                const sum =
                  Math.round(
                    (myYield?.yieldPerHectare! *
                      el.area *
                      vegetation?.allCoeff! || 0) * 100
                  ) / 100;
                fin += sum * el.culture?.priceBerry! * 1000;
              });
              let financing = myBusiness.financings
                .filter((el) => getYearFromString(el.date) == i)
                .reduce((p, c) => p + c.cost, 0);
              if (i == start) {
                financing += myBusiness.initialAmount;
              }

              const permanent = Math.round(
                thisWorkers
                  .filter((el) => el.class == "Адміністративний")
                  .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) *
                  1.235
              );
              const generalProduction = Math.round(
                thisWorkers
                  .filter((el) => el.class == "Інженерно технічний")
                  .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) *
                  1.235
              );
              const variables =
                Math.round(
                  thisWorkers
                    .filter((el) => el.class == "Інженерно технічний")
                    .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) *
                    1.235
                ) + sumDirect;
              const outcome =
                thisWorkers
                  .filter((el) => el.class == "Адміністративний")
                  .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) *
                  1.235 +
                Math.round(
                  thisWorkers
                    .filter((el) => el.class == "Інженерно технічний")
                    .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) *
                    1.235
                ) +
                sumDirect;
              sumPermanent += permanent;
              sumDirect += direct;
              sumGeneralProduction += generalProduction;
              sumVariables += variables;
              sumOutcome += outcome;
              sumIncome += financing + fin;
              sumFin += fin;
              sumFinancing += financing;
              res.push(
                <Tr>
                  <Td px={1}>{i + ".12"}</Td>
                  <Td>{permanent}</Td>
                  <Td>{direct}</Td>
                  <Td>{generalProduction}</Td>
                  <Td>{variables}</Td>
                  <Td>{outcome}</Td>
                  <Td>{financing + fin}</Td>
                  <Td>{fin}</Td>
                  <Td>{financing}</Td>
                </Tr>
              );
            }
            res.push(
              <>
                <Tr fontWeight={"bold"}>
                  <Td px={1}>Разом</Td>
                  <Td>{sumPermanent}</Td>
                  <Td>{sumDirect}</Td>
                  <Td>{sumGeneralProduction}</Td>
                  <Td>{sumVariables}</Td>
                  <Td>{sumOutcome}</Td>
                  <Td>{sumIncome}</Td>
                  <Td>{sumFin}</Td>
                  <Td>{sumFinancing}</Td>
                </Tr>
                <Tr>
                  <Td colSpan={9} fontWeight={"bold"} fontSize={"20px"}>
                    Результат: період років - {end - start}; Прибуток:
                    {sumIncome - sumOutcome}
                  </Td>
                  <Td></Td>
                </Tr>
              </>
            );

            return res;
          })()}
        </Tbody>
      </Table>
      <Heading textAlign={"center"} size={"sm"} mt={5}>
        Розрахунок собівартості продукції
      </Heading>
    </>
  );
}

export default PlanedIndicatorsBusinessPlan;
