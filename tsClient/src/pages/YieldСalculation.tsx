import {
  Button,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import CreateYieldCalc from "../modules/CreateYIeldCalculation";
import { INCOME_ROUTER } from "../utils/consts";
import { IyieldCalculation } from "../../../tRPC serv/models/models";

export const plantsHeads: Record<string, string[]> = {
  "Суниця садова": [
    "Кількість розеток",
    "Кількість квітконосів",
    "Кількість ягід",
    "Вага ягоди",
  ],

  Малина: [
    "Кількість пагонів",
    "Кількість суцвіть",
    "Кількість ягід",
    "Вага ягоди",
  ],
  Лохина: [
    "Кількість пагонів",
    "Кількість суцвіть",
    "Кількість ягід",
    "Вага ягоди",
  ],
};

function convertToCSV(data: IyieldCalculation[]) {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((obj) => Object.values(obj).join(","));
  return `${headers}\n${rows.join("\n")}`;
}
function downloadCSV(data: IyieldCalculation[]) {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function YieldСalculation() {
  const { id } = useParams();
  const { income } = useContext(Context);
  const myYield = income.yieldPlant.find((el) => el.id == id);
  const myCalc = income.yieldCalc.find((el) => el?.yieldPlantId == id);
  const [open, setOpen] = useState(false);

  const yieldPerRoll =
    (myCalc?.numberSocket! *
      myCalc?.numberFlower! *
      myCalc?.numberFruit! *
      myCalc?.fruitWeight!) /
    1000;
  return (
    <Container maxW="container.lg" mt={"30px"}>
      <Link to={INCOME_ROUTER}>
        <Button>Повернутиця до культур</Button>
      </Link>
      <Heading textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Розрахунок урожайності: "{myYield?.culture.name}"
      </Heading>
      <Table size={"sm"} mt={5}>
        <Thead>
          <Tr>
            <Th>Культура</Th>
            <Th>Коментар</Th>
            <Th>Густота</Th>
            <Th>Урожайність 1га</Th>
            <Th>Урожайність куща</Th>
            {
              //@ts-ignore
              plantsHeads[myYield?.culture.name]?.map((el) => (
                <Th key={el}>{el}</Th>
              ))
            }
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{myYield?.culture.name}</Td>
            <Td>{myYield?.comment}</Td>
            <Td>{myCalc?.numberPlantsPerHectare || 0}</Td>
            <Td>{myYield?.yieldPerHectare || 0}</Td>
            <Td>{myYield?.yieldPerRoll || 0}</Td>
            <Td>{myCalc?.numberSocket || 0}</Td>
            <Td>{myCalc?.numberFlower || 0}</Td>
            <Td>{myCalc?.numberFruit || 0}</Td>
            <Td>{myCalc?.fruitWeight || 0}</Td>
          </Tr>
        </Tbody>
      </Table>

      <Button
        mt={"15px"}
        ml={"30px"}
        onClick={() => {
          setOpen(true);
        }}
      >
        Внести/редагувати дані
      </Button>
      {/* <Button onClick={() => downloadCSV([myCalc!])}>csv</Button> */}
      <CreateYieldCalc
        open={open}
        setOpen={setOpen}
        id={+id!}
        myCalc={myCalc}
      />
    </Container>
  );
}

export default observer(YieldСalculation);
