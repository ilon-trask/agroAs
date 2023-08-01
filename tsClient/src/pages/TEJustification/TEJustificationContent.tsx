import { Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useContext, Dispatch, SetStateAction } from "react";
import { Context } from "src/main";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyTableContainer from "src/ui/MyTableContainer";
import { resTechCartsWithOpers } from "../../../../tRPC serv/controllers/TechCartService";
import { ItechnologicalEconomicJustification } from "../../../../tRPC serv/models/models";

type props = {
  myCart: resTechCartsWithOpers | undefined;
} & (
  | { isPlan: true; myJustification: { area: number } }
  | {
      isPlan: false;
      myJustification: ItechnologicalEconomicJustification | undefined;
      setUpdCartOpen: Dispatch<SetStateAction<boolean>>;
      setUpdCartRes: Dispatch<
        SetStateAction<ItechnologicalEconomicJustification>
      >;
    }
);
function TEJustificationContent(props: props) {
  const { map } = useContext(Context);
  const { myJustification, myCart, isPlan } = props;

  let costMechTot = 0;
  let peopleHourTot = 0;
  let medCostHand = 0;
  let medCostHandCounter = 0;
  let costHand = 0;
  let costMech = 0;

  myCart?.tech_operations?.forEach((el) => {
    costHand += (el?.costHandWork || 0) * myJustification?.area!;
    costMech += (el?.costMachineWork || 0) * myJustification?.area!;
  });
  console.log(myCart);

  return (
    <>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              {!isPlan && <Th></Th>}
              <Th>Назва карти</Th>
              <Th>Кількість га</Th>
              <Th>Ціна грн/га</Th>
              <Th>Сума грн</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {!isPlan && (
                <Td
                  onClick={() => {
                    props.setUpdCartOpen(true);
                    props.setUpdCartRes({
                      ...myJustification!,
                    });
                  }}
                >
                  <MyEditIcon />
                </Td>
              )}
              <Td>{myCart?.nameCart}</Td>

              <Td>{myJustification?.area}</Td>
              <Td>{myCart?.costHectare}</Td>
              <Td>{myCart?.costHectare! * myJustification?.area!}</Td>
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
        Витрати праці
      </Text>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Види робіт</Th>
              <Th>Операція</Th>
              <Th>Кількість</Th>
              <Th>Середня ціна</Th>
              <Th>Сума</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr fontWeight={"bold"}>
              <Td>Механізовані роботи</Td>
              <Td></Td>
              <Td>Люд/год</Td>
              <Td>Грн/год</Td>
              <Td></Td>
            </Tr>
            {myCart?.tech_operations
              ?.filter((el) => el.cell == "costMechanical")
              .map((el) => {
                const totalCost = el.costMachineWork! * myJustification?.area!;
                const peopleHour =
                  Math.round(
                    (totalCost /
                      ((myCart?.salary! / 176) *
                        map.grade.find(
                          (e) => e?.id! == el?.aggregate?.tractor.gradeId
                        )?.coefficient!)) *
                      100
                  ) / 100;
                const costMech = Math.round(
                  ((totalCost / peopleHour) * 100) / 100
                );
                return (
                  <Tr key={el.id}>
                    <Td>{}</Td>
                    <Td>{el.nameOperation}</Td>
                    <Td>{peopleHour}</Td>
                    <Td>{costMech}</Td>
                    <Td>{el.costMachineWork! * myJustification?.area!}</Td>
                  </Tr>
                );
              })}
            <Tr fontWeight={"bold"}>
              <Td>Ручні роботи</Td>
              <Td></Td>
              <Td>Люд/год</Td>
              <Td>Грн/год</Td>
              <Td></Td>
            </Tr>
            {myCart?.tech_operations
              ?.filter(
                (el) =>
                  el.cell == "costHandWork" ||
                  (el.cell == "costMechanical" && el.costHandWork)
              )
              .map((el) => {
                const totalCost = el.costHandWork! * myJustification?.area!;
                const peopleHour =
                  Math.round(
                    (totalCost /
                      ((myCart?.salary! / 176) *
                        map.grade.find(
                          (e) =>
                            e.id! == el.cost_hand_work?.gradeId! ||
                            el.aggregate?.agricultural_machine.gradeId
                        )?.coefficient!)) *
                      100
                  ) / 100;
                peopleHourTot += peopleHour;
                const costHand = Math.round(
                  ((totalCost / peopleHour) * 100) / 100
                );
                medCostHand += costHand;
                medCostHandCounter += 1;
                return (
                  <Tr key={el.id}>
                    <Td>{}</Td>
                    <Td>{el.nameOperation}</Td>
                    <Td>{peopleHour}</Td>
                    <Td>{costHand}</Td>
                    <Td>{totalCost}</Td>
                  </Tr>
                );
              })}
            <Tr fontWeight={"bold"}>
              <Td>Всього по оплаті праці</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>{costHand + costMech}</Td>
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
              let acc: number[] = [];
              let mechHours = 0;
              return myCart?.tech_operations
                ?.filter((el) => el.cell == "costMechanical")
                .map((el, ind) => {
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
                        {Math.round(amountOfTractorDepreciationPerHour! * 100) /
                          100}
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
              let acc: number[] = [];
              let mechHours = 0;
              return myCart?.tech_operations
                ?.filter((el) => el.cell == "costMechanical")
                .map((el, ind) => {
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
                      <Td>{el?.aggregate?.agricultural_machine.nameMachine}</Td>
                      <Td>{el?.aggregate?.agricultural_machine.brand}</Td>
                      <Td>маш/год</Td>
                      <Td>{Math.round(mechHours * 100) / 100}</Td>
                      <Td>
                        {Math.round(amountOfMachineDepreciationPerHour! * 100) /
                          100}
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
              let cost = 0;
              return (
                <>
                  {map.purposeMaterial.map((el) => {
                    const mat =
                      myCart?.tech_operations
                        ?.filter((el) => el.cell == "costMaterials")
                        .map((el) => el.cost_material)
                        .filter((e) => e?.purposeMaterialId == el?.id) || [];

                    console.log("єmatє");
                    console.log(mat);
                    if (mat[0])
                      return (
                        <>
                          <Tr key={el.id}>
                            <Td fontWeight={"bold"}>{el.purpose}</Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                          </Tr>
                          {mat?.map((elem) => {
                            const hco =
                              (elem?.consumptionPerHectare || 0) *
                              myJustification?.area!;
                            const hp = hco * (elem?.price || 0);
                            cost += hp;
                            console.log("try elem");

                            return (
                              <Tr key={elem?.id}>
                                <Td></Td>
                                <Td>{elem?.nameMaterials}</Td>
                                <Td>{elem?.unitsOfConsumption}</Td>
                                <Td>{hco}</Td>
                                <Td>{elem?.price}</Td>
                                <Td>{hp}</Td>
                              </Tr>
                            );
                          })}
                        </>
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
              const serv =
                myCart?.tech_operations
                  ?.filter((el) => el.cell == "costServices")
                  .map((el) => el.cost_service) || [];
              return (
                <>
                  {serv.map((elem) => {
                    cost += myJustification?.area! * (elem?.price || 0);
                    return (
                      <Tr key={elem?.id}>
                        <Td>{elem?.nameService}</Td>
                        <Td>{elem?.unitsOfCost}</Td>
                        <Td>{myJustification?.area}</Td>
                        <Td>{elem?.price}</Td>
                        <Td>{myJustification?.area! * (elem?.price || 0)}</Td>
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
              let cost = 0;
              const trans =
                myCart?.tech_operations
                  ?.filter((el) => el.cell == "costTransport")
                  .map((el) => el.cost_transport) || [];
              return (
                <>
                  {trans.map((elem) => {
                    cost += myJustification?.area! * (elem?.price || 0);
                    return (
                      <Tr key={elem?.id}>
                        <Td>{elem?.nameTransport}</Td>
                        <Td>{elem?.unitsOfCost}</Td>
                        <Td>{myJustification?.area}</Td>
                        <Td>{elem?.price}</Td>
                        <Td>{myJustification?.area! * (elem?.price || 0)}</Td>
                      </Tr>
                    );
                  })}
                  <Tr>
                    <Td fontWeight={"bold"}>Всього за транспорт</Td>
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
    </>
  );
}

export default TEJustificationContent;
