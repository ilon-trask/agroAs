import { Table, Th, Thead, Tr, Heading, Td, Text } from "@chakra-ui/react";
import React, { RefObject, useContext, useMemo } from "react";
import TableComponent from "src/components/TableComponent";
import { ColumnDef } from "@tanstack/react-table";
import { Context } from "src/main";
import useBusinessPlanFinancingData from "src/shared/hook/BusinessPlanFinancingData/useBusinessPlanFinancingData";
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
}: {
  start: number;
  end: number;
  myBusiness: resBusinessPlan;
  thisWorkers: Iworker[];
  aref: RefObject<HTMLTableElement>;
}) {
  const { income } = useContext(Context);

  const data = useBusinessPlanFinancingData(
    start,
    end,
    myBusiness,
    income,
    thisWorkers
  );

  const columns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "", accessorKey: "date" },
      { header: "Постійні", accessorKey: "permanent" },
      { header: "Прямі", accessorKey: "direct" },
      { header: "Заг вир", accessorKey: "generalProduction" },
      { header: "Змінні", accessorKey: "variables" },
      {
        header: "Витрати",
        accessorKey: "outcome",
        cell: ({ getValue }) => (
          <Text fontWeight={"bold"}>{getValue() as string}</Text>
        ),
      },
      {
        header: "Дохід",
        accessorKey: "incomeNum",
        cell: ({ getValue }) => (
          <Text fontWeight={"bold"}>{getValue() as string}</Text>
        ),
      },
      { header: "Виручка", accessorKey: "fin" },
      { header: "Залучення коштів", accessorKey: "financing" },
    ];
  }, []);
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
              <TableNumber />
            </Td>
          </Tr>
        </Thead>
      </Table>
      <TableComponent data={data} columns={columns} />
      <Text fontWeight={"bold"} fontSize={"20px"}>
        Результат: період років - {end - start}; Прибуток:
        {data[data.length - 1]?.incomeNum! - data[data.length - 1]?.outcome}
      </Text>
      <Heading textAlign={"center"} size={"sm"} mt={5}>
        Розрахунок собівартості продукції
      </Heading>
    </>
  );
}

export default PlanedIndicatorsBusinessPlan;
