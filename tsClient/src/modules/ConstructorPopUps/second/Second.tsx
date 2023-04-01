import {
  Box,
  Heading,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Input,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { resTechOperation } from "../../../../../tRPC serv/controllers/TechCartService";
import { Context } from "../../../main";

function Second({
  prop,
  setProp,
}: {
  prop: resTechOperation[] | [];
  setProp: Dispatch<SetStateAction<resTechOperation[]>>;
}) {
  const { map } = useContext(Context);
  useEffect(() => {
    const opers = map.opers;
    const mech: resTechOperation[] = opers.filter(
      (el) => el.cell == "costMechanical"
    );
    mech.sort((a, b) => a?.id! - b?.id!);
    mech.forEach((el) => {
      //@ts-ignore
      el.fuelConsumption = el?.aggregate?.tractor.fuelConsumption;
      //@ts-ignore
      el.idMachine = el?.aggregate?.agriculturalMachineId;
      //@ts-ignore
      el.idTractor = el?.aggregate?.tractorId;
      //@ts-ignore
      el.yieldСapacity = el?.aggregate?.yieldСapacity;
      //@ts-ignore
      el.workingSpeed = el?.aggregate?.agricultural_machine.workingSpeed;
    });
    setProp(mech);
  }, []);
  return (
    <Box h={"300px"}>
      <Heading as={"h4"} size={"md"} textAlign={"center"} mt={3}>
        Змінити Вартість механізованих робіт
      </Heading>
      <Box height={"270px"} overflowY={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Трактор</Th>
              <Th>
                Розхід <br /> палива
              </Th>
              <Th>
                СГ <br /> маниша
              </Th>
              <Th>
                Робоча <br /> швидкість
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {prop.map((el, ind) => {
              const trac = el.aggregate?.tractor.brand;
              const machine = el.aggregate?.agricultural_machine.brand;
              return (
                <Tr>
                  <Td>{el.nameOperation}</Td>
                  <Td>{trac}</Td>
                  <Td>
                    {
                      <Input
                        //@ts-ignore
                        value={el.fuelConsumption}
                        onChange={(e) => {
                          //@ts-ignore
                          setProp((prev) => [
                            ...prev.slice(0, ind),
                            {
                              ...prev[ind],
                              fuelConsumption: +e.target.value,
                            },
                            ...prev.slice(ind + 1),
                          ]);
                        }}
                      />
                    }
                  </Td>
                  <Td>{machine}</Td>
                  <Td>
                    {
                      <Input
                        //@ts-ignore
                        value={el.workingSpeed}
                        onChange={(e) => {
                          //@ts-ignore
                          setProp((prev) => [
                            ...prev.slice(0, ind),
                            {
                              ...prev[ind],
                              workingSpeed: +e.target.value,
                            },
                            ...prev.slice(ind + 1),
                          ]);
                        }}
                      />
                    }
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default Second;
