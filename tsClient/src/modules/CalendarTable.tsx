import React from "react";
import {
  Box,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Itech_operation } from "../../../tRPC serv/models/models";
import { sectionsOpers } from "../store/GetSectionsOpers";
import CalendarTableItem from "../components/CalendarTableItem";
type props = {
  sections: sectionsOpers;
};
export default function CalendarTable({ sections }: props) {
  return (
    <TableContainer mt={"15px"}>
      <Table variant="simple">
        <TableCaption>ДЯКУЄМО!ДЯКУЄМО!ДЯКУЄМО!</TableCaption>
        <Thead>
          <Tr>
            <Th>РОБОТИ</Th>
            <Th>СІЧЕНЬ</Th>
            <Th>ЛЮТИЙ</Th>
            <Th>БЕРЕЗЕНЬ</Th>
            <Th>КВІТЕНЬ</Th>
            <Th>ТРАВЕНЬ</Th>
            <Th>ЧЕРВЕНЬ</Th>
            <Th>ЛИПЕНЬ</Th>
            <Th>СЕРПЕНЬ</Th>
            <Th>ВЕРЕСЕНЬ</Th>
            <Th>ЖОВТЕНЬ</Th>
            <Th>ЛИСТОПАД</Th>
            <Th>ГРУДЕНЬ</Th>
            <Th>РІК</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sections.map(
            (el) =>
              el.arr[0] && <CalendarTableItem arr={el.arr} title={el.title} />
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
