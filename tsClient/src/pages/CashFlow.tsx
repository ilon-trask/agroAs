import { Box, Button, Container, TableContainer, Text } from "@chakra-ui/react";
import React from "react";
import CashFlowTable from "../modules/CashFlowTable";

function CashFlow() {
  return (
    <Box>
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування графіку доходів та витрат
      </Text>

      <Box display={"flex"} justifyContent={"space-evenly"}>
        <Button>Додати прихід</Button>
        <Button>Додати розхід</Button>
      </Box>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        <CashFlowTable />
      </TableContainer>
    </Box>
  );
}

export default CashFlow;
