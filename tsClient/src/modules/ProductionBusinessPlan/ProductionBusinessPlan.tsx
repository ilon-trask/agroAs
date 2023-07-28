import { Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react-lite";
import React, { RefObject, useContext, useMemo } from "react";
import TableContent from "src/components/TableComponent/TableContent";
import { Context } from "src/main";
import { getMonthAmountFromBusinessPlan } from "src/pages/BusinessPlanPage/BusinessPlanPage";
import TEJustificationContent from "src/pages/TEJustification/TEJustificationContent";
import getYearFromString from "src/shared/funcs/getYearFromString";
import useVegetationYears from "src/shared/hook/useVegetationYears";
import Description from "src/ui/Description";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import Paragraph from "src/ui/Paragraph";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
import { CartsTableHeadRow } from "../CartsTable";
import { PlanIncomeProductionTableHeadRow } from "../PlanIncomeProductionTable/PlanIncomeProductionTable";
import { SaleTableHeadRows } from "../SaleTable/SaleTable";

function ProductionBusinessPlan({
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
  const { income, map, TEJ } = useContext(Context);
  let costHand = 0;
  let costMech = 0;
  let costMechTot = 0;

  // const laborСostsData = (() => {
  //   const res: {
  //     workType: string;
  //     operation: string;
  //     amount: number | string;
  //     averagePrice: number | string;
  //     sum: number | string;
  //     bold?: boolean;
  //   }[] = [
  //     {
  //       workType: "Муханізовані роботи",
  //       operation: "",
  //       amount: "Люд/год",
  //       averagePrice: "Грн/год",
  //       sum: "",
  //       bold: true,
  //     },
  //   ];

  //   thisMaps.map((e) => {
  //     let myJustification = TEJ.justification?.find((el) => {
  //       return el.techCartId! == +e.id!;
  //     });

  //     return map.opers
  //       .filter((el) => el.techCartId == e.id)
  //       .map((el) => {
  //         const totalCost = el.costMachineWork! * myJustification?.area!;

  //         const peopleHour =
  //           Math.round(
  //             (totalCost /
  //               ((e?.salary! / 176) *
  //                 map.grade.find(
  //                   (e) => e?.id! == el?.aggregate?.tractor.gradeId
  //                 )?.coefficient!)) *
  //               100
  //           ) / 100;

  //         const costMech = Math.round(((totalCost / peopleHour) * 100) / 100);
  //         if (el.cell == "costMechanical")
  //           res.push({
  //             workType: "",
  //             operation: el.nameOperation,
  //             amount: peopleHour,
  //             averagePrice: costMech,
  //             sum: totalCost,
  //             bold: true,
  //           });
  //       });
  //   });
  //   res.push({
  //     workType: "Ручні роботи",
  //     operation: "",
  //     amount: "Люд/год",
  //     averagePrice: "Грн/год",
  //     sum: "",
  //     bold: true,
  //   });
  //   thisMaps.map((e) => {
  //     let myJustification: resTechnologicalEconomicJustification | undefined =
  //       TEJ.justification?.find((el) => {
  //         return el.techCartId! == +e.id!;
  //       });
  //     return map.opers
  //       .filter((el) => el.techCartId == e.id)
  //       .map((el) => {
  //         const totalCost = el.costHandWork! * myJustification?.area!;
  //         const peopleHour =
  //           Math.round(
  //             (totalCost /
  //               ((e?.salary! / 176) *
  //                 map.grade.find(
  //                   (e) =>
  //                     e.id! == el.cost_hand_work?.gradeId! ||
  //                     el.aggregate?.agricultural_machine.gradeId
  //                 )?.coefficient!)) *
  //               100
  //           ) / 100;
  //         const costHand = Math.round(((totalCost / peopleHour) * 100) / 100);
  //         if (
  //           el.cell == "costHandWork" ||
  //           (el.cell == "costMechanical" && el.costHandWork)
  //         )
  //           res.push({
  //             workType: "",
  //             operation: el.nameOperation,
  //             amount: peopleHour,
  //             averagePrice: costHand,
  //             sum: totalCost,
  //           });
  //       });
  //   });
  //   res.push({
  //     workType: "Всього по оплаті праці",
  //     amount: "",
  //     averagePrice: "",
  //     operation: "",
  //     sum: 0,
  //     bold: true,
  //   });
  //   return res;
  // })();
  const plannedStructureData = [];
  const generalData = [];
  for (let i = start; i < end; i++) {
    const busProds = myBusiness?.busProds?.filter((el) => el.year == i - start);
    const lands = myBusiness?.lands?.filter(
      (el) => getYearFromString(el.date) == i
    );

    generalData.push(
      ...busProds.map((el) => ({
        year: i,
        culture: el.product?.culture?.name,
        name,
        technology: el.cultivationTechnology?.name,
        area: el.area,
      }))
    );
    const area = busProds.reduce((p, c) => p + c.area, 0);
    const totalArea = lands.reduce((p, c) => p + c.area, 0);
    generalData.push({
      year: i,
      bold: true,
      culture: "Разом:",
      area: area,
      totalArea: totalArea,
      coefficient: totalArea ? (area / totalArea).toFixed(2) : 0,
    });
    plannedStructureData.push(
      ...busProds.map((el) => {
        const vegetationYear = el.vegetationYear;
        return {
          year: i,
          culture: el.product?.culture?.name,
          product: el.product?.name,
          density: vegetationYear?.numberPlantsPerHectare,
          yieldHectare: (
            (vegetationYear?.potentialYieldPerHectare || 0) *
            (vegetationYear?.allCoeff || 0)
          ).toFixed(2),
          yield: (
            (vegetationYear?.potentialYieldPerHectare || 0) *
            (vegetationYear?.allCoeff || 0) *
            el.area
          ).toFixed(2),
        };
      })
    );
    // plannedStructureData.push({
    //   year: i,

    //   ...myBusiness?.busProds.reduce((p, el) => {
    //     const vegetationYear = income.vegetationYear?.find(
    //       (e) => e.techCartId == el.techCartId
    //     );
    //     //@ts-ignore
    //     // p[el.culture?.name! + el.cultivationTechnology.name! + "coef"] =
    //     //   vegetation?.allCoeff || 0;
    //     // //@ts-ignore
    //     // p[el.culture?.name! + el.cultivationTechnology.name! + "yield"] =
    //     //   Math.round(
    //     //     myYield?.yieldPerHectare! * (vegetation?.allCoeff || 0) * 100
    //     //   ) / 100;
    //     return p;
    //   }, {}),
    // });
  }
  const generalColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Рік", accessorKey: "year" },
      { header: "КУЛЬТУРИ", accessorKey: "culture" },
      { header: "ТЕХНОЛОГІЇ", accessorKey: "technology" },
      { header: "Площа під культурами", accessorKey: "area" },
      { header: "Загальна площа", accessorKey: "totalArea" },
      { header: "Коефіцієнт", accessorKey: "coefficient" },
    ];
  }, []);
  const plannedStructureColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Рік", accessorKey: "year" },
      { header: "Культура", accessorKey: "culture" },
      { header: "Продукт", accessorKey: "product" },
      { header: "Густота", accessorKey: "density" },
      { header: "Уражйність (1 га)", accessorKey: "yieldHectare" },
      { header: "Планова урожайність", accessorKey: "yield" },
    ];
  }, []);
  const laborСostsColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Види робіт", accessorKey: "workType" },
      { header: "Операція", accessorKey: "operation" },
      { header: "Кількість", accessorKey: "amount" },
      { header: "Середня ціна", accessorKey: "averagePrice" },
      { header: "Сума", accessorKey: "sum" },
    ];
  }, []);
  return (
    <>
      <SectionTitle aref={aref}>Виробництво</SectionTitle>
      <Paragraph>
        4.1. Загальна інформація про виробництво та технології.
      </Paragraph>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <TableName>Загальні дані про культури та технології</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
        </Thead>
        <TableContent data={generalData} columns={generalColumns} />
      </Table>
      <Description>
        Урожайність розрахована з врахуванням якості посадкового матеріалу та
        запланованої технології.
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={1 + myBusiness?.busProds.length! * 2}>
              <TableName>Планова структура урожайності</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={1 + myBusiness?.busProds.length! * 2}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
        </Thead>
        <TableContent
          data={plannedStructureData}
          columns={plannedStructureColumns}
        />
      </Table>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={2}>
              <TableName>Ключові особливості технології</TableName>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Строки створення насаджень</Td>
            <Td>
              Кращими строками закладки саду є: осінь (жовтень – листопад) весна
              (квітень-травень)
            </Td>
          </Tr>
          <Tr>
            <Td>Підготовка ділянки</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Зрошення</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Висаджування саджанців</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Підживлення</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Догляд за саджанцями</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Моніторинг</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Боротьба з хворобами і шкідниками</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Збір</Td>
            <Td>Ручний</Td>
          </Tr>
          <Tr>
            <Td>Зберігання</Td>
            <Td>
              На території саду необхідно облаштувати складське та виробниче
              приміщення, де буде відбуватися охолодження, зберігання,
              сортування та пакування продукції.
            </Td>
          </Tr>
          <Tr>
            <Td>Персонал</Td>
            <Td>
              Пердбачено кімнату персоналу, що буде доглядати за садом та
              охоронців.
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={4}>
              <TableName>Технологічні карти</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={4}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <CartsTableHeadRow role={"authenticated"} isPlan={true} />
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i < end; i++) {
              const busProds = myBusiness.busProds.filter(
                (el) => el.year == i - start
              );
              res.push(
                ...busProds.map((el) => (
                  <Tr>
                    <Td>{i}</Td>
                    <Td>{el.tech_cart?.nameCart}</Td>
                    <Td>{el.area}</Td>
                    <Td>{(el.tech_cart?.costHectare || 0) * el.area}</Td>
                    <Td>{el.tech_cart?.costHectare}</Td>
                  </Tr>
                ))
              );
              res.push(
                <Tr fontWeight={"bold"} key={i}>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td>{busProds.reduce((p, c) => p + c.area, 0)}</Td>
                  <Td>
                    {busProds.reduce(
                      (p, c) => p + (c.tech_cart?.costHectare || 0) * c.area,
                      0
                    )}
                  </Td>
                  <Td>
                    {busProds.reduce(
                      (p, c) => p + (c.tech_cart?.costHectare || 0),
                      0
                    )}
                  </Td>
                </Tr>
              );
            }
            res.push(
              <Tr key={end + 1}>
                <Td></Td>
                <Td>ВСЕ РАЗОМ:</Td>
                <Td></Td>
                <Td>
                  {myBusiness.busProds.reduce(
                    (p, c) => p + (c.tech_cart?.costHectare || 0) * c.area,
                    0
                  )}
                </Td>
                <Td></Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
      </Table>
      <Paragraph>4.2.Основні засоби, ресурси та біологічні активи</Paragraph>
      <Description>
        Основні засоби, що використовуються під час операційної діяльності
        підприємства втрачають свою вартість через фізичний знос і моральне
        старіння. Знос (або амортизація) є однією зі складових собівартості
        товарів, але не є причиною відтоку реальних грошей. Найбільшого
        поширення набув механізм лінійної амортизації, коли річна норма
        амортизації встановлюється виходячи з терміну служби обладнання.
        Первісна вартість основних засобів - це вартість, за якою засіб було
        придбано чи оприбутковано на баланс підприємства. Балансова вартість або
        залишкова вартість = Первісна вартість - нарахований знос. Амортизаційні
        відрахування в розрахунках прийняті відповідно нормативним значенням. В
        основу розрахунку покладена вартість комплексу технічних приміщень та
        огорожі.В якості базового методу розрахунку амортизації було обрано
        лінійний метод. При розрахунку амортизації були використані положення
        Податкового кодексу України.
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={5}>
              <TableName>Техніка та обладнання</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={5}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Назва основного засобу</Th>
            <Th>Кількість</Th>
            <Th>Первісна вартість</Th>
            <Th>Амортизація (місяць)</Th>
            <Th>Початок амортизації</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const machines = myBusiness?.buying_machines?.filter(
                (el) => getYearFromString(el.date) == i
              );
              if (machines) {
                res.push(
                  machines.map((el) => (
                    <Tr key={el.id!}>
                      <Td>{i}</Td>
                      <Td>{el.name}</Td>
                      <Td>{el.amount}</Td>
                      <Td>{el.amount * el.cost}</Td>
                      <Td></Td>
                      <Td></Td>
                    </Tr>
                  ))
                );
              }
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td>{machines.reduce((p, c) => p + c.amount, 0)}</Td>
                  <Td>{machines.reduce((p, c) => p + c.amount * c.cost, 0)}</Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
            }
            res.push(
              <Tr key={end + 1} fontWeight={"bold"}>
                <Td></Td>
                <Td>ВСЕ РАЗОМ:</Td>
                <Td>
                  {myBusiness.buying_machines.reduce((p, c) => p + c.amount, 0)}
                </Td>
                <Td>
                  {myBusiness.buying_machines.reduce(
                    (p, c) => p + c.amount * c.cost,
                    0
                  )}
                </Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
      </Table>
      <Description>
        В якості базового методу розрахунку амортизації біологічних активів було
        обрано лінійний метод. При розрахунку амортизації були використані
        положення Податкового кодексу України.
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={5}>
              <TableName>Будівлі та споруди</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={5}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Назва біологічного активу</Th>
            <Th>Кількість</Th>
            <Th>Первісна вартість</Th>
            <Th>Амортизація (місяць)</Th>
            <Th>Початок амортизації</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const buildings = myBusiness?.buildings?.filter(
                (el) => getYearFromString(el.date) == i
              );
              res.push(
                buildings.map((el) => (
                  <Tr key={el.id!}>
                    <Td>{i}</Td>
                    <Td>{el.name}</Td>
                    <Td>1</Td>
                    <Td>{el.startPrice}</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                ))
              );
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td>{buildings.length}</Td>
                  <Td>{buildings.reduce((p, c) => p + +c.startPrice, 0)}</Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
            }
            res.push(
              <Tr key={end + 1} fontWeight={"bold"}>
                <Td></Td>
                <Td>ВСЕ РАЗОМ:</Td>
                <Td>{myBusiness?.buildings?.length}</Td>
                <Td>
                  {myBusiness?.buildings?.reduce(
                    (p, c) => p + +c.startPrice,
                    0
                  )}
                </Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
      </Table>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={5}>
              <TableName>Малоцінні і швидко зношувальні предмети</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={5}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Назва МШП</Th>
            <Th>Кількість</Th>
            <Th>Первісна вартість</Th>
            <Th>Амортизація (місяць)</Th>
            <Th>Початок амортизації</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const MSHP = myBusiness?.MSHP?.filter(
                (el) => getYearFromString(el.date) == i
              );

              res.push(
                MSHP.map((el) => (
                  <Tr key={el.id!}>
                    <Td>{i}</Td>
                    <Td>{el.name}</Td>
                    <Td>{el.amount}</Td>
                    <Td>{el.amount * el.cost}</Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                ))
              );

              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td>{MSHP.reduce((p, c) => p + c.amount, 0)}</Td>
                  <Td>{MSHP.reduce((p, c) => p + c.amount * c.cost, 0)}</Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
            }
            res.push(
              <Tr key={end + 1} fontWeight={"bold"}>
                <Td></Td>
                <Td>ВСЕ РАЗОМ:</Td>
                <Td>{myBusiness?.MSHP?.reduce((p, c) => p + c.amount, 0)}</Td>
                <Td>
                  {myBusiness?.MSHP?.reduce((p, c) => p + c.amount * c.cost, 0)}
                </Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
      </Table>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th
              colSpan={
                (myBusiness?.realizationTime! <= 7
                  ? myBusiness?.realizationTime!
                  : 6) + 2
              }
            >
              <TableName>{`План амортизації проекту`}</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th
              colSpan={
                (myBusiness?.realizationTime! <= 7
                  ? myBusiness?.realizationTime!
                  : 6) + 2
              }
            >
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Техніка і обладнання</Th>
            <Th>Будівлі і споруди</Th>
            <Th>МШП</Th>
            <Th>Біо активи</Th>
            <Th>
              Сума <br />
              амортизації
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              if (i <= start + 6) {
                res.push(
                  <Tr key={i}>
                    <Td>{i}</Td>
                  </Tr>
                );
              }
            }
            return res;
          })()}
          <Tr>
            <Td>Разом</Td>
          </Tr>
        </Tbody>
      </Table>
      <Description>
        Для планування необхідних ресурсів використано нормативний метод та дані
        про потребу основних ресурсів записано у табличному вигляді.
      </Description>
      {/* <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={7}>
              <TableName>Основні ресурси</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Назва ресурсу</Th>
            <Th>Одиниця виміру</Th>
            <Th>Кількість</Th>
            <Th>Ціна</Th>
            <Th>Сума</Th>
            <Th>Під культуру</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              res.push(
                myBusiness.busProds
                  .filter((el) => el.year == i - start)
                  .map((el) => (
                    <Tr key={el.id}>
                      <Td>{i}</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td>{el.product?.culture?.name}</Td>
                    </Tr>
                  ))
              );
              // res.push(<Tr></Tr>)
            }

            return res;
          })()}
        </Tbody>
      </Table> */}
      <Table size={"sm"}>
        <Thead>
          <Th>
            <TableName>Потреби в ресурсах для бізнес-плану</TableName>
          </Th>
        </Thead>
      </Table>
      {(() => {
        const res = [];
        for (let i = start; i <= end; i++) {
          res.push(
            <Text
              key={i}
              fontWeight={"bold"}
              fontSize={"16px"}
              textAlign={"center"}
            >
              {i}
            </Text>
          );
          res.push(
            myBusiness.busProds
              .filter((el) => el.year == i - start)
              .map((el) => (
                <TEJustificationContent
                  key={el.id}
                  isPlan={true}
                  myCart={el.tech_cart!}
                  myJustification={{ area: el.area }}
                />
              ))
          );
        }
        return res;
      })()}
      {/* <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Витрати праці
      </Text>
      <MyTableContainer>
        <TableComponent data={laborСostsData} columns={laborСostsColumns} />
      </MyTableContainer> */}
      {/*  <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Техніка й обладнання
      </Text>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Марка</Th>
              <Th>Одиниця виміру</Th>
              <Th>Кількість</Th>
              <Th>Ціна</Th>
              <Th>Сума</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr fontWeight={"bold"}>
              <Td>Трактори</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            {(() => {
              return thisMaps.map((e) => {
                let acc: number[] = [];
                let mechHours = 0;
                let myJustification:
                  | resTechnologicalEconomicJustification
                  | undefined = TEJ.justification?.find((el) => {
                  return el.techCartId! == +e.id!;
                });
                return map.opers.map((el, ind) => {
                  if (el.cell == "costMechanical") {
                    let amountOfTractorDepreciationPerHour =
                      el?.aggregate?.amountOfTractorDepreciationPerHour;
                    const id = el.aggregate?.tractorId;
                    const ex = acc.includes(id!);

                    if (ex) return null;
                    mechHours = el?.aggregate?.mechHours!;

                    map.opers.forEach((e, indx) => {
                      if (e.aggregate?.tractorId == id && ind != indx) {
                        mechHours += e?.aggregate?.mechHours!;
                      }
                    });
                    acc.push(id!);
                    costMechTot +=
                      mechHours *
                      amountOfTractorDepreciationPerHour! *
                      myJustification?.area! *
                      1.05;
                    return (
                      <Tr key={el.id}>
                        <Td>{el.aggregate?.tractor.nameTractor}</Td>
                        <Td>{el?.aggregate?.tractor.brand}</Td>
                        <Td>маш/год</Td>
                        <Td>{Math.round(mechHours * 100) / 100}</Td>
                        <Td>
                          {Math.round(
                            amountOfTractorDepreciationPerHour! * 100
                          ) / 100}
                        </Td>
                        <Td>
                          {Math.round(
                            mechHours *
                              amountOfTractorDepreciationPerHour! *
                              myJustification?.area! *
                              1.05 *
                              100
                          ) / 100}
                        </Td>
                      </Tr>
                    );
                  }
                });
              });
            })()}
            <Tr fontWeight={"bold"}>
              <Td>СГ машини</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            {(() => {
              return thisMaps.map((e) => {
                let acc: number[] = [];
                let mechHours = 0;
                let myJustification:
                  | resTechnologicalEconomicJustification
                  | undefined = TEJ.justification?.find((el) => {
                  return el.techCartId! == +e.id!;
                });
                return map.opers.map((el, ind) => {
                  if (el.cell == "costMechanical") {
                    let amountOfMachineDepreciationPerHour =
                      el?.aggregate?.amountOfMachineDepreciationPerHour;
                    const id = el.aggregate?.agriculturalMachineId;
                    const ex = acc.includes(id!);

                    if (ex) return null;
                    mechHours = el?.aggregate?.mechHours!;

                    map.opers.forEach((e, indx) => {
                      if (
                        e.aggregate?.agriculturalMachineId == id &&
                        ind != indx
                      ) {
                        mechHours += e?.aggregate?.mechHours!;
                      }
                    });
                    acc.push(id!);
                    costMechTot +=
                      mechHours *
                      amountOfMachineDepreciationPerHour! *
                      myJustification?.area! *
                      1.05;
                    return (
                      <Tr key={el.id}>
                        <Td>
                          {el?.aggregate?.agricultural_machine.nameMachine}
                        </Td>
                        <Td>{el?.aggregate?.agricultural_machine.brand}</Td>
                        <Td>маш/год</Td>
                        <Td>{Math.round(mechHours * 100) / 100}</Td>
                        <Td>
                          {Math.round(
                            amountOfMachineDepreciationPerHour! * 100
                          ) / 100}
                        </Td>
                        <Td>
                          {Math.round(
                            mechHours *
                              amountOfMachineDepreciationPerHour! *
                              myJustification?.area! *
                              1.05 *
                              100
                          ) / 100}
                        </Td>
                      </Tr>
                    );
                  }
                });
              });
            })()}
            <Tr fontWeight={"bold"}>
              <Td>Всього по техніці та обладнанню</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>{Math.round(costMechTot)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </MyTableContainer>
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Матеріальні витрати
      </Text>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Призначення</Th>
              <Th>Назва</Th>
              <Th>Одиниця виміру</Th>
              <Th>Кількість</Th>
              <Th>Ціна</Th>
              <Th>Сума</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(() => {
              return thisMaps.map((e) => {
                let myJustification:
                  | resTechnologicalEconomicJustification
                  | undefined = TEJ.justification?.find((el) => {
                  return el.techCartId! == +e.id!;
                });
                let cost = 0;
                return (
                  <React.Fragment key={e.id!}>
                    {map.purposeMaterial.map((el) => {
                      const mat = map.costMaterials.filter(
                        (e) => e?.purpose_material?.id == el?.id
                      );
                      if (mat[0])
                        return (
                          <React.Fragment key={el.id}>
                            <Tr>
                              <Td fontWeight={"bold"}>{el.purpose}</Td>
                              <Td></Td>
                              <Td></Td>
                              <Td></Td>
                              <Td></Td>
                              <Td></Td>
                            </Tr>
                            {mat.map((elem) => {
                              const hco =
                                elem.consumptionPerHectare *
                                myJustification?.area!;
                              const hp = hco * elem.price;
                              cost += hp;
                              return (
                                <Tr key={elem.id}>
                                  <Td></Td>
                                  <Td>{elem.nameMaterials}</Td>
                                  <Td>{elem.unitsOfConsumption}</Td>
                                  <Td>{hco}</Td>
                                  <Td>{elem.price}</Td>
                                  <Td>{hp}</Td>
                                </Tr>
                              );
                            })}
                          </React.Fragment>
                        );
                    })}
                    <Tr>
                      <Td fontWeight={"bold"}>Всього матеріалів</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td fontWeight={"bold"}>{cost}</Td>
                    </Tr>
                  </React.Fragment>
                );
              });
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Витрати на послуги
      </Text>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Одиниця виміру</Th>
              <Th>Кількість</Th>
              <Th>Ціна</Th>
              <Th>Сума</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(() => {
              let cost = 0;
              const serv = map.costServices;
              return (
                <>
                  {serv.map((elem) => {
                    cost += area! * elem.price;
                    return (
                      <Tr key={elem.id}>
                        <Td>{elem.nameService}</Td>
                        <Td>{elem.unitsOfCost}</Td>
                        <Td>{area}</Td>
                        <Td>{elem.price}</Td>
                        <Td>{area! * elem.price}</Td>
                      </Tr>
                    );
                  })}
                  <Tr>
                    <Td fontWeight={"bold"}>Всього за послуги</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td fontWeight={"bold"}>{cost}</Td>
                  </Tr>
                </>
              );
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Витрати на транспорт
      </Text>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Одиниця виміру</Th>
              <Th>Кількість</Th>
              <Th>Ціна</Th>
              <Th>Сума</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(() => {
              return null;
              // let cost = 0;
              // const trans = map.costTransport;
              // return (
              //   <>
              //     {trans.map((elem) => {
              //       cost += myJustification?.area! * elem.price;
              //       return (
              //         <Tr key={elem.id}>
              //           <Td>{elem.nameTransport}</Td>
              //           <Td>{elem.unitsOfCost}</Td>
              //           <Td>{myJustification?.area}</Td>
              //           <Td>{elem.price}</Td>
              //           <Td>{myJustification?.area! * elem.price}</Td>
              //         </Tr>
              //       );
              //     })}
              //     <Tr>
              //       <Td fontWeight={"bold"}>Всього за транспорт</Td>
              //       <Td></Td>
              //       <Td></Td>
              //       <Td></Td>
              //       <Td fontWeight={"bold"}>{cost}</Td>
              //     </Tr>
              //   </>
              // );
            })()}
          </Tbody>
        </Table>
      </MyTableContainer> */}

      <Paragraph>4.3. Опис продукту</Paragraph>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>Рік</Th>
            <Th>Назва продукту</Th>
            <Th>Упаковка</Th>
            <Th>Кількість</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const busProd = myBusiness.busProds.filter(
                (el) => el.year == i - start
              );
              res.push(
                busProd.map((el) => (
                  <Tr key={el.id}>
                    <Td>{i}</Td>
                    <Td>{el.product?.name}</Td>
                    <Td>{}</Td>
                    <Td>{}</Td>
                  </Tr>
                ))
              );
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
            }
            return res;
          })()}
        </Tbody>
      </Table>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <Description>
                Виробництво продукції планується з врахуванням урожайності
                скоригованої по роках експлуатації насаджень.
              </Description>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableName>План виробництва продукції</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <PlanIncomeProductionTableHeadRow isPlan={true} />
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i < end; i++) {
              let sum = 0;
              const busProds = myBusiness.busProds.filter(
                (el) => el.year == i - start
              );
              res.push(
                ...busProds.map((el) => {
                  const vegetationYear = el.vegetationYear;
                  const amount =
                    +(
                      (vegetationYear?.potentialYieldPerHectare || 0) *
                      (vegetationYear?.allCoeff || 0)
                    ) || 0;
                  const gather = (amount * el.area).toFixed(2);
                  sum += +((el.price || 0) * +gather).toFixed(2);
                  return (
                    <Tr key={el.id}>
                      <Td>{el.product?.name}</Td>
                      <Td>{amount.toFixed(2)}</Td>
                      <Td>{el.area}</Td>
                      <Td>{gather}</Td>
                      <Td>{el.price}</Td>
                      <Td>{((el.price || 0) * +gather).toFixed(2)}</Td>
                    </Tr>
                  );
                })
              );
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>{sum}</Td>
                </Tr>
              );
            }
            return res;
          })()}
        </Tbody>
      </Table>
      {/* <Heading textAlign={"center"} size={"sm"} mt={5}>
      Продаж продукції
    </Heading> */}
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th colSpan={7}>
                <Description>
                  Руалізація продукції панується з глибоким зоморожуванням якід
                  (Додаток 2) згідно графіку.
                </Description>
              </Th>
            </Tr>
            <Tr>
              <Th colSpan={7}>
                <TableName>Графік збору продукції</TableName>
              </Th>
            </Tr>
            <Tr>
              <Th colSpan={7}>
                <TableNumber></TableNumber>
              </Th>
            </Tr>
            <SaleTableHeadRows isPlan={true} />
          </Thead>
          <Tbody>
            {(() => {
              const res = [];
              for (let i = start; i <= end; i++) {
                const busProds = myBusiness.busProds.filter(
                  (el) => el.year == i - start
                );

                res.push(
                  ...busProds?.map((el) => {
                    const vegetationYear = el.vegetationYear;
                    const sum =
                      +(
                        el.area *
                        vegetationYear?.potentialYieldPerHectare! *
                        (vegetationYear?.allCoeff || 1)
                      ).toFixed(2) || 0;
                    return (
                      <Tr key={el.id}>
                        <Td>{el.product?.culture?.name}</Td>
                        <Td>{el.product?.name}</Td>
                        <Td>{el.product?.culture?.collectPeriod}</Td>
                        <Td>{sum}</Td>
                        <Td>{el.price}</Td>
                        <Td>{(sum * el.price!).toFixed(2)}</Td>
                      </Tr>
                    );
                  })
                );
                res.push(
                  <Tr key={i} fontWeight={"bold"}>
                    <Td>{i}</Td>
                  </Tr>
                );
              }
              return res;
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
      <Description>
        У структурі собівартості продукції виділено три групи витрат: Прямі –
        розрахунок на основі технологічної карти Загально-виробничі – розрахунок
        на основі вимог забезпечення виробництва і збуту продукції Постійні –
        розрахунок на основі вимог щодо адміністративного управління
        підприємством
      </Description>
      <MyTableContainer mt={"50px"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th colSpan={9}>
                <TableName>Собівартість продукції</TableName>
              </Th>
            </Tr>
            <Tr>
              <Th colSpan={9}>
                <TableNumber></TableNumber>
              </Th>
            </Tr>
            {/* <CostProdTableHeadRows /> */}
          </Thead>
          <Tbody>
            {(() => {
              const data: {
                year: number;
                name: string;
                permanent: number;
                general: number;
                direct: number;
                outcome: number;
                amount?: number;
                cost?: number;
                bold?: boolean;
              }[] = [];
              for (let i = start; i <= end; i++) {
                const busProd = myBusiness.busProds.filter(
                  (el) => el.year == i - start
                );
                const permanent = myBusiness.outcomes.filter(
                  (el) =>
                    getYearFromString(el.date) == i && el.group == "Постійні"
                );
                const general = myBusiness.outcomes.filter(
                  (el) =>
                    getYearFromString(el.date) == i &&
                    el.group == "Загально виробничі"
                );
                const monthAmount = getMonthAmountFromBusinessPlan(
                  myBusiness.dateStart,
                  i,
                  start
                );
                data.push(
                  ...busProd.map((el) => {
                    const vegetationYear = el.vegetationYear;
                    const amount =
                      +(
                        el.area *
                        vegetationYear?.potentialYieldPerHectare! *
                        (vegetationYear?.allCoeff || 1)
                      ).toFixed(2) || 0;
                    return {
                      year: i,
                      name: el.product?.name!,
                      direct: (el.tech_cart?.costHectare || 0) * el.area,
                      permanent: 0,
                      general: 0,
                      outcome: (el.tech_cart?.costHectare || 0) * el.area,
                      amount: amount,
                    };
                  })
                );
                const directValue = busProd.reduce(
                  (p, c) => p + (c.tech_cart?.costHectare || 0) * c.area,
                  0
                );
                const permanentValue = permanent.reduce(
                  (p, c) => p + (c.costYear || 0),
                  0
                );
                const generalValue = general.reduce(
                  (p, c) => p + (c.costYear || 0),
                  0
                );
                data.push({
                  year: i,
                  name: "Разом:",
                  bold: true,
                  direct: directValue,
                  permanent: permanentValue,
                  general: generalValue,
                  outcome: generalValue + permanentValue + directValue,
                });
              }
              const columns: ColumnDef<{
                year: number;
                name: string;
                permanent: number;
                general: number;
                direct: number;
                outcome: number;
                amount: number;
                cost: number;
              }>[] = [
                { header: "Рік", accessorKey: "year" },
                { header: "Назва", accessorKey: "name" },
                { header: "Постійні", accessorKey: "permanent" },
                { header: "Заг.Виг.", accessorKey: "general" },
                { header: "Прямі", accessorKey: "direct" },
                { header: "Витрати", accessorKey: "outcome" },
                { header: "К-ть", accessorKey: "amount" },
                { header: "Собівартість", accessorKey: "cost" },
              ];
              return <TableContent data={data} columns={columns} />;
              const res = [];
              for (let i = start; i < end; i++) {
                res.push(
                  <Tr key={i}>
                    <Td>{i}</Td>
                  </Tr>
                );
              }
              return res;
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
    </>
  );
}

export default observer(ProductionBusinessPlan);
