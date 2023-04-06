import {
  Box,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { resTechOperation } from "../../../../../tRPC serv/controllers/TechCartService";
import { Context } from "../../../main";

function Third({
  prop,
  setProp,
}: {
  prop: resTechOperation[] | [];
  setProp: Dispatch<SetStateAction<resTechOperation[]>>;
}) {
  const { map } = useContext(Context);
  useEffect(() => {
    const opers = map.opers;
    const hand: resTechOperation[] = opers.filter(
      (el) => el.cell == "costHandWork"
    );
    hand.sort((a, b) => a?.id! - b?.id!);
    hand.forEach((el) => {
      //@ts-ignore
      el.gradeId = el?.cost_hand_work?.gradeId;
      //@ts-ignore
      el.type = el?.cost_hand_work?.type;
      //@ts-ignore
      el.productionRateTime = el?.cost_hand_work?.productionRateTime;
      //@ts-ignore
      el.yieldСapacity = el?.cost_hand_work?.yieldСapacity;
      //@ts-ignore
      el.productionRateWeight = el?.cost_hand_work?.productionRateWeight;
      //@ts-ignore
      el.spending = el?.cost_hand_work?.spending;
      //@ts-ignore
      el.productionRateAmount = el?.cost_hand_work?.productionRateAmount;
    });
    setProp(hand);
  }, []);
  return (
    <Box h={"300px"}>
      <Heading as={"h4"} size={"md"} textAlign={"center"} mt={3}>
        Змінити вартість ручних робіт
      </Heading>
      <Box height={"270px"} overflowY={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>

              <Th>Норма Виробітку</Th>
              <Th>
                Одини.
                <br /> вим.
              </Th>
              <Th>
                Показник <br />
                на 1га
              </Th>
              <Th>
                Одини.
                <br /> вим.
              </Th>
              <Th>Назва показника</Th>
            </Tr>
          </Thead>
          <Tbody>
            {prop.map((el, ind) => {
              const norm =
                //@ts-ignore
                el.type == 1 ? (
                  <Input
                    //@ts-ignore
                    value={el.productionRateTime}
                    onChange={(e) => {
                      //@ts-ignore
                      setProp((prev) => [
                        ...prev.slice(0, ind),
                        { ...prev[ind], productionRateTime: +e.target.value },
                        ...prev.slice(ind + 1),
                      ]);
                    }}
                  />
                ) : //@ts-ignore
                el.type == 2 ? (
                  <Input
                    //@ts-ignore
                    value={el.productionRateWeight}
                    onChange={(e) => {
                      //@ts-ignore
                      setProp((prev) => [
                        ...prev.slice(0, ind),
                        { ...prev[ind], productionRateWeight: +e.target.value },
                        ...prev.slice(ind + 1),
                      ]);
                    }}
                  />
                ) : //@ts-ignore
                el.type == 3 ? (
                  <Input
                    //@ts-ignore
                    value={el.productionRateAmount}
                    onChange={(e) => {
                      //@ts-ignore
                      setProp((prev) => [
                        ...prev.slice(0, ind),
                        { ...prev[ind], productionRateAmount: +e.target.value },
                        ...prev.slice(ind + 1),
                      ]);
                    }}
                  />
                ) : null;
              const units1 =
                //@ts-ignore
                el.type == 1
                  ? //@ts-ignore
                    "м²/год"
                  : //@ts-ignore
                  el.type == 2
                  ? //@ts-ignore
                    "кг/год"
                  : //@ts-ignore
                  el.type == 3
                  ? //@ts-ignore
                    "шт/год"
                  : null;
              const indOne =
                //@ts-ignore
                el.type == 1 ? null : el.type == 2 ? ( //@ts-ignore
                  <Input
                    //@ts-ignore
                    value={el.yieldСapacity}
                    onChange={(e) => {
                      //@ts-ignore
                      setProp((prev) => [
                        ...prev.slice(0, ind),
                        { ...prev[ind], yieldСapacity: +e.target.value },
                        ...prev.slice(ind + 1),
                      ]);
                    }}
                  />
                ) : //@ts-ignore
                el.type == 3 ? (
                  <Input
                    //@ts-ignore
                    value={el.spending}
                    onChange={(e) => {
                      //@ts-ignore
                      setProp((prev) => [
                        ...prev.slice(0, ind),
                        { ...prev[ind], spending: +e.target.value },
                        ...prev.slice(ind + 1),
                      ]);
                    }}
                  />
                ) : null;
              const units2 =
                //@ts-ignore
                el.type == 1
                  ? null
                  : //@ts-ignore
                  el.type == 2
                  ? "кг/га"
                  : //@ts-ignore
                  el.type == 3
                  ? "шт/га"
                  : null;
              const nameInd =
                //@ts-ignore
                el.type == 1
                  ? null
                  : //@ts-ignore
                  el.type == 2
                  ? "Урожайність"
                  : //@ts-ignore
                  el.type == 3
                  ? "Розхід"
                  : null;
              return (
                <Tr key={el.id}>
                  <Td>{el.nameOperation}</Td>
                  <Td>{norm}</Td>
                  <Td>{units1}</Td>
                  <Td>{indOne}</Td>
                  <Td>{units2}</Td>
                  <Td>{nameInd}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default Third;
