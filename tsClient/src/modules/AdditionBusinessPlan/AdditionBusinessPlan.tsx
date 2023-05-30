import { Table, Tbody, Td, Th, Thead, Tr, Box, Text } from "@chakra-ui/react";
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
      <Paragraph>Культури технології</Paragraph>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>Період</Th>
            <Th>Рік</Th>
            <Th>Культура</Th>
            <Th>Технологія</Th>
            <Th>Карта</Th>
            <Th>Площа</Th>
            <Th>Загальна вартість</Th>
            <Th>Фонд ОП</Th>
            <Th>ЄСВ&nbsp;+ ВЗ</Th>
            <Th>Прямі</Th>
            <Th>Фонд ОП ІТР</Th>
            <Th>ЄСВ ВЗ ІТР</Th>
            <Th>інші заг. вир.</Th>
            <Th>Заг. Вир.</Th>
            <Th>Змінні</Th>
            <Th>Фонд ОП АДМ</Th>
            <Th>ЄСВ ВЗ АДМ</Th>
            <Th>інші постійні</Th>
            <Th>Постійні</Th>
            <Th>Витрати</Th>
            <Th>Доходи</Th>
            <Th>Продукт</Th>
            <Th>Валовий збір тон</Th>
            <Th>Ціна</Th>
            <Th>Виручка</Th>
            <Th>Інвестування</Th>
            <Th>Сума</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            let years: number[] = new Array(
              myBusiness.realizationTime + 1 < 11
                ? myBusiness.realizationTime + 1
                : 11
            ).fill(1);

            return years.map((el, ind) => {
              let sumArea = 0,
                sumCost = 0,
                sumSalary = 0,
                sumESV = 0,
                sumDirect = 0,
                sumTake = 0;
              return (
                <>
                  <Tr>
                    <Td>{ind}</Td>
                    <Td>{start + ind}</Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => (
                        <Text>
                          {el.culture?.name.split(" ").join("\u00A0")}
                        </Text>
                      ))}
                    </Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => (
                        <Text>
                          {el.cultivationTechnology?.name
                            .split(" ")
                            .join("\u00A0")}
                        </Text>
                      ))}
                    </Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => (
                        <Text>
                          {thisMaps.find(
                            (e) =>
                              e.cultureId == el.cultureId &&
                              e.cultivationTechnologyId ==
                                el.cultivationTechnologyId &&
                              +e.year.split("")[0] == ind
                          )?.nameCart || "Відсутня"}
                        </Text>
                      ))}
                    </Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => {
                        sumArea += el.area;
                        return <Text>{el.area}</Text>;
                      })}
                    </Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => {
                        let res =
                          (thisMaps.find(
                            (e) =>
                              e.cultureId == el.cultureId &&
                              e.cultivationTechnologyId ==
                                el.cultivationTechnologyId &&
                              +e.year.split("")[0] == ind
                          )?.costHectare || 0) * el.area;
                        sumCost += res;
                        return <Text>{res}</Text>;
                      })}
                    </Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => (
                        <Text>
                          {(() => {
                            let cart = thisMaps.find(
                              (e) =>
                                e.cultureId == el.cultureId &&
                                e.cultivationTechnologyId ==
                                  el.cultivationTechnologyId &&
                                +e.year.split("")[0] == ind
                            );
                            let res =
                              (cart?.totalCostHandWork ||
                                0 + cart?.totalCostMachineWork! ||
                                0) * el.area;
                            sumSalary += res;
                            return res;
                          })()}
                        </Text>
                      ))}
                    </Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => (
                        <Text>
                          {(() => {
                            let cart = thisMaps.find(
                              (e) =>
                                e.cultureId == el.cultureId &&
                                e.cultivationTechnologyId ==
                                  el.cultivationTechnologyId &&
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
                          })()}
                        </Text>
                      ))}
                    </Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => (
                        <Text>
                          {(() => {
                            let cart = thisMaps.find(
                              (e) =>
                                e.cultureId == el.cultureId &&
                                e.cultivationTechnologyId ==
                                  el.cultivationTechnologyId &&
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
                          })()}
                        </Text>
                      ))}
                    </Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => (
                        <Text>
                          {el.culture?.product.split(" ").join("\u00A0")}
                        </Text>
                      ))}
                    </Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => {
                        let myYield = income.yieldPlant.find(
                          (e) => e.cultureId == el.cultureId
                        );
                        const vegetation = income.vegetationYear.find(
                          (e) =>
                            e.yieldPlantId == myYield?.id &&
                            +e.year.split("")[0] == ind
                        );
                        return (
                          <Text>
                            {Math.round(
                              myYield?.yieldPerHectare! *
                                vegetation?.allCoeff! *
                                el.area
                            ) || 0}
                          </Text>
                        );
                      })}
                    </Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => (
                        <Text>{el.culture?.priceBerry! * 1000}</Text>
                      ))}
                    </Td>
                    <Td>
                      {myBusiness.busCuls.map((el) => {
                        let myYield = income.yieldPlant.find(
                          (e) => e.cultureId == el.cultureId
                        );
                        const vegetation = income.vegetationYear.find(
                          (e) =>
                            e.yieldPlantId == myYield?.id &&
                            +e.year.split("")[0] == ind
                        );
                        let res =
                          Math.round(
                            myYield?.yieldPerHectare! *
                              vegetation?.allCoeff! *
                              el.area
                          ) *
                            el.culture?.priceBerry! *
                            1000 || 0;
                        sumTake += res;
                        return <Text>{res}</Text>;
                      })}
                    </Td>
                    <Td>
                      {
                        <>
                          <Box>
                            {ind == 0
                              ? "Початкові\u00A0інвестиції"
                              : "Інвестиції"}
                          </Box>
                          <Box>Кредит</Box>
                          <Box>
                            Держ.&nbsp;підтримка
                            {/* {income.credit
                              .filter(
                                (el) => +el.date.split("-")[2] - start == ind
                              )
                              .map((el) => {
                                <Text>{el.name}</Text>;
                              })} */}
                          </Box>
                          <Box>
                            Грант
                            {/* {income.credit
                              .filter(
                                (el) => +el.date.split("-")[2] - start == ind
                              )
                              .map((el) => {
                                <Text>{el.name}</Text>;
                              })} */}
                          </Box>
                        </>
                      }
                    </Td>
                    <Td>
                      {ind == 0
                        ? myBusiness.initialAmount
                        : income.investment
                            .filter(
                              (el) => +el.date.split("-")[0] - start == ind
                            )
                            .map((el) => {
                              return <Text>{el.name}</Text>;
                            }) || <Text>0</Text>}
                      <Text>0</Text>
                      <Text>0</Text>
                      <Text>0</Text>
                      {/* {income.credit
                              .filter(
                                (el) => +el.date.split("-")[0] - start == ind
                              )
                              .map((el) => {
                                return <Text>{el.name}</Text>;
                              })} */}
                    </Td>
                  </Tr>
                  <Tr fontWeight={"bold"}>
                    <Td colSpan={2}>Разом за рік</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>{sumArea}</Td>
                    <Td>{sumCost}</Td>
                    <Td>{sumSalary}</Td>
                    <Td>{sumESV}</Td>
                    <Td>{sumDirect}</Td>
                    <Td>
                      {thisWorkers
                        .filter((el) => el.class == "Інженерно технічний")
                        .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0)}
                    </Td>
                    <Td>
                      {thisWorkers
                        .filter((el) => el.class == "Інженерно технічний")
                        .reduce(
                          (p, c) => p + c.salary * c.amountOfMounths!,
                          0
                        ) * 0.235}
                    </Td>
                    <Td>0</Td>
                    <Td>
                      {Math.round(
                        thisWorkers
                          .filter((el) => el.class == "Інженерно технічний")
                          .reduce(
                            (p, c) => p + c.salary * c.amountOfMounths!,
                            0
                          ) * 1.235
                      )}
                    </Td>
                    <Td>
                      {Math.round(
                        thisWorkers
                          .filter((el) => el.class == "Інженерно технічний")
                          .reduce(
                            (p, c) => p + c.salary * c.amountOfMounths!,
                            0
                          ) * 1.235
                      ) + sumDirect}
                    </Td>
                    <Td>
                      {thisWorkers
                        .filter((el) => el.class == "Адміністративний")
                        .reduce((p, c) => p + c.salary * c.amountOfMounths!, 0)}
                    </Td>
                    <Td>
                      {thisWorkers
                        .filter((el) => el.class == "Адміністративний")
                        .reduce(
                          (p, c) => p + c.salary * c.amountOfMounths!,
                          0
                        ) * 0.235}
                    </Td>
                    <Td>0</Td>
                    <Td>
                      {thisWorkers
                        .filter((el) => el.class == "Адміністративний")
                        .reduce(
                          (p, c) => p + c.salary * c.amountOfMounths!,
                          0
                        ) * 1.235}
                    </Td>
                    <Td>
                      {thisWorkers
                        .filter((el) => el.class == "Адміністративний")
                        .reduce(
                          (p, c) => p + c.salary * c.amountOfMounths!,
                          0
                        ) *
                        1.235 +
                        Math.round(
                          thisWorkers
                            .filter((el) => el.class == "Інженерно технічний")
                            .reduce(
                              (p, c) => p + c.salary * c.amountOfMounths!,
                              0
                            ) * 1.235
                        ) +
                        sumDirect}
                    </Td>
                    <Td>
                      {sumTake + (ind == 0 ? myBusiness.initialAmount : 0)}
                    </Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>{sumTake}</Td>
                    <Td></Td>
                    <Td>{ind == 0 ? myBusiness.initialAmount : 0}</Td>
                  </Tr>
                </>
              );
            });
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
