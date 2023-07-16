import { Box, Button, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { workProps } from "src/modules/CreateWork";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";

function BuildingBusTable() {
  const [workRes, setWorkRes] = useState<workProps>({
    nameWork: "",
    area: "",
    salary: "",
    priceDiesel: "",
  });
  const [workOpen, setWorkOpen] = useState(false);
  return (
    <>
      <MyHeading>Будівництво будівель і споруд</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Назва</Th>
              <Th>Початкова вартість</Th>
              <Th>Початок екстплатації</Th>
              <Th>Походження</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </MyTableContainer>
      <Box mt={"15px"} ml={"auto"} mb={"25px"} display={"flex"} gap={"10px"}>
        <Button onClick={() => setWorkOpen(true)}>
          Добавити спеціалізовані роботи
        </Button>
      </Box>
    </>
  );
}

export default BuildingBusTable;
