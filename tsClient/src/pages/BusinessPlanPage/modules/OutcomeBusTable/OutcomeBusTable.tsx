import { Button, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import MyHeading from "src/ui/MyHeading";

function OutcomeBusTable() {
  return (
    <>
      <MyHeading>Витрати постійні</MyHeading>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>Сатті витрат</Th>
            <Th>Сума в місяць</Th>
            <Th>Сума за рік</Th>
            <Th>Вид розрахунку</Th>
          </Tr>
        </Thead>
        <Tbody></Tbody>
      </Table>
      <Button>Додати витрату</Button>
      <MyHeading>Витрати загальновиробничі</MyHeading>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>Сатті витрат</Th>
            <Th>Сума в місяць</Th>
            <Th>Сума за рік</Th>
            <Th>Вид розрахунку</Th>
          </Tr>
        </Thead>
        <Tbody></Tbody>
      </Table>
      <Button>Додати витрату</Button>
    </>
  );
}

export default OutcomeBusTable;
