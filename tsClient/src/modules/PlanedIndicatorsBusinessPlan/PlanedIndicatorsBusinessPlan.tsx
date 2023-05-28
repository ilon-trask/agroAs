import { Table, Th, Thead, Tr, Heading, Tbody, Td } from "@chakra-ui/react";
import React, { RefObject, useContext } from "react";
import { Context } from "src/main";
import useVegetationYears from "src/shared/hook/useVegetationYears";
import Description from "src/ui/Description";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";

function PlanedIndicatorsBusinessPlan({
  start,
  end,
  myBusiness,
  aref,
}: {
  start: number;
  end: number;
  myBusiness: resBusinessPlan;
  aref: RefObject<HTMLTableElement>;
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
            <Th p={0}>Змінні</Th>
            <Th p={0} fontWeight={"normal"}>
              Прямі
            </Th>
            <Th p={0} fontWeight={"normal"}>
              Заг&nbsp;вир
            </Th>
            <Th p={0}>Витрати</Th>
            <Th p={0}>Дохід</Th>
            <Th p={0} fontWeight={"normal"}>
              Виручка
            </Th>
            <Th p={0} fontWeight={"normal"}>
              Підтримка
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
            for (let i = start; i < end; i++) {
              let fin = 0;
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
                fin += sum * el.culture?.priceBerry!;
              });
              res.push(
                <>
                  <Tr>
                    <Td px={1}>{i + ".12"}</Td>
                  </Tr>

                  <Tr>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>{fin}</Td>
                  </Tr>
                </>
              );
            }
            return res;
          })()}
          <Tr fontWeight={"bold"}>
            <Td px={1}>Разом</Td>
          </Tr>
        </Tbody>
      </Table>
      <Heading textAlign={"center"} size={"sm"} mt={5}>
        Розрахунок собівартості продукції
      </Heading>
    </>
  );
}

export default PlanedIndicatorsBusinessPlan;
