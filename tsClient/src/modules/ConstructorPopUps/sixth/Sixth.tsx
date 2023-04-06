import {
  Box,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { resTechOperation } from "../../../../../tRPC serv/controllers/TechCartService";
import { Context } from "../../../main";

function Sixth({
  prop,
  setProp,
}: {
  prop: resTechOperation[] | [];
  setProp: Dispatch<SetStateAction<resTechOperation[]>>;
}) {
  const { map } = useContext(Context);
  useEffect(() => {
    const opers = map.opers;
    const transp = opers.filter((el) => el.cell == "costTransport");
    transp.sort((a, b) => a?.id! - b?.id!);
    setProp(transp);
  }, []);
  return (
    <Box h={"300px"}>
      <Heading as={"h4"} size={"md"} textAlign={"center"} mt={3}>
        Змінити вартість транспорту
      </Heading>
      <Box height={"270px"} overflowY={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Ціна</Th>
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
                      value={el.costTransport}
                      onChange={(e) => {
                        //@ts-ignore
                        setProp((prev) => [
                          ...prev.slice(0, ind),
                          { ...prev[ind], costTransport: e.target.value },
                          ...prev.slice(ind + 1),
                        ]);
                      }}
                    />
                  </Td>
                  <Td>{el?.cost_transport?.unitsOfCost}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default Sixth;
