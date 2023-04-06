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

function Fourth({
  prop,
  setProp,
}: {
  prop: resTechOperation[] | [];
  setProp: Dispatch<SetStateAction<resTechOperation[]>>;
}) {
  const { map } = useContext(Context);
  useEffect(() => {
    const opers = map.opers;
    const mater = opers.filter((el) => el.cell == "costMaterials");
    mater.sort((a, b) => a?.id! - b?.id!);
    mater.forEach((el) => {
      //@ts-ignore
      el.price = +el?.cost_material?.price;
      //@ts-ignore
      el.consumptionPerHectare = +el?.cost_material?.consumptionPerHectare;
    });
    setProp(mater);
  }, []);
  return (
    <Box h={"300px"}>
      <Heading as={"h4"} size={"md"} textAlign={"center"} mt={3}>
        Змінити вартість матеріалів
      </Heading>
      <Box height={"270px"} overflowY={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Ціна матеріалу</Th>
              <Th>
                Одини.
                <br /> вим.
              </Th>
              <Th>
                Розхід&nbsp;на <br /> 1га
              </Th>
              <Th>
                Одини.
                <br /> вим.
              </Th>
            </Tr>
          </Thead>
          <Tbody mt={"41px"}>
            {prop.map((el, ind) => {
              return (
                <Tr key={el.id}>
                  <Td>{el.nameOperation}</Td>
                  <Td>
                    <Input
                      //@ts-ignore
                      value={el?.price}
                      onChange={(e) => {
                        //@ts-ignore
                        setProp((prev) => [
                          ...prev.slice(0, ind),
                          { ...prev[ind], price: +e.target.value },
                          ...prev.slice(ind + 1),
                        ]);
                      }}
                    />
                  </Td>
                  <Td>{el?.cost_material?.unitsOfCost}</Td>
                  <Td>
                    <Input
                      //@ts-ignore
                      value={el?.consumptionPerHectare}
                      onChange={(e) => {
                        //@ts-ignore
                        setProp((prev) => [
                          ...prev.slice(0, ind),
                          {
                            ...prev[ind],
                            consumptionPerHectare: +e.target.value,
                          },
                          ...prev.slice(ind + 1),
                        ]);
                      }}
                    />
                  </Td>
                  <Td>{el?.cost_material?.unitsOfConsumption}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default Fourth;
