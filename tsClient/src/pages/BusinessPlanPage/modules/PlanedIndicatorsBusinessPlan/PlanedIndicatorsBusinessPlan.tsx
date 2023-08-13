import { Table, Th, Thead, Tr, Text, Box } from "@chakra-ui/react";
import React, { RefObject, useMemo } from "react";
import TableComponent from "src/components/TableComponent";
import { ColumnDef } from "@tanstack/react-table";
import useBusinessPlanFinancingData from "src/shared/hook/BusinessPlanFinancingData/useBusinessPlanFinancingData";
import Description from "src/ui/Description";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { ChartData, ChartOptions } from "chart.js/dist/types/index";
import { LineChart } from "src/shared/charts";

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
  const data = useBusinessPlanFinancingData(start, end, myBusiness);
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
  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Графік прибутковості бізнес-плану",
      },
      // annotation: {
      //   annotations: [
      //     {
      //       type: "line",
      //       mode: "vertical",
      //       scaleID: "x",
      //       value: 6.6, // Значення по осі x, де потрібно відобразити лінію
      //       borderColor: "red",
      //       borderWidth: 1,
      //       label: {
      //         content: "Vertical Line", // Текст підпису лінії
      //         enabled: true,
      //         position: "top",
      //       },
      //     },
      //   ],
      // },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Роки",
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
    },
  };
  // const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const labels = (() => {
    const akk = [];
    for (let i = start; i <= end; i++) {
      if (i == start) akk.push(i);
      akk.push(i);
    }
    return akk;
  })();

  const chartData: ChartData = {
    labels: labels,
    datasets: [
      {
        label: "Постійні",
        // fill: "-2",
        data: data.slice(0, data.length - 1).map((el) => el.permanent),
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: "Витрати",
        data: data.slice(0, data.length - 1).map((el, ind, arr) => {
          return (
            el.outcome + arr.slice(0, ind).reduce((p, c) => p + c.outcome, 0)
          );
        }),
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 6,
      },
      {
        label: "Доходи",
        data: data.slice(0, data.length - 1).map((el, ind, arr) => {
          return (
            +el.incomeNum +
            arr.slice(0, ind).reduce((p, c) => p + +c.incomeNum, 0)
          );
        }),
        backgroundColor: "green",
        borderColor: "green",
      },
    ],
  };
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
                <br />
                Точка без збитковості - це рівень виробництва або продажів, при
                якому прибуток дорівнює нулю, тобто витрати дорівнюють доходам.
                Це важливий показник для бізнесу, який вказує на те, скільки
                потрібно продати товарів або послуг, щоб покрити всі витрати.
                <br />
                Графічний метод визначення точки без збитковості базується на
                побудові графіка, де перетинаються лінії витрат та доходів.
              </Description>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={9}>
              <TableName>Визначення точки беззбитковості (тис. грн.)</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={9} py={1}>
              <TableNumber />
            </Th>
          </Tr>
        </Thead>
      </Table>
      <TableComponent data={data} columns={columns} fontSize={"10px"} />
      <Text fontWeight={"bold"} fontSize={"20px"}>
        Результат: період
        {(() => {
          const monthAmount = 13 - +myBusiness.dateStart?.split("-")[1];
          if (monthAmount == 12) {
            return <> років:-{myBusiness.realizationTime + 1},</>;
          } else {
            return (
              <>
                років:-{myBusiness.realizationTime}, місяців:-
                {monthAmount},
              </>
            );
          }
          return null;
        })()}{" "}
        прибуток:{" "}
        {
          +(
            +data[data.length - 1]?.incomeNum! - data[data.length - 1]?.outcome
          ).toFixed(2)
        }
        .
      </Text>
      <Box>
        <LineChart options={options} data={chartData} />
        <Description >Будуємо графік витрат: На осі абсцис відкладіть обсяги продажів (або виробництва), а на осі ординат - витрати. Перевірте, як змінюються витрати при зміні обсягу.
<br/>
Будуємо графік доходів: На тому ж графіку відкладіть графік доходів. Він може бути лінією, що піднімається з точки початку і зростає зі збільшенням обсягу продажів.
<br/>

Знаходимо точку перетину: Точка, де графіки доходів і витрат перетинаються, вказує на точку без збитковості.
<br/>

Знаходимо значення показників: З точки перетину ви можете зчитати обсяг продажів (або виробництва), який відповідає точці без збитковості.

<br/>
Графічний метод дозволяє визначити необхідний обсяг продажів, при якому бізнес не втрачає і не отримує прибутку, і може бути корисним для планування виробництва та продажів.</Description>
      </Box>
    </>
  );
}

export default PlanedIndicatorsBusinessPlan;
