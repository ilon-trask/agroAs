import { Table, Tbody, Td, Th, Thead, Tr, Box } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { RefObject, useContext, useMemo } from "react";
import { Context } from "src/main";
import TechnologicalMapContent from "src/pages/TechnologicalMap/TechnologicalMapContent";
import getYearFromString from "src/shared/funcs/getYearFromString";
import useBusinessPlanData from "src/shared/hook/BusinessPlanFinancingData/useBusinessPlanData";
import { EnterpriseFormType } from "src/shared/hook/useEnterpriseForm";
import useVegetationYears from "src/shared/hook/useVegetationYears";
import MyHeading from "src/ui/MyHeading";
import Paragraph from "src/ui/Paragraph";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
import { Ifinancing, Iworker } from "../../../../tRPC serv/models/models";
import CashFlowTable from "../CashFlowTable";
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
  cultureSet,
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
  cultureSet: Set<string>;
  thisCredit: Ifinancing[] | undefined;
  thisInvestment: Ifinancing[] | undefined;
  thisDerj: Ifinancing[] | undefined;
  thisGrand: Ifinancing[] | undefined;
  aref: RefObject<HTMLTableElement>;
}) {
  const { map, income } = useContext(Context);
  // const technologyCultureData = (() => {
  //   const res: {
  //     period: string | number;
  //     year: string | number;
  //     culture: string | number;
  //     technology: string | number;
  //     map: string | number;
  //     area: string | number;
  //     totalCost: string | number;
  //     OPFund: string | number;
  //     ESV_VZ: string | number;
  //     direct: string | number;
  //     OP_ITR_Fund: string | number;
  //     ESV_VZ_ITR: string | number;
  //     otherTotalProduction: string | number;
  //     totalProduction: string | number;
  //     variable: string | number;
  //     OP_ADM_Fund: string | number;
  //     ESV_VZ_ADM: string | number;
  //     otherPermanent: string | number;
  //     permanent: string | number;
  //     expenses: string | number;
  //     income: string | number;
  //     product: string | number;
  //     grossHarvest: string | number;
  //     cost: string | number;
  //     revenue: string | number;
  //     investment: string | number;
  //     sum: string | number;
  //     bold?: boolean;
  //   }[] = [];
  //   let years: number[] = new Array(
  //     myBusiness?.realizationTime! + 1 < 11
  //       ? myBusiness?.realizationTime! + 1
  //       : 11
  //   ).fill(1);

  //   years.map((el, ind) => {
  //     let sumArea = 0,
  //       sumCost = 0,
  //       sumSalary = 0,
  //       sumESV = 0,
  //       sumDirect = 0,
  //       sumTake = 0;
  //     const thisYear = start + ind;
  //     const busProds = myBusiness.busProds.filter((el) => el.year == ind);
  //     const sumCredit = thisCredit
  //       ?.filter((el) => getYearFromString(el.date) == thisYear)
  //       .reduce((p, c) => p + c.cost, 0);
  //     const sumInv = thisInvestment
  //       ?.filter((el) => getYearFromString(el.date) == thisYear)
  //       .reduce((p, c) => p + c.cost, 0);
  //     const sumDerj = thisDerj
  //       ?.filter((el) => getYearFromString(el.date) == thisYear)
  //       .reduce((p, c) => p + c.cost, 0);
  //     const sumGrand = thisGrand
  //       ?.filter((el) => getYearFromString(el.date) == thisYear)
  //       .reduce((p, c) => p + c.cost, 0);
  //     res.push(
  //       {
  //         period: ind,
  //         year: thisYear,
  //         product: busProds
  //           .map((el) => el.product?.name.split(" ").join("\u00A0"))
  //           .join("\n"),
  //         culture: busProds
  //           .map((el) => el.product?.culture?.name.split(" ").join("\u00A0"))
  //           .join("\n"),
  //         technology: busProds
  //           .map((el) =>
  //             el.cultivationTechnology?.name.split(" ").join("\u00A0")
  //           )
  //           .join("\n"),
  //         map: busProds.map((el) => el.tech_cart?.nameCart).join("\n"),
  //         area: busProds
  //           .map((el) => {
  //             sumArea += el.area;
  //             return el.area;
  //           })
  //           .join("\n"),
  //         totalCost: busProds
  //           .map((el) => {
  //             let res = (el.tech_cart?.costHectare || 0) * el.area;
  //             sumCost += res;
  //             return res;
  //           })
  //           .join("\n"),
  //         OPFund: busProds
  //           .map((el) => {
  //             let res = useBusinessPlanData.oneOPFund(el);
  //             sumSalary += res;
  //             return res;
  //           })
  //           .join("\n"),
  //         ESV_VZ: busProds
  //           .map((el) => {
  //             let res = Math.round(useBusinessPlanData.oneESV_VZ(el));
  //             sumESV += res;
  //             return res;
  //           })
  //           .join("\n"),
  //         direct: busProds
  //           .map((el) => {
  //             let res = useBusinessPlanData.oneDirect(el);
  //             sumDirect += res;
  //             return res;
  //           })
  //           .join("\n"),
  //         OP_ITR_Fund: "",
  //         ESV_VZ_ITR: "",
  //         otherTotalProduction: "",
  //         totalProduction: "",
  //         variable: "",
  //         OP_ADM_Fund: "",
  //         ESV_VZ_ADM: "",
  //         otherPermanent: "",
  //         permanent: "",
  //         expenses: "",
  //         income: "",

  //         grossHarvest: busProds
  //           .map((el) => {
  //             const vegetationYear = el.vegetationYear;
  //             return (
  //               Math.round(
  //                 vegetationYear?.potentialYieldPerHectare! *
  //                   vegetationYear?.allCoeff! *
  //                   el.area
  //               ) || 0
  //             );
  //           })
  //           .join("\n"),
  //         cost: busProds
  //           .map((el) => el.product?.culture?.priceBerry! * 1000)
  //           .join("\n"),

  //         revenue: busProds
  //           .map((el) => {
  //             const vegetationYear = el.vegetationYear;
  //             let res =
  //               Math.round(
  //                 vegetationYear?.potentialYieldPerHectare! *
  //                   vegetationYear?.allCoeff! *
  //                   el.area
  //               ) *
  //                 el.product?.culture?.priceBerry! *
  //                 1000 || 0;
  //             sumTake += res;
  //             return res;
  //           })
  //           .join("\n"),
  //         investment: [
  //           ind == 0 ? "Початкові\u00A0інвестиції" : "Інвестиції",
  //           "Кредит",
  //           "Держ\u00A0підтримка",
  //           "Грант",
  //         ].join("\n"),
  //         sum: [sumInv, sumCredit, sumDerj, sumGrand].join("\n"),
  //       },
  //       {
  //         bold: true,
  //         period: "Разом\u00A0за\u00A0рік",
  //         year: "",
  //         culture: "",
  //         technology: "",
  //         map: "",
  //         area: sumArea,
  //         totalCost: sumCost,
  //         OPFund: sumSalary,
  //         ESV_VZ: sumESV,
  //         direct: useBusinessPlanData.sumDirect(myBusiness.busProds),
  //         OP_ITR_Fund: useBusinessPlanData.OP_ITR_Fund(thisWorkers),
  //         ESV_VZ_ITR: useBusinessPlanData.ESV_VZ_ITR(thisWorkers),
  //         otherTotalProduction: 0,
  //         totalProduction: useBusinessPlanData.totalProduction(thisWorkers),
  //         variable: useBusinessPlanData.variables(
  //           thisWorkers,
  //           myBusiness.busProds
  //         ),
  //         OP_ADM_Fund: Math.round(useBusinessPlanData.OP_ADM_Fund(thisWorkers)),
  //         ESV_VZ_ADM: Math.round(useBusinessPlanData.ESV_VZ_ADM(thisWorkers)),
  //         otherPermanent: 0,
  //         permanent: Math.round(
  //           useBusinessPlanData.sumPermanent(myBusiness.outcomes)
  //         ),
  //         expenses:
  //           thisWorkers
  //             .filter((el) => el.class == "Адміністративний")
  //             .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) *
  //             1.235 +
  //           Math.round(
  //             thisWorkers
  //               .filter((el) => el.class == "Інженерно технічний")
  //               .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0) * 1.235
  //           ) +
  //           sumDirect,
  //         income: sumTake + (ind == 0 ? myBusiness.initialAmount : 0),
  //         product: "",
  //         grossHarvest: "",
  //         cost: "",
  //         revenue: sumTake,
  //         investment: "",
  //         sum:
  //           (sumCredit || 0) + (sumInv || 0) + (sumDerj || 0) + (sumGrand || 0),
  //       }
  //     );
  //   });
  //   return res;
  // })();
  // const technologyCultureColumns = useMemo<ColumnDef<any>[]>(
  //   () => [
  //     { header: "Період", accessorKey: "period" },
  //     { header: "Рік", accessorKey: "year" },
  //     { header: "Продукт", accessorKey: "product" },
  //     { header: "Культура", accessorKey: "culture" },
  //     { header: "Технологія", accessorKey: "technology" },
  //     { header: "Карта", accessorKey: "map" },
  //     { header: "Площа", accessorKey: "area" },
  //     { header: "Загальна вартість", accessorKey: "totalCost" },
  //     { header: "Фонд ОП", accessorKey: "OPFund" },
  //     { header: "ЄСВ + ВЗ", accessorKey: "ESV_VZ" },
  //     { header: "Прямі", accessorKey: "direct" },
  //     { header: "Фонд ОП ІТР", accessorKey: "OP_ITR_Fund" },
  //     { header: "ЄСВ ВЗ ІТР", accessorKey: "ESV_VZ_ITR" },
  //     { header: "інші заг. вир.", accessorKey: "otherTotalProduction" },
  //     { header: "Заг. Вир.", accessorKey: "totalProduction" },
  //     { header: "Змінні", accessorKey: "variable" },
  //     { header: "Фонд ОП АДМ", accessorKey: "OP_ADM_Fund" },
  //     { header: "ЄСВ ВЗ АДМ", accessorKey: "ESV_VZ_ADM" },
  //     { header: "Інші постійні", accessorKey: "otherPermanent" },
  //     { header: "Постійні", accessorKey: "permanent" },
  //     { header: "Витрати", accessorKey: "expenses" },
  //     { header: "Доходи", accessorKey: "income" },
  //     { header: "Валовий збір тон", accessorKey: "grossHarvest" },
  //     { header: "Ціна", accessorKey: "cost" },
  //     { header: "Виручка", accessorKey: "revenue" },
  //     { header: "Інвестування", accessorKey: "investment" },
  //     { header: "Сума", accessorKey: "sum" },
  //   ],
  //   []
  // );
  return (
    <>
      <SectionTitle aref={aref} mt={"30px"}>
        Додатки
      </SectionTitle>
      <Paragraph>Додаток А. Установчі документи</Paragraph>
      <Paragraph>Додаток Б. Штатний роспис</Paragraph>
      <Table size={"sm"}>
        <Thead>
          <StaffingTableHeadRow isPlan={true} />
        </Thead>
        <Tbody>
          {(() => {
            let sum = 0;
            const res = [];
            for (let i = start; i <= end; i++) {
              thisWorkers
                .filter((el) => el.year == i - start)
                .forEach((el) => {
                  sum +=
                    el.salary *
                    (+el.dateTo?.split("-")[1] -
                      +el.dateFrom?.split("-")[1] +
                      1 || 12) *
                    el.amount;
                });
              res.push(
                <React.Fragment key={i}>
                  <Tr>
                    <Td>{i}</Td>
                  </Tr>
                  <StaffingTableBodyRows
                    thisWorkers={thisWorkers.filter(
                      (el) => el.year == i - start
                    )}
                    isPlan={true}
                  />
                </React.Fragment>
              );
            }
            res.push(
              <Tr fontWeight={"bold"} key={end + 1}>
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
      {(() => {
        const res = [];
        for (let i = start; i < end; i++) {
          res.push(<MyHeading textAlign={"left"}>{i}</MyHeading>);
          const busProds = myBusiness.busProds.filter(
            (el) => el.year == i - start
          );
          busProds.map((prod) => {
            res.push(
              <TechnologicalMapContent
                useIcons={false}
                id={prod.techCartId!}
                myMap={prod.tech_cart!}
                tech_opers={prod.tech_cart?.tech_operations}
              />
            );
          });
        }
        return res;
      })()}
      {/* <Paragraph>Культури технології</Paragraph>
      <Table size={"sm"}>
        <TableContent
          data={technologyCultureData}
          columns={technologyCultureColumns}
        />
      </Table> */}
      <Paragraph>Додаток Г. Калькуляція собівартості</Paragraph>
      {(() => {
        const res = [];
        for (let i = start; i <= end; i++) {
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

            const vegetationYear = el.vegetationYear;
            const sum =
              Math.round(
                (vegetationYear?.potentialYieldPerHectare! *
                  el.area *
                  el.product?.culture?.priceBerry! *
                  vegetationYear?.allCoeff! || 0) * 100
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
