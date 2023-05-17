import { Table, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

function CostProdTableHeadRows() {
  return (
    <>
      <Tr>
        <Th rowSpan={3} verticalAlign={"top"}>
          Назва <br /> продукції
        </Th>
        <Th rowSpan={3} verticalAlign={"top"}>
          Обсяг
        </Th>
        <Th colSpan={6} textAlign={"center"}>
          Собіварість
        </Th>
        <Th rowSpan={3} verticalAlign={"top"}>
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
    </>
  );
}
export { CostProdTableHeadRows };
function CostProdTable() {
  return (
    <Table>
      <Thead>
        <CostProdTableHeadRows />
      </Thead>
      <Tbody></Tbody>
    </Table>
  );
}

export default CostProdTable;
