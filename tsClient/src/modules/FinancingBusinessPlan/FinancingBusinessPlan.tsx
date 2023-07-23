import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { RefObject, useContext, useMemo } from "react";
import TableComponent from "src/components/TableComponent";
import TableContent from "src/components/TableComponent/TableContent";
import { Context } from "src/main";
import { getMonthAmountFromBusinessPlan } from "src/pages/BusinessPlanPage/BusinessPlanPage";
import getYearFromString from "src/shared/funcs/getYearFromString";
import useIncomeTypes from "src/shared/hook/useIncomeTypes";
import useOutcomeGroup from "src/shared/hook/useOutcomeGroup";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
import { Ifinancing } from "../../../../tRPC serv/models/models";
import {
  CashFlowTableHead,
  CashFlowTableHeadBegin,
} from "../CashFlowTable/CashFlowTable";

function FinancingBusinessPlan({
  start,
  end,
  thisCredit,
  thisDerj,
  thisGrand,
  thisInvestment,
  myBusiness,
  aref,
}: {
  start: number;
  end: number;
  myBusiness: resBusinessPlan;
  thisCredit: Ifinancing[] | undefined;
  thisInvestment: Ifinancing[] | undefined;
  thisDerj: Ifinancing[] | undefined;
  thisGrand: Ifinancing[] | undefined;
  aref: RefObject<HTMLTableElement>;
}) {
  const fundraisingPlanData: {
    name: string | number;
    year: number;
    investment: number | "";
    credit: number | "";
    DerjSupport: number | "";
    grant: number | "";
    together: number | "";
    bold?: boolean;
  }[] = [];
  const { income } = useContext(Context);
  const investmentPlan = [];
  const fundraisingPlanColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Рік", accessorKey: "year" },
      { header: "Назва", accessorKey: "name" },
      { header: "Інвестиції", accessorKey: "investment" },
      { header: "Кредит", accessorKey: "credit" },
      { header: "Державна підтримка", accessorKey: "DerjSupport" },
      { header: "Грант", accessorKey: "grant" },
      { header: "Разом", accessorKey: "together" },
    ];
  }, []);
  const investmentColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Показники", accessorKey: "indicators" },
      { header: "1 кв.", accessorKey: "first" },
      { header: "2 кв.", accessorKey: "second" },
      { header: "3 кв.", accessorKey: "third" },
      { header: "4 кв.", accessorKey: "fourth" },
      { header: "За рік", accessorKey: "inYear" },
    ];
  }, []);
  for (let i = start; i <= end; i++) {
    fundraisingPlanData.push(
      ...(thisCredit
        ?.filter((el) => getYearFromString(el.date) == i)
        .map((el) => ({
          name: el.name,
          year: getYearFromString(el.date)!,
          credit: el.cost,
          investment: 0,
          DerjSupport: 0,
          grant: 0,
          together: el.cost,
        })) || []),
      ...(thisInvestment
        ?.filter((el) => getYearFromString(el.date) == i)
        .map((el) => ({
          name: el.name,
          year: getYearFromString(el.date)!,
          investment: el.cost,
          credit: 0,
          DerjSupport: 0,
          grant: 0,
          together: el.cost,
        })) || []),
      ...(thisDerj
        ?.filter((el) => getYearFromString(el.date) == i)
        .map((el) => ({
          name: el.name,
          year: getYearFromString(el.date)!,
          DerjSupport: el.cost,
          investment: 0,
          credit: 0,
          grant: 0,
          together: el.cost,
        })) || []),
      ...(thisGrand
        ?.filter((el) => getYearFromString(el.date) == i)
        .map((el) => ({
          name: el.name,
          year: getYearFromString(el.date)!,
          grant: el.cost,
          DerjSupport: 0,
          investment: 0,
          credit: 0,
          together: el.cost,
        })) || [])
    );
    const sumInv =
      thisInvestment
        ?.filter((el) => getYearFromString(el.date) == i)
        .reduce((p, c) => p + c.cost, 0) || 0;
    const sumCred =
      thisCredit
        ?.filter((el) => getYearFromString(el.date) == i)
        .reduce((p, c) => p + c.cost, 0) || 0;
    const sumDerj =
      thisDerj
        ?.filter((el) => getYearFromString(el.date) == i)
        .reduce((p, c) => p + c.cost, 0) || 0;
    const sumGrand =
      thisGrand
        ?.filter((el) => getYearFromString(el.date) == i)
        .reduce((p, c) => p + c.cost, 0) || 0;
    fundraisingPlanData.push({
      year: i,
      name: "Разом:",
      credit: sumCred,
      DerjSupport: sumDerj,
      grant: sumGrand,
      investment: sumInv,
      together: sumCred + sumDerj + sumGrand + sumInv,
      bold: true,
    });
    // const mshp ;
    const machinesValue = myBusiness.buying_machines
      .filter((el) => getYearFromString(el.date) == i)
      .reduce((p, c) => p + c.cost, 0);
    const buildingValue = myBusiness.buildings
      .filter((el) => getYearFromString(el.date) == i)
      .reduce((p, c) => p + +c.startPrice, 0);

    const mshpValue = myBusiness.MSHP.filter(
      (el) => getYearFromString(el.date) == i
    ).reduce((p, c) => p + c.cost * c.amount, 0);
    const creatingValue = 0;
    const opersValue = 0;
    investmentPlan.push(
      { indicators: "Прям інвестицій", bold: true },
      {
        indicators: "Техніка та обладнання",
        inYear: machinesValue,
      },
      {
        indicators: "Будівлі та споруди",
        inYear: buildingValue,
      },
      { indicators: "МШП", inYear: mshpValue },
      {
        indicators: "Всього прямих інвестицій",
        bold: true,
        inYear: machinesValue + buildingValue + mshpValue,
      },
      { indicators: "Створення біоактиву", inYear: creatingValue },
      { indicators: "Операційні витрати", inYear: opersValue },
      {
        indicators: "Всього інвестицій " + i,
        extraBold: true,
        inYear:
          machinesValue +
          buildingValue +
          mshpValue +
          creatingValue +
          opersValue,
      }
    );
  }
  // fundraisingPlanData.push()
  investmentPlan.push({ indicators: "Вартість проекту", bold: true });
  return (
    <>
      <SectionTitle aref={aref}>Фінансування</SectionTitle>
      <Heading textAlign={"center"} size={"sm"} mt={5}>
        План залучення коштів
      </Heading>
      <TableComponent
        data={fundraisingPlanData}
        columns={fundraisingPlanColumns}
      />
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <TableName>План інвестування коштів</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
        </Thead>
        <TableContent data={investmentPlan} columns={investmentColumns} />
      </Table>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={5}>
              <TableName>Грошовий потік (річний)</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={5}>
              <TableNumber />
            </Th>
          </Tr>
        </Thead>
        {(() => {
          const res = [];
          let startSum = 0;
          for (let i = start; i <= end; i++) {
            const saleValue = myBusiness.busProds
              .filter((el) => el.year == i - start)
              .reduce((p, c) => {
                const vegetation = income.vegetationYear?.find(
                  (e) => e.busProdId == c.id && e.techCartId == c.techCartId
                );
                const myYield = income.yieldPlant.find(
                  (e) => e.productId == c.productId
                );
                const amount =
                  +(
                    c.area *
                    myYield?.yieldPerHectare! *
                    (vegetation?.allCoeff || 1)
                  ).toFixed(2) || 0;
                return p + +(amount * (c.price || 0)).toFixed(2);
              }, 0);
            const incomeValue =
              myBusiness.financings
                .filter((e) => getYearFromString(e.date) == i)
                .reduce((p, c) => p + c.cost, 0) + saleValue;
            const outcome =
              myBusiness.MSHP.filter(
                (el) => getYearFromString(el.date) == i
              ).reduce((p, c) => p + c.amount * c.cost, 0) +
              myBusiness.buying_machines
                .filter((el) => getYearFromString(el.date) == i)
                .reduce((p, c) => p + c.amount * c.cost, 0) +
              myBusiness.buildings
                .filter((el) => getYearFromString(el.date) == i)
                .reduce((p, c) => p + +c.startPrice, 0) +
              myBusiness.outcomes
                .filter((e) => getYearFromString(e.date) == i)
                .reduce(
                  (p, c) =>
                    p +
                    c.costMonth *
                      getMonthAmountFromBusinessPlan(
                        myBusiness.dateStart,
                        i,
                        start
                      ),
                  0
                ) +
              myBusiness.busProds
                .filter((el) => el.year == i - start)
                .reduce(
                  (p, c) => p + (c.tech_cart?.costHectare || 0) * c.area,
                  0
                );
            res.push(
              <CashFlowTableHead
                year={i}
                startSum={startSum}
                key={i + "head"}
              />
            );
            res.push(
              <Tbody key={i + "body"}>
                {useIncomeTypes.map((el) => {
                  const value = myBusiness.financings
                    .filter(
                      (e) =>
                        getYearFromString(e.date) == i && e.typeName == el.name
                    )
                    .reduce((p, c) => p + c.cost, 0);
                  return value ? (
                    <Tr key={el.id}>
                      <Td>{i}</Td>
                      <Td>{el.name}</Td>
                      <Td>
                        {myBusiness.financings
                          .filter(
                            (e) =>
                              getYearFromString(e.date) == i &&
                              e.typeName == el.name
                          )
                          .reduce((p, c) => p + c.cost, 0)}
                      </Td>
                    </Tr>
                  ) : null;
                })}
                <Tr>
                  <Td>{i}</Td>
                  <Td>{"Реалізація"}</Td>
                  <Td>{saleValue}</Td>
                </Tr>
                <Tr>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>{"МШП"}</Td>
                  <Td>
                    {myBusiness.MSHP.filter(
                      (el) => getYearFromString(el.date) == i
                    ).reduce((p, c) => p + c.amount * c.cost, 0)}
                  </Td>
                </Tr>
                <Tr>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>{"Техніка та обладнання"}</Td>
                  <Td>
                    {myBusiness.buying_machines
                      .filter((el) => getYearFromString(el.date) == i)
                      .reduce((p, c) => p + c.amount * c.cost, 0)}
                  </Td>
                </Tr>
                <Tr>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>{"Будівлі та споруди"}</Td>
                  <Td>
                    {myBusiness.buildings
                      .filter((el) => getYearFromString(el.date) == i)
                      .reduce((p, c) => p + +c.startPrice, 0)}
                  </Td>
                </Tr>
                {useOutcomeGroup.map((el) => {
                  const value = myBusiness.outcomes
                    .filter(
                      (e) =>
                        getYearFromString(e.date) == i && e.group == el.name
                    )
                    .reduce(
                      (p, c) =>
                        p +
                        c.costMonth *
                          getMonthAmountFromBusinessPlan(
                            myBusiness.dateStart,
                            i,
                            start
                          ),
                      0
                    );
                  return value ? (
                    <Tr key={el.id}>
                      <Td>{i}</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td>{el.name}</Td>
                      <Td>{value}</Td>
                    </Tr>
                  ) : null;
                })}
                <Tr>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>Прямі</Td>
                  <Td>
                    {myBusiness.busProds
                      .filter((el) => el.year == i - start)
                      .reduce(
                        (p, c) => p + (c.tech_cart?.costHectare || 0) * c.area,
                        0
                      )}
                  </Td>
                </Tr>
                <Tr fontWeight={"extrabold"}>
                  <Td></Td>
                  <Td>Оборот:</Td>
                  <Td>{incomeValue}</Td>
                  <Td>Оборот:</Td>
                  <Td>{outcome}</Td>
                </Tr>
              </Tbody>
            );
            startSum += incomeValue;
            startSum -= outcome;
          }
          res.push(
            <CashFlowTableHeadBegin
              startSum={startSum}
              year={end + 1}
              key={end + 1}
            />
          );
          return res;
        })()}
      </Table>
    </>
  );
}

export default FinancingBusinessPlan;
