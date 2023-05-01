import { Box, Button, Container, TableContainer, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import CashFlowTable from "../modules/CashFlowTable";
import { INCOME_ROUTER, MAP_ROUTE } from "../utils/consts";

function CashFlow() {
  const navigate = useNavigate();
  return (
    <Box>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування графіку доходів та витрат
      </Text>

      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <CashFlowTable />
      </TableContainer>
      <Box display={"flex"} justifyContent={"space-evenly"} mt={"15px"}>
        <Button onClick={() => navigate(INCOME_ROUTER)}>
          Назад до доходів
        </Button>
        <Button>Добавити в бізнес-план</Button>
        <Button onClick={() => navigate(MAP_ROUTE)}>Назад до витрат</Button>
      </Box>
    </Box>
  );
}

export default CashFlow;
