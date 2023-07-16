import { Table, Tbody, Td, Th, Thead, Tr, Box, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { RefObject, useContext, useMemo } from "react";
import TableContent from "src/components/TableComponent/TableContent";
import { Context } from "src/main";
import getYearFromString from "src/shared/funcs/getYearFromString";
import { EnterpriseFormType } from "src/shared/hook/useEnterpriseForm";
import useVegetationYears, {
  VegetationYearsType,
} from "src/shared/hook/useVegetationYears";
import { sectionsOpers } from "src/store/GetSectionsOpers";
import Description from "src/ui/Description";
import Paragraph from "src/ui/Paragraph";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
import { resTechCartsWithOpers } from "../../../../tRPC serv/controllers/TechCartService";
import { Ifinancing, Iworker } from "../../../../tRPC serv/models/models";
import CashFlowTable from "../CashFlowTable";
import OperTableSection from "../OpersTable/components/OperTableSection";
import { OpersTableHead } from "../OpersTable/OpersTable";
import {
  StaffingTableBodyRows,
  StaffingTableHeadRow,
} from "../StaffingTable/StaffingTable";

function AdditionBusinessPlan({
  form,
  start,
  end,
  myBusiness,
  thisWorkers,
  thisMaps,
  cultureSet,
  sections,
  operReady,
  thisCredit,
  thisDerj,
  thisGrand,
  thisInvestment,
  aref,
}: {
  form: EnterpriseFormType;
  start: number;
  end: number;
  myBusiness: resBusinessPlan;
  thisWorkers: Iworker[];
  thisMaps: resTechCartsWithOpers[];
  cultureSet: Set<string>;
  sections: { data: sectionsOpers; year: VegetationYearsType }[];
  operReady: boolean;
  thisCredit: Ifinancing[] | undefined;
  thisInvestment: Ifinancing[] | undefined;
  thisDerj: Ifinancing[] | undefined;
  thisGrand: Ifinancing[] | undefined;
  aref: RefObject<HTMLTableElement>;
}) {
  const { map, income } = useContext(Context);
  const technologyCultureData = (() => {
    const res: {
      period: string | number;
      year: string | number;
      culture: string | number;
      technology: string | number;
      map: string | number;
      area: string | number;
      totalCost: string | number;
      OPFund: string | number;
      ESV_VZ: string | number;
      direct: string | number;
      OP_ITR_Fund: string | number;
      ESV_VZ_ITR: string | number;
      otherTotalProduction: string | number;
      totalProduction: string | number;
      variable: string | number;
      OP_ADM_Fund: string | number;
      ESV_VZ_ADM: string | number;
      otherPermanent: string | number;
      permanent: string | number;
      expenses: string | number;
      income: string | number;
      product: string | number;
      grossHarvest: string | number;
      cost: string | number;
      revenue: string | number;
      investment: string | number;
      sum: string | number;
      bold?: boolean;
    }[] = [];
    let years: number[] = new Array(
      myBusiness?.realizationTime! + 1 < 11
        ? myBusiness?.realizationTime! + 1
        : 11
    ).fill(1);

    years.map((el, ind) => {
      let sumArea = 0,
        sumCost = 0,
        sumSalary = 0,
        sumESV = 0,
        sumDirect = 0,
        sumTake = 0;
      const thisYear = start + ind;
      const sumCredit = thisCredit
        ?.filter((el) => getYearFromString(el.date) == thisYear)
        .reduce((p, c) => p + c.cost, 0);
      const sumInv = thisInvestment
        ?.filter((el) => getYearFromString(el.date) == thisYear)
        .reduce((p, c) => p + c.cost, 0);
      const sumDerj = thisDerj
        ?.filter((el) => getYearFromString(el.date) == thisYear)
        .reduce((p, c) => p + c.cost, 0);
      const sumGrand = thisGrand
        ?.filter((el) => getYearFromString(el.date) == thisYear)
        .reduce((p, c) => p + c.cost, 0);
      res.push(
        {
          period: ind,
          year: thisYear,
          culture: myBusiness.busProds
            .map((el) => el.product?.culture?.name.split(" ").join("\u00A0"))
            .join("\n"),
          technology: myBusiness.busProds
            .map((el) =>
              el.cultivationTechnology?.name.split(" ").join("\u00A0")
            )
            .join("\n"),
          map: myBusiness.busProds
            .map(
              (el) =>
                thisMaps.find(
                  (e) =>
                    e.cultureId == el.product?.cultureId &&
                    e.cultivationTechnologyId == el.cultivationTechnologyId &&
                    +e.year.split("")[0] == ind
                )?.nameCart || "Відсутня"
            )
            .join("\n"),
          area: myBusiness.busProds
            .map((el) => {
              sumArea += el.area;
              return el.area;
            })
            .join("\n"),
          totalCost: myBusiness.busProds
            .map((el) => {
              let res =
                (thisMaps.find(
                  (e) =>
                    e.cultureId == el.product?.cultureId &&
                    e.cultivationTechnologyId == el.cultivationTechnologyId &&
                    +e.year.split("")[0] == ind
                )?.costHectare || 0) * el.area;
              sumCost += res;
              return res;
            })
            .join("\n"),
          OPFund: myBusiness.busProds
            .map((el) => {
              let cart = thisMaps.find(
                (e) =>
                  e.cultureId == el.product?.cultureId &&
                  e.cultivationTechnologyId == el.cultivationTechnologyId &&
                  +e.year.split("")[0] == ind
              );

              let res =
                (cart?.totalCostHandWork ||
                  0 + cart?.totalCostMachineWork! ||
                  0) * el.area;
              sumSalary += res;
              return res;
            })
            .join("\n"),
          ESV_VZ: myBusiness.busProds
            .map((el) => {
              let cart = thisMaps.find(
                (e) =>
                  e.cultureId == el.product?.cultureId &&
                  e.cultivationTechnologyId == el.cultivationTechnologyId &&
                  +e.year.split("")[0] == ind
              );
              let res = Math.round(
                (cart?.totalCostHandWork ||
                  0 + cart?.totalCostMachineWork! ||
                  0) *
                  el.area *
                  0.235
              );
              sumESV += res;
              return res;
            })
            .join("\n"),
          direct: myBusiness.busProds
            .map((el) => {
              let cart = thisMaps.find(
                (e) =>
                  e.cultureId == el.product?.cultureId &&
                  e.cultivationTechnologyId == el.cultivationTechnologyId &&
                  +e.year.split("")[0] == ind
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
              sumDirect += res;
              return res;
            })
            .join("\n"),
          OP_ITR_Fund: "",
          ESV_VZ_ITR: "",
          otherTotalProduction: "",
          totalProduction: "",
          variable: "",
          OP_ADM_Fund: "",
          ESV_VZ_ADM: "",
          otherPermanent: "",
          permanent: "",
          expenses: "",
          income: "",
          product: myBusiness.busProds
            .map((el) => el.product?.culture?.product.split(" ").join("\u00A0"))
            .join("\n"),
          grossHarvest: myBusiness.busProds
            .map((el) => {
              let myYield = income.yieldPlant.find(
                (e) => e.cultureId == el.product?.cultureId
              );
              const vegetation = income.vegetationYear.find(
                (e) =>
                  e.yieldPlantId == myYield?.id && +e.year.split("")[0] == ind
              );
              return (
                Math.round(
                  myYield?.yieldPerHectare! * vegetation?.allCoeff! * el.area
                ) || 0
              );
            })
            .join("\n"),
          cost: myBusiness.busProds
            .map((el) => el.product?.culture?.priceBerry! * 1000)
            .join("\n"),

          revenue: myBusiness.busProds
            .map((el) => {
              let myYield = income.yieldPlant.find(
                (e) => e.cultureId == el.product?.cultureId
              );
              const vegetation = income.vegetationYear.find(
                (e) =>
                  e.yieldPlantId == myYield?.id && +e.year.split("")[0] == ind
              );
              let res =
                Math.round(
                  myYield?.yieldPerHectare! * vegetation?.allCoeff! * el.area
                ) *
                  el.product?.culture?.priceBerry! *
                  1000 || 0;
              sumTake += res;
              return res;
            })
            .join("\n"),
          investment: [
            ind == 0 ? "Початкові\u00A0інвестиції" : "Інвестиції",
            "Кредит",
            "Держ\u00A0підтримка",
            "Грант",
          ].join("\n"),
          sum: [sumInv, sumCredit, sumDerj, sumGrand].join("\n"),
        },
        {
          bold: true,
          period: "Разом\u00A0за\u00A0рік",
          year: "",
          culture: "",
          technology: "",
          map: "",
          area: sumArea,
          totalCost: sumCost,
          OPFund: sumSalary,
          ESV_VZ: sumESV,
          direct: sumDirect,
          OP_ITR_Fund: thisWorkers
            .filter((el) => el.class == "Інженерно технічний")
            .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0),
          ESV_VZ_ITR:
            thisWorkers
              .filter((el) => el.class == "Інженерно технічний")
              .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 0.235,
          otherTotalProduction: 0,
          totalProduction: Math.round(
            thisWorkers
              .filter((el) => el.class == "Інженерно технічний")
              .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 1.235
          ),
          variable:
            Math.round(
              thisWorkers
                .filter((el) => el.class == "Інженерно технічний")
                .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 1.235
            ) + sumDirect,
          OP_ADM_Fund: Math.round(
            thisWorkers
              .filter((el) => el.class == "Адміністративний")
              .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0)
          ),
          ESV_VZ_ADM: Math.round(
            thisWorkers
              .filter((el) => el.class == "Адміністративний")
              .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 0.235
          ),
          otherPermanent: 0,
          permanent: Math.round(
            thisWorkers
              .filter((el) => el.class == "Адміністративний")
              .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 1.235
          ),
          expenses:
            thisWorkers
              .filter((el) => el.class == "Адміністративний")
              .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) *
              1.235 +
            Math.round(
              thisWorkers
                .filter((el) => el.class == "Інженерно технічний")
                .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 1.235
            ) +
            sumDirect,
          income: sumTake + (ind == 0 ? myBusiness.initialAmount : 0),
          product: "",
          grossHarvest: "",
          cost: "",
          revenue: sumTake,
          investment: "",
          sum:
            (sumCredit || 0) + (sumInv || 0) + (sumDerj || 0) + (sumGrand || 0),
        }
      );
    });
    return res;
  })();
  const technologyCultureColumns = useMemo<ColumnDef<any>[]>(
    () => [
      { header: "Період", accessorKey: "period" },
      { header: "Рік", accessorKey: "year" },
      { header: "Культура", accessorKey: "culture" },
      { header: "Технологія", accessorKey: "technology" },
      { header: "Карта", accessorKey: "map" },
      { header: "Площа", accessorKey: "area" },
      { header: "Загальна вартість", accessorKey: "totalCost" },
      { header: "Фонд ОП", accessorKey: "OPFund" },
      { header: "ЄСВ + ВЗ", accessorKey: "ESV_VZ" },
      { header: "Прямі", accessorKey: "direct" },
      { header: "Фонд ОП ІТР", accessorKey: "OP_ITR_Fund" },
      { header: "ЄСВ ВЗ ІТР", accessorKey: "ESV_VZ_ITR" },
      { header: "інші заг. вир.", accessorKey: "otherTotalProduction" },
      { header: "Заг. Вир.", accessorKey: "totalProduction" },
      { header: "Змінні", accessorKey: "variable" },
      { header: "Фонд ОП АДМ", accessorKey: "OP_ADM_Fund" },
      { header: "ЄСВ ВЗ АДМ", accessorKey: "ESV_VZ_ADM" },
      { header: "Інші постійні", accessorKey: "otherPermanent" },
      { header: "Постійні", accessorKey: "permanent" },
      { header: "Витрати", accessorKey: "expenses" },
      { header: "Доходи", accessorKey: "income" },
      { header: "Продукт", accessorKey: "product" },
      { header: "Валовий збір тон", accessorKey: "grossHarvest" },
      { header: "Ціна", accessorKey: "cost" },
      { header: "Виручка", accessorKey: "revenue" },
      { header: "Інвестування", accessorKey: "investment" },
      { header: "Сума", accessorKey: "sum" },
    ],
    []
  );
  return (
    <>
      <SectionTitle aref={aref}>Додатки</SectionTitle>
      <Paragraph>Додаток А. Установчі документи</Paragraph>
      <Paragraph>Додаток Б. Штатний роспис</Paragraph>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={7}>
              <Paragraph>
                3.2. Власники, керуючий персонал, працівники підприємства.
              </Paragraph>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={7}>
              <Description>
                Для функціонування підприємства планується створити сімейне
                фермерське господарство у вигляді ФОП з 2 членами сім’ї та
                найняти …. працівників, з них …. На постійній основі, а ….
                Сезонно. Детальні розрахунки зведено у вигляді таблиці.
              </Description>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={7}>
              <TableName>{`Штатний розпис ${form} на 1 га`}</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={7}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <StaffingTableHeadRow isPlan={true} />
        </Thead>
        <Tbody>
          {(() => {
            let sum = 0;
            const res = [];
            for (let i = start; i < end; i++) {
              thisWorkers.forEach((el) => {
                sum += el.salary * 12 * el.amount;
              });
              res.push(
                <React.Fragment key={i}>
                  <Tr>
                    <Td>{i}</Td>
                  </Tr>
                  <StaffingTableBodyRows
                    thisWorkers={thisWorkers}
                    isPlan={true}
                  />
                </React.Fragment>
              );
            }
            res.push(
              <Tr fontWeight={"bold"}>
                <Td
                  colSpan={3}
                >{`Разом фонд оплати праці, років - ${myBusiness?.realizationTime}`}</Td>
                <Td>{sum}</Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
      </Table>
      <Paragraph>Додаток В. Технологічні карти</Paragraph>
      <Table size={"sm"}>
        <Thead>
          <OpersTableHead role="" />
        </Thead>
        <Tbody>
          {(() => {
            let res = [];
            for (let i = start; i < end; i++) {
              for (let j = 0; j < myBusiness?.busProds?.length!; j++) {
                const e = myBusiness?.busProds[j];

                res.push(
                  sections
                    ?.filter((el) => +el.year.split("")[0] == i - +start + 1)
                    .map((sec) => {
                      const el = sec.data;
                      const mapData = thisMaps
                        .filter(
                          (el) => +(+el.year.split("")[0]) == i - +start + 1
                        )
                        .find((e) => e.id == el[0]?.arr[0]?.techCartId!);

                      const sum = 0;
                      return el.map((el) => {
                        // sum +=
                        //   mapData?.area! *
                        //   (e.costMaterials ||
                        //     e.costServices ||
                        //     e.costTransport ||
                        //     +e.costCars! +
                        //       +e.costFuel! +
                        //       +e.costHandWork! +
                        //       +e.costMachineWork! ||
                        //     e.costHandWork ||
                        //     0);

                        if (operReady)
                          return (
                            <React.Fragment>
                              {/* <карти></к> */}
                              <OperTableSection
                                arr={el.arr}
                                title={el.title}
                                //@ts-ignore
                                mapData={{ area: 3 }}
                                id={mapData?.id!}
                                //@ts-ignore
                                deleteOpen={() => {}}
                                setCell={() => {}}
                                setDeleteOpen={() => {}}
                                setOpen={() => {}}
                                setRes={() => {}}
                                setShowAlert={() => {}}
                                setUpdate={() => {}}
                                sum={sum}
                              />
                            </React.Fragment>
                          );
                      });
                    })
                );
              }
            }

            return res.flat().flat();
          })()}
        </Tbody>
      </Table>
      <Paragraph>Культури технології</Paragraph>
      <Table size={"sm"}>
        <TableContent
          data={technologyCultureData}
          columns={technologyCultureColumns}
        />
      </Table>
      <Paragraph>Додаток Г. Калькуляція собівартості</Paragraph>
      {(() => {
        const res = [];
        for (let i = start; i < end; i++) {
          res.push(
            <Table size={"sm"} mt={"10px"} key={i}>
              <Thead>
                <Tr>
                  <Th colSpan={3 + cultureSet.size}>
                    <TableName>{`Калькуляція планової собівартості виробленої продукції на ${i} рік`}</TableName>
                  </Th>
                </Tr>
                <Tr>
                  <Td rowSpan={2}>Статті витрат</Td>
                  <Td rowSpan={2}>Разом</Td>
                  <Td colSpan={cultureSet.size} textAlign={"center"}>
                    Продукція
                  </Td>
                  <Td rowSpan={2}>%</Td>
                </Tr>
                <Tr>
                  {[...cultureSet].map((el) => (
                    <Td key={el}>{el}</Td>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight={"bold"}>Постійні витрати</Td>
                </Tr>
                <Tr>
                  <Td>Заробітна плата</Td>
                </Tr>
                <Tr>
                  <Td>Нарахування (ЄСВ ВЗ)</Td>
                </Tr>
                <Tr>
                  <Td>Оренда плата за землю</Td>
                </Tr>
                <Tr>
                  <Td>Податок з власників землі</Td>
                </Tr>
                <Tr>
                  <Td>Електроенергія</Td>
                </Tr>
                <Tr>
                  <Td>Витрати на офіс</Td>
                </Tr>
                <Tr>
                  <Td>Податок (4 група)</Td>
                </Tr>
                <Tr>
                  <Td>Амортизація ОЗ</Td>
                </Tr>
                <Tr>
                  <Td>Амортизація БіоАктив</Td>
                </Tr>
                <Tr>
                  <Td>% по кредиту</Td>
                </Tr>
                <Tr>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Змінні витрати</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Прямі</Td>
                </Tr>
                <Tr>
                  <Td>Догляд за насадженнями та збір</Td>
                </Tr>
                <Tr>
                  <Td>Нарахування (ЄСВ ВЗ)</Td>
                </Tr>
                <Tr>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Загально-виробничі</Td>
                </Tr>
                <Tr>
                  <Td>Елекроенергія</Td>
                </Tr>
                <Tr>
                  <Td>Тара і упаковка</Td>
                </Tr>
                <Tr>
                  <Td>Транспортні витрати на збут</Td>
                </Tr>
                <Tr>
                  <Td>Поточний ремонт</Td>
                </Tr>
                <Tr>
                  <Td>Податки</Td>
                </Tr>
                <Tr>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          );
        }
        return res;
      })()}
      <Paragraph>Додаток Ґ. Грошовий потік</Paragraph>{" "}
      <TableName> Грошовий потік</TableName>
      <TableNumber></TableNumber>
      {(() => {
        const res = [];
        let startSum = myBusiness?.initialAmount! / 1000;
        let endSum = startSum;
        for (let i = start; i < end; i++) {
          const obj: {
            "I квартал": number;
            "II квартал": number;
            "III квартал": number;
            "IV квартал": number;
          } = {
            "I квартал": 0,
            "II квартал": 0,
            "III квартал": 0,
            "IV квартал": 0,
          };
          myBusiness?.busProds?.forEach((el) => {
            const yearName = useVegetationYears[i - start + 1].name;

            const myYield = income.yieldPlant.find(
              (e) => e.cultureId == el.product?.cultureId
            );

            const vegetation = income.vegetationYear.find(
              (e) => e.yieldPlantId == myYield?.id && e.year == yearName
            );
            const sum =
              Math.round(
                (myYield?.yieldPerHectare! *
                  el.area *
                  el.product?.culture?.priceBerry! *
                  vegetation?.allCoeff! || 0) * 100
              ) / 100;
            endSum += sum;
            endSum = Math.round(endSum * 1000) / 1000;
            obj[el.product?.culture?.collectPeriod!] += sum;
          });
          res.push(
            <Box mt={"50px"}>
              <CashFlowTable
                year={i}
                startSum={startSum}
                endSum={endSum}
                fkIncome={obj["I квартал"]}
                skIncome={obj["II квартал"]}
                tkIncome={obj["III квартал"]}
                fourthkIncome={obj["IV квартал"]}
              />
            </Box>
          );
          startSum = endSum;
        }
        return res;
      })()}
    </>
  );
}

export default AdditionBusinessPlan;
