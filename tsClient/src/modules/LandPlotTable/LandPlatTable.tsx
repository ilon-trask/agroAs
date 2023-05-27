import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
export function LandPlatTableHead({ isPlan }: { isPlan?: boolean }) {
  return (
    <Tr>
      <Th>Вид оплати</Th>
      <Th>Кадастровий номер</Th>
      <Th>Площа</Th>
      <Th>Ставка</Th>
      <Th>Плата за землю</Th>
      <Th>Власність</Th>
    </Tr>
  );
}
function LandPlatTable({ isPlan }: { isPlan?: boolean }) {
  return (
    <Table size={"sm"}>
      <Thead>
        <LandPlatTableHead />
      </Thead>
      <Tbody></Tbody>
    </Table>
  );
}

export default LandPlatTable;
