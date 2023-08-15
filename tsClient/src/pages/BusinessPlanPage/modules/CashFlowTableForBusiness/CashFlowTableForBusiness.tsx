import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  CashFlowTableHead,
  CashFlowTableHeadBegin,
} from "src/modules/CashFlowTable/CashFlowTable";
import useIncomeTypes from "src/shared/hook/useIncomeTypes";
import useOutcomeGroup from "src/shared/hook/useOutcomeGroup";
import Description from "src/ui/Description";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { ChartData, ChartOptions } from "chart.js/dist/types/index";
import { ChartChart } from "src/shared/charts";
function CashFlowTableForBusiness({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan;
  start: number;
  end: number;
}) {
  const options: ChartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },

    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const labels: number[] = [];
  const realization: number[] = [];
  const otherIncome: number[] = [];
  const investment: number[] = [];
  const operation: number[] = [];
  const [line, setLine] = useState<number[]>([]);
  useEffect(
    () =>
      setLine(
        realization.map(
          (el, ind) =>
            el + otherIncome[ind] + (investment[ind] + operation[ind])
        )
      ),
    [JSON.stringify(realization)]
  );
  const data: ChartData = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "Залишок",
        data: line,
        backgroundColor: "red",
        borderColor: "red",
      },
      {
        type: "bar",
        label: "Реалізація",
        data: realization,
        backgroundColor: "rgb(7, 179, 16)",
      },
      {
        type: "bar",
        label: "Інші доходи",
        data: otherIncome,
        backgroundColor: "rgb(0, 117, 6)",
      },
      {
        type: "bar",
        label: "Інвестиційні",
        data: investment,
        backgroundColor: "rgb(163, 3, 25)",
      },
      {
        type: "bar",
        label: "Операційні",
        data: operation,
        backgroundColor: "rgb(201, 12, 37)",
      },
    ],
  };

  return (
    <>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Td colSpan={5}>
              <Description>
                Грошовий потік є ключовим фінансовим показником, який відображає
                рух грошових коштів у бізнесі на протязі певного періоду. Він
                включає всі вхідні та вихідні операції, які стосуються грошових
                коштів. Оцінка грошового потоку допомагає фермерам аналізувати
                фінансовий стан свого бізнесу, прогнозувати майбутні прибутки та
                витрати, а також планувати інвестиції та погашення
                заборгованості. Ось деякі ключові показники грошового потоку:
                <br />
                Операційний грошовий потік (ОГП):
                <br />
                ОГП відображає грошовий потік, пов'язаний з основною
                сільськогосподарською діяльністю. Він включає грошові витрати на
                закупівлю сировини, виробництво продукції, оплату праці,
                податки, операційні доходи від продажу продукції та інші
                операційні операції. Позитивний ОГП вказує на те, що бізнес
                генерує достатньо грошових коштів зі своєї основної діяльності.
                <br />
                Інвестиційний грошовий потік:
                <br />
                Інвестиційний грошовий потік відображає витрати, пов'язані з
                придбанням нового обладнання, розширенням ділянок, модернізацією
                інфраструктури та іншими інвестиційними проектами. Цей потік
                може бути від'ємним на початку, але повинен призвести до
                покращення продуктивності та прибутковості у майбутньому.
                <br />
                Фінансовий грошовий потік:
                <br />
                Фінансовий грошовий потік відображає операції, пов'язані з
                фінансовою діяльністю, такі як виплати за кредитами, отримання
                позик, виплати дивідендів акціонерам, придбання або продаж
                цінних паперів. Цей показник впливає на загальний грошовий
                баланс підприємства.
                <br />
                Чистий грошовий потік:
                <br />
                Чистий грошовий потік - це різниця між вхідними та вихідними
                грошовими потоками, включаючи ОГП, інвестиційний потік та
                фінансовий потік. Цей показник дозволяє зрозуміти, наскільки
                ефективно фермерський бізнес генерує грошові кошти та
                використовує їх для розвитку та забезпечення стабільності.
              </Description>
            </Td>
          </Tr>
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
            labels.push(i);
            res.push(
              <CashFlowTableHead
                year={i}
                startSum={+startSum.toFixed(2)}
                key={i + "head"}
              />
            );
            const saleValue = myBusiness.busProds
              .filter((el) => el.year == i - start)
              .reduce((p, c) => {
                const vegetationYear = c.vegetationYear;
                const amount =
                  +(
                    c.area *
                    vegetationYear?.potentialYieldPerHectare! *
                    (vegetationYear?.allCoeff || 1)
                  ).toFixed(2) || 0;
                return p + +(amount * (c.price || 0)).toFixed(2);
              }, 0);
            const incomeValue =
              myBusiness.financings
                .filter((el) => el.year == i - start)
                .reduce((p, c) => p + c.cost, 0) + saleValue;
            const MSHPValue = myBusiness.MSHP.filter(
              (el) => el.year == i - start
            ).reduce((p, c) => p + c.price * c.amount, 0);
            const machineValue = myBusiness.buying_machines
              .filter((el) => el.year == i - start)
              .reduce((p, c) => p + c.price * c.amount, 0);
            const buildingValue = myBusiness.buildings
              .filter((el) => el.year == i - start)
              .reduce((p, c) => p + +c.startPrice, 0);
            const directValue = myBusiness.busProds
              .filter((el) => el.year == i - start)
              .reduce(
                (p, c) => p + (c.tech_cart?.costHectare || 0) * c.area,
                0
              );
            let outcome =
              MSHPValue + machineValue + buildingValue + directValue;
            realization.push(+saleValue.toFixed(2));
            otherIncome.push(+(incomeValue - saleValue).toFixed(2));
            investment.push(
              -+(MSHPValue + machineValue + buildingValue).toFixed(2)
            );

            res.push(
              <Tbody key={i + "body"}>
                {useIncomeTypes.map((el) => {
                  const value = myBusiness.financings
                    .filter((e) => e.year == i - start && e.typeName == el.name)
                    .reduce((p, c) => p + c.cost, 0);

                  return value ? (
                    <Tr key={el.id}>
                      <Td>{i}</Td>
                      <Td>{el.name}</Td>
                      <Td>{value.toFixed(2)}</Td>
                    </Tr>
                  ) : null;
                })}
                <Tr>
                  <Td>{i}</Td>
                  <Td>{"Реалізація"}</Td>
                  <Td>{saleValue.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>{"МШП"}</Td>
                  <Td>{MSHPValue.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>{"Техніка та обладнання"}</Td>
                  <Td>{machineValue.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>{"Будівлі та споруди"}</Td>
                  <Td>{buildingValue.toFixed(2)}</Td>
                </Tr>
                {(() => {
                  let akk = 0;
                  const res = useOutcomeGroup.map((el) => {
                    const value = myBusiness.outcomes
                      .filter((e) => e.year == i - start && e.group == el.name)
                      .reduce((p, c) => p + (c.costYear || 0), 0);
                    akk += value;
                    if (value) outcome += value;
                    return value ? (
                      <Tr key={el.id}>
                        <Td>{i}</Td>
                        <Td></Td>
                        <Td></Td>
                        <Td>{el.name}</Td>
                        <Td>{value.toFixed(2)}</Td>
                      </Tr>
                    ) : null;
                  });
                  operation.push(-+(akk + directValue).toFixed(2));
                  return res;
                })()}
                <Tr>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>Прямі</Td>
                  <Td>{directValue.toFixed(2)}</Td>
                </Tr>
                <Tr fontWeight={"extrabold"}>
                  <Td></Td>
                  <Td>Оборот:</Td>
                  <Td>{incomeValue.toFixed(2)}</Td>
                  <Td>Оборот:</Td>
                  <Td>{outcome.toFixed(2)}</Td>
                </Tr>
              </Tbody>
            );
            startSum += incomeValue;
            startSum -= outcome;
          }
          res.push(
            <CashFlowTableHeadBegin
              startSum={+startSum.toFixed(2)}
              year={end + 1}
              key={end + 1}
            />
          );
          return res;
        })()}
      </Table>
      <Box>
        <ChartChart data={data} />
      </Box>
    </>
  );
}

export default CashFlowTableForBusiness;
