import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { Itech_operation } from "../../../tRPC serv/models/models";
type props = { arr: Itech_operation[]; title: string };
export default function CalendarTableItem({ arr, title }: props) {
  return (
    <Tr>
      <Td>{title}</Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
    </Tr>
  );
}
