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
import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import {
  resTechCartsWithOpers,
  resTechOperation,
} from "../../../../../tRPC serv/controllers/TechCartService";
import { Icost_service } from "../../../../../tRPC serv/models/models";
import { Context } from "../../../main";

function Fifth({
  prop,
  setProp,
}: {
  prop: resTechOperation[] | [];
  setProp: Dispatch<SetStateAction<resTechOperation[]>>;
}) {
  const { map } = useContext(Context);
  useEffect(() => {
    const opers = map.opers;
    const serv = opers.filter((el) => el.cell == "costServices");
    serv.sort((a, b) => a?.id! - b?.id!);
    setProp(serv);
  }, []);

  return (
    <Box h={"300px"}>
      <Heading as={"h4"} size={"md"} textAlign={"center"} mt={3}>
        Змінити вартість послуг
      </Heading>
      <Box height={"270px"} overflowY={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Ціна </Th>
              <Th>
                Одини.
                <br /> вим.
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {prop.map((el, ind) => {
              return (
                <Tr key={el.id}>
                  <Td>{el.nameOperation}</Td>
                  <Td>
                    <Input
                      minW={"fit-content"}
                      value={el.costServices}
                      onChange={(e) => {
                        //@ts-ignore
                        setProp((prev) => [
                          ...prev.slice(0, ind),
                          { ...prev[ind], costServices: e.target.value },
                          ...prev.slice(ind + 1),
                        ]);
                      }}
                    />
                  </Td>
                  <Td>{el?.cost_service?.unitsOfCost}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default observer(Fifth);
