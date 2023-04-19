import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import { BUSINESSpLAN_ROUTER } from "../utils/consts";

function BusinessTable() {
  const { business } = useContext(Context);
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Td></Td>
          <Td>Назва</Td>
          <Td>ТЕО</Td>
          <Td>Культура</Td>
          <Td>Технологія</Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      </Thead>
      <Tbody>
        {business.businessPlan.map((el) => (
          <Tr>
            <Td></Td>
            <Td>
              <Link to={BUSINESSpLAN_ROUTER + "/" + el.id}>{el.name}</Link>
            </Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default BusinessTable;
