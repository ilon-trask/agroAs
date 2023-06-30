import { Heading, Table, Th, Thead, Tr } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { RefObject, useMemo } from "react";
import TableComponent from "src/components/TableComponent";
import TableContent from "src/components/TableComponent/TableContent";
import getYearFromString from "src/shared/funcs/getYearFromString";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { Ifinancing } from "../../../../tRPC serv/models/models";

function FinancingBusinessPlan({
  start,
  end,
  thisCredit,
  thisDerj,
  thisGrand,
  thisInvestment,
  aref,
}: {
  start: number;
  end: number;
  thisCredit: Ifinancing[] | undefined;
  thisInvestment: Ifinancing[] | undefined;
  thisDerj: Ifinancing[] | undefined;
  thisGrand: Ifinancing[] | undefined;
  aref: RefObject<HTMLTableElement>;
}) {
  const fundraisingPlanData: {
    name: string | number;
    date: string;
    investment: number | "";
    credit: number | "";
    DerjSupport: number | "";
    grant: number | "";
    together: number | "";
    bold?: boolean;
  }[] = [];
  const investmentPlan = [];
  const fundraisingPlanColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Назва", accessorKey: "name" },
      { header: "Дата", accessorKey: "date" },
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
  for (let i = start; i < end; i++) {
    fundraisingPlanData.push(
      ...(thisCredit
        ?.filter((el) => getYearFromString(el.date) == i)
        .map((el) => ({
          name: el.name,
          date: el.date,
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
          date: el.date,
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
          date: el.date,
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
          date: el.date,
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
      name: i,
      date: "",
      credit: sumCred,
      DerjSupport: sumDerj,
      grant: sumGrand,
      investment: sumInv,
      together: sumCred + sumDerj + sumGrand + sumInv,
      bold: true,
    });
    investmentPlan.push(
      { indicators: i },
      { indicators: "Прям інвестицій" },
      { indicators: "Всього прямих інвестицій" },
      { indicators: "Всього інвестицій" }
    );
  }
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
    </>
  );
}

export default FinancingBusinessPlan;
