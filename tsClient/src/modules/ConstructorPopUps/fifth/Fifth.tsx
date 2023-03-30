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
import React, { useContext } from "react";
import { Context } from "../../../main";

function Fifth() {
  const { map } = useContext(Context);
  return (
    <Box h={"300px"}>
      <Heading as={"h4"} size={"md"} textAlign={"center"} mt={3}>
        Змінити вартість послуг
      </Heading>
      <Box>
        <Table>
          <Thead>
            <Th>Назва</Th>
            <Th>Ціна</Th>
            <Th>Одиниця виміру</Th>
          </Thead>
          <Tbody>
            {map.costServices.map((el) => {
              return (
                <Tr>
                  <Td>{el.nameService}</Td>
                  <Td>
                    {/* {el.price} */}
                    <Input value={el.price} autoFocus />
                  </Td>
                  <Td>{el.unitsOfCost}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default Fifth;
