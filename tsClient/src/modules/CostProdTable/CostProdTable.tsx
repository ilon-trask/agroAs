import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

function CostProdTable() {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th rowSpan={3}>
            Назва <br /> продукції
          </Th>
          <Th rowSpan={3}> Обсяг</Th>
          <Th colSpan={6} textAlign={"center"}>
            Собіварість
          </Th>
          <Th rowSpan={3}>
            Загальна <br /> собівартість
          </Th>
        </Tr>
        <Tr>
          <Th fontSize={"12px"} textTransform={"none"} colSpan={2}>
            у прямих
          </Th>
          <Th fontSize={"12px"} textTransform={"none"} colSpan={2}>
            у загально виробничих
          </Th>
          <Th fontSize={"12px"} textTransform={"none"} colSpan={2}>
            у постійних
          </Th>
        </Tr>
        <Tr>
          <Th>Ціна</Th>
          <Th>Сума</Th>
          <Th>Ціна</Th>
          <Th>Сума</Th>
          <Th>Ціна</Th>
          <Th>Сума</Th>
        </Tr>
      </Thead>
      <Tbody></Tbody>
    </Table>
  );
}

export default CostProdTable;
