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
        Розрахунок урожайності
      </Heading>
      <Table size={"sm"} mt={5}>
        <Thead>
          <Tr>
            <Th>Культура</Th>
            <Th>Коментар</Th>
            <Th>Густота</Th>
            <Th>Урожайність 1га</Th>
            <Th>Урожайність куща</Th>
            <Th>Кількість розеток</Th>
            <Th>Кількість квітконосів</Th>
            <Th>Кількість ягід</Th>
            <Th>Вага ягоди</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{myYield?.culture.name}</Td>
            <Td>{myYield?.comment}</Td>
            <Td>{myCalc?.numberPlantsPerHectare || 0}</Td>
            <Td>
              {(yieldPerRoll * myCalc?.numberPlantsPerHectare!) / 1000 || 0}
            </Td>
            <Td>{yieldPerRoll || 0}</Td>
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
