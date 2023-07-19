import { Box, Button, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateBuilding from "src/modules/CreateBuilding";
import { CreateBuildingProps } from "src/modules/CreateBuilding/CreateBuilding";
import { workProps } from "src/modules/CreateWork";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";

function BuildingBusTable({ id }: { id: number }) {
  const [res, setRes] = useState<CreateBuildingProps>({
    depreciationPeriod: "",
    enterpriseId: 0,
    name: "",
    startPrice: "",
    businessPlanId: id,
  });
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <>
      <MyHeading>Будівництво будівель і споруд</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Рік</Th>
              <Th>Назва</Th>
              <Th>Вартість</Th>
              <Th>Опис</Th>
              <Th>Налаштування</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </MyTableContainer>
      <Box mt={"15px"} ml={"auto"} mb={"25px"} display={"flex"} gap={"10px"}>
        <Button onClick={() => setOpen(true)}>
          Добавити спеціалізовані роботи
        </Button>
      </Box>
      <CreateBuilding
        data={res}
        open={open}
        setOpen={setOpen}
        setUpdate={setUpdate}
        update={update}
      />
    </>
  );
}

export default BuildingBusTable;
