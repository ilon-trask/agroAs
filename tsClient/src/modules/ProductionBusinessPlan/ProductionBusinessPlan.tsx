import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Text,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react-lite";
import React, { RefObject, useContext, useMemo } from "react";
import TableComponent from "src/components/TableComponent";
import TableContent from "src/components/TableComponent/TableContent";
import { Context } from "src/main";
import useVegetationYears from "src/shared/hook/useVegetationYears";
import Description from "src/ui/Description";
import MyTableContainer from "src/ui/MyTableContainer";
import Paragraph from "src/ui/Paragraph";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
import { resTechCartsWithOpers } from "../../../../tRPC serv/controllers/TechCartService";
import { resTechnologicalEconomicJustification } from "../../../../tRPC serv/controllers/TEJService";
import { CartsTableHeadRow } from "../CartsTable";
import { CostProdTableHeadRows } from "../CostProdTable/CostProdTable";
import { PlanIncomeProductionTableHeadRow } from "../PlanIncomeProductionTable/PlanIncomeProductionTable";
import { SaleTableHeadRows } from "../SaleTable/SaleTable";

function ProductionBusinessPlan({
  start,
  end,
  myBusiness,
  thisMaps,
  productSet,
  area,
  aref,
}: {
  start: number;
  end: number;
  myBusiness: resBusinessPlan;
  thisMaps: resTechCartsWithOpers[];
  productSet: Set<string>;
  area: number;
  aref: RefObject<HTMLTableElement>;
}) {
  const { income, map, TEJ } = useContext(Context);
  let costHand = 0;
  let costMech = 0;
  let costMechTot = 0;
  const generalData = myBusiness?.busProds?.map((el) => ({
    culture: el.product?.culture?.name,
    name,
    technology: el.cultivationTechnology?.name,
    area: el.area,
  }));
  const laborСostsData = (() => {
    const res: {
      workType: string;
      operation: string;
      amount: number | string;
      averagePrice: number | string;
      sum: number | string;
      bold?: boolean;
    }[] = [
      {
        workType: "Муханізовані роботи",
        operation: "",
        amount: "Люд/год",
        averagePrice: "Грн/год",
        sum: "",
        bold: true,
      },
    ];

    thisMaps.map((e) => {
      let myJustification = TEJ.justification?.find((el) => {
        return el.techCartId! == +e.id!;
      });

      return map.opers
        .filter((el) => el.techCartId == e.id)
        .map((el) => {
          const totalCost = el.costMachineWork! * myJustification?.area!;

          const peopleHour =
            Math.round(
              (totalCost /
                ((e?.salary! / 176) *
                  map.grade.find(
                    (e) => e?.id! == el?.aggregate?.tractor.gradeId
                  )?.coefficient!)) *
                100
            ) / 100;

          const costMech = Math.round(((totalCost / peopleHour) * 100) / 100);
          if (el.cell == "costMechanical")
            res.push({
              workType: "",
              operation: el.nameOperation,
              amount: peopleHour,
              averagePrice: costMech,
              sum: totalCost,
              bold: true,
            });
        });
    });
    res.push({
      workType: "Ручні роботи",
      operation: "",
      amount: "Люд/год",
      averagePrice: "Грн/год",
      sum: "",
      bold: true,
    });
    thisMaps.map((e) => {
      let myJustification: resTechnologicalEconomicJustification | undefined =
        TEJ.justification?.find((el) => {
          return el.techCartId! == +e.id!;
        });
      return map.opers
        .filter((el) => el.techCartId == e.id)
        .map((el) => {
          const totalCost = el.costHandWork! * myJustification?.area!;
          const peopleHour =
            Math.round(
              (totalCost /
                ((e?.salary! / 176) *
                  map.grade.find(
                    (e) =>
                      e.id! == el.cost_hand_work?.gradeId! ||
                      el.aggregate?.agricultural_machine.gradeId
                  )?.coefficient!)) *
                100
            ) / 100;
          const costHand = Math.round(((totalCost / peopleHour) * 100) / 100);
          if (
            el.cell == "costHandWork" ||
            (el.cell == "costMechanical" && el.costHandWork)
          )
            res.push({
              workType: "",
              operation: el.nameOperation,
              amount: peopleHour,
              averagePrice: costHand,
              sum: totalCost,
            });
        });
    });
    res.push({
      workType: "Всього по оплаті праці",
      amount: "",
      averagePrice: "",
      operation: "",
      sum: 0,
      bold: true,
    });
    return res;
  })();
  const plannedStructureData = [];
  for (let i = start; i < end; i++) {
    const yearName = useVegetationYears[i - start + 1].name;
    plannedStructureData.push({
      year: i + " " + yearName,
      ...myBusiness?.busProds.reduce((p, el) => {
        const myYield = income.yieldPlant?.find(
          (e) => e.cultureId == el.product?.cultureId
        );
        const vegetation = income.vegetationYear?.find(
          (e) => e.yieldPlantId == myYield?.id && e.year == yearName
        );
        //@ts-ignore
        p[el.culture?.name! + el.cultivationTechnology.name! + "coef"] =
          vegetation?.allCoeff || 0;
        //@ts-ignore
        p[el.culture?.name! + el.cultivationTechnology.name! + "yield"] =
          Math.round(
            myYield?.yieldPerHectare! * (vegetation?.allCoeff || 0) * 100
          ) / 100;
        return p;
      }, {}),
    });
  }
  const generalColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "КУЛЬТУРИ", accessorKey: "culture" },
      { header: "ТЕХНОЛОГІЇ", accessorKey: "technology" },
      { header: "ВИРОБНИЧІ ПЛОЩІ", accessorKey: "area" },
      { header: "Загальна площа", accessorKey: "totalArea" },
    ];
  }, []);
  const plannedStructureColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Вегетація", accessorKey: "year" },
      ...myBusiness?.busProds.map((el) => ({
        header: el?.product?.culture?.name! + el.cultivationTechnology?.name!,
        columns: [
          {
            header: "Коеф.",
            accessorKey:
              el?.product?.culture?.name! +
              el.cultivationTechnology?.name! +
              "coef",
          },
          {
            header: "Урожайн.",
            accessorKey:
              el?.product?.culture?.name! +
              el.cultivationTechnology?.name! +
              "yield",
          },
        ],
      })),
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
            <Th colSpan={4}>
              <TableName>Загальні дані про культури та технології</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={4}>
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
                <React.Fragment key={i}>
                  {busProds.map((el) => (
                    <Tr>
                      <Td>{i}</Td>
                      <Td>{el.tech_cart?.nameCart}</Td>
                      <Td>{el.area}</Td>
                      <Td>{(el.tech_cart?.costHectare || 0) * el.area}</Td>
                      <Td>{el.tech_cart?.costHectare}</Td>
                    </Tr>
                  ))}
                  <Tr fontWeight={"bold"}>
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
                  {/* <Tr>
                    <Td>
                      {busProds.map((el) => el.tech_cart?.nameCart).join("\n")}
                    </Td>
                    <Td>{busProds.map((el) => el.area).join("\n")}</Td>
                    <Td>
                      {busProds
                        .map((el) => (el.tech_cart?.costHectare || 0) * el.area)
                        .join("\n")}
                    </Td>
                    <Td>
                      {busProds
                        .map((el) => el.tech_cart?.costHectare)
                        .join("\n")}
                    </Td>
                    <Td>{busProds.map(el=>el.)}</Td>
                  </Tr> */}
                </React.Fragment>
              );
              //   for (let j = 0; j < myBusiness?.busProds?.length!; j++) {
              //     const e = myBusiness?.busProds[j];
              //     let thisMaps = map.maps.map((m) => ({
              //       ...m,
              //       area: e?.area,
              //     }));
              //     thisMaps = thisMaps.filter((el) => {
              //       return (
              //         el.cultureId == e?.product?.cultureId &&
              //         el.cultivationTechnologyId == e?.cultivationTechnologyId &&
              //         //@ts-ignore
              //         el.year.split("")[0] == i - +start + 1
              //       );
              //     });
              //     res.push(
              //       <React.Fragment key={j}>
              //         {thisMaps.map((el) => (
              //           <Tr>
              //             <Td>{el.nameCart}</Td>
              //             <Td>{el.area}</Td>
              //             <Td>
              //               {Math.round(el.area! * el.costHectare! * 100) / 100}
              //             </Td>
              //             <Td>{el.costHectare}</Td>
              //           </Tr>
              //         ))}
              //       </React.Fragment>
              //     );
              // }
            }
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
              <TableName>Основні засоби</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={5}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Назва основного засобу</Th>
            <Th>Первісн а вартість</Th>
            <Th>Термін амортизації</Th>
            <Th>Амортизація (місяць)</Th>
            <Th>Початок амортизації</Th>
          </Tr>
        </Thead>
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
              <TableName>Біологічні активи</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={5}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Назва біологічного активу</Th>
            <Th>Первісна вартість</Th>
            <Th>Термін амортизації</Th>
            <Th>Амортизація (місяць)</Th>
            <Th>Початок амортизації</Th>
          </Tr>
        </Thead>
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
            <Th>Назва МШП</Th>
            <Th>Первісна вартість</Th>
            <Th>Термін амортизації</Th>
            <Th>Амортизація (місяць)</Th>
            <Th>Початок амортизації</Th>
          </Tr>
        </Thead>
        <Tbody></Tbody>
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
              <TableName>
                {`План амортизації перших${" "}
              ${
                myBusiness?.realizationTime! <= 7
                  ? myBusiness?.realizationTime!
                  : 6
              }
              років проекту`}
              </TableName>
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
            <Th>
              Засоби <br />
              і&nbsp;активи
            </Th>
            <Th>Основні засоби</Th>
            <Th>Біо активи</Th>
            <Th>МШП</Th>
            <Th>
              Сума <br />
              амортизації
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i < end; i++) {
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
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={5}>
              <TableName>Основні ресурси</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th>Назва ресурсу</Th>
            <Th>Кількість</Th>
            <Th>Ціна</Th>
            <Th>Сума</Th>
            <Th>Призначення</Th>
          </Tr>
        </Thead>
      </Table>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування потреби в ресурсах
      </Text>
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Витрати праці
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <TableComponent data={laborСostsData} columns={laborСostsColumns} />
      </TableContainer>
      <Text
        textAlign={"center"}
        fontSize={"14px"}
        mt={"15px"}
        fontWeight={"bold"}
      >
        Техніка й обладнання
      </Text>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
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
      </TableContainer>
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
      </MyTableContainer>

      <Paragraph>4.3. Опис продукту</Paragraph>
      <Table size={"sm"}>
        {[...productSet].map((el, ind) => {
          if (ind == 0) {
            return (
              <Tr key={el}>
                <Th rowSpan={productSet.size}>Основний продукт</Th>
                <Th>{el}</Th>
              </Tr>
            );
          } else {
            return (
              <Tr key={el}>
                <Th>{el}</Th>
              </Tr>
            );
          }
        })}
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
              const yearName = useVegetationYears[i - start + 1].name;

              let akk = myBusiness?.busProds.map((el) => {
                const myYield = income.yieldPlant?.find(
                  (e) => e.cultureId == el.product?.cultureId
                );

                const vegetation = income.vegetationYear?.find(
                  (e) => e.yieldPlantId == myYield?.id && e.year == yearName
                );
                const sum = (
                  myYield?.yieldPerHectare! * vegetation?.allCoeff! || 0
                ).toFixed(2);
                return (
                  <Tr key={el.id}>
                    <Td>{el.product?.culture?.name}</Td>
                    <Td>{sum}</Td>
                    <Td>{el.area}</Td>
                    <Td>{(sum * el.area).toFixed(2)}</Td>
                  </Tr>
                );
              });
              res.push(
                <React.Fragment key={i}>
                  <Tr>
                    <Td>
                      <Text fontWeight={"bold"}>{i}</Text>
                    </Td>
                  </Tr>
                  {akk}
                </React.Fragment>
              );
            }
            return res;
          })()}
        </Tbody>
      </Table>
      {/* <Heading textAlign={"center"} size={"sm"} mt={5}>
      Продаж продукції
    </Heading> */}
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
            for (let i = start; i < end; i++) {
              res.push(
                <React.Fragment key={i}>
                  <Tr>
                    <Td>{i}</Td>
                  </Tr>
                  {myBusiness?.busProds?.map((el) => {
                    const yearName = useVegetationYears[i - start + 1].name;
                    const myYield = income.yieldPlant?.find(
                      (e) => e.cultureId == el.product?.cultureId
                    );

                    const vegetation = income.vegetationYear?.find(
                      (e) => e.yieldPlantId == myYield?.id && e.year == yearName
                    );
                    const sum =
                      Math.round(
                        (myYield?.yieldPerHectare! *
                          el.area *
                          vegetation?.allCoeff! || 0) * 100
                      ) / 100;
                    return (
                      <Tr key={el.id}>
                        <Td>{el.product?.culture?.name}</Td>
                        <Td>{el.product?.culture?.product}</Td>
                        <Td>{el.product?.culture?.collectPeriod}</Td>
                        <Td>{sum}</Td>
                        <Td>{el.product?.culture?.priceBerry}</Td>
                        <Td>{sum * el.product?.culture?.priceBerry!}</Td>
                      </Tr>
                    );
                  })}
                </React.Fragment>
              );
            }
            return res;
          })()}
        </Tbody>
      </Table>
      <Box mt={"50px"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th colSpan={9}>
                <Description>
                  У структурі собівартості продукції виділено три групи витрат:
                  Прямі – розрахунок на основі технологічної карти
                  Загально-виробничі – розрахунок на основі вимог забезпечення
                  виробництва і збуту продукції Постійні – розрахунок на основі
                  вимог щодо адміністративного управління підприємством
                </Description>
              </Th>
            </Tr>
            <Tr>
              <Th colSpan={9}>
                <TableName>Собіварість продукції</TableName>
              </Th>
            </Tr>
            <Tr>
              <Th colSpan={9}>
                <TableNumber></TableNumber>
              </Th>
            </Tr>
            <CostProdTableHeadRows />
          </Thead>
          <Tbody>
            {(() => {
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
      </Box>
    </>
  );
}

export default observer(ProductionBusinessPlan);
