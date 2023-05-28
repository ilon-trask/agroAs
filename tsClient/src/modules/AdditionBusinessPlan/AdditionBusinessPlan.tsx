import { Table, Tbody, Td, Th, Thead, Tr, Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Context } from "src/main";
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
import { Iworker } from "../../../../tRPC serv/models/models";
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
}) {
  const { map, income } = useContext(Context);
  return (
    <>
      <SectionTitle>Додатки</SectionTitle>
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
                <>
                  <Tr>
                    <Td>{i}</Td>
                  </Tr>
                  <StaffingTableBodyRows
                    thisWorkers={thisWorkers}
                    isPlan={true}
                  />
                </>
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
              for (let j = 0; j < myBusiness?.busCuls?.length!; j++) {
                const e = myBusiness?.busCuls[j];

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
                      return el.map((e) => {
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
                            <>
                              {/* <карти></к> */}
                              <OperTableSection
                                arr={e.arr}
                                title={e.title}
                                mapData={{ area: 3 }}
                                id={mapData?.id!}
                                deleteOpen={() => {}}
                                setCell={() => {}}
                                setDeleteOpen={() => {}}
                                setOpen={() => {}}
                                setRes={() => {}}
                                setShowAlert={() => {}}
                                setUpdate={() => {}}
                                sum={sum}
                              />
                            </>
                          );
                      });
                    })
                );
                console.log("цук");

                console.log(...res);
                console.log(res.flat().flat());
              }
            }

            return res.flat().flat();
          })()}
        </Tbody>
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
                    <Td>{el}</Td>
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
          myBusiness?.busCuls?.forEach((el) => {
            const yearName = useVegetationYears[i - start + 1].name;
            console.log(i - start);

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
                  el.culture?.priceBerry! *
                  vegetation?.allCoeff! || 0) * 100
              ) / 100;
            endSum += sum;
            endSum = Math.round(endSum * 1000) / 1000;
            obj[el.culture?.collectPeriod!] += sum;
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
