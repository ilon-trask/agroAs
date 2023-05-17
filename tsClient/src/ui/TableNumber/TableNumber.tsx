import { Text } from "@chakra-ui/react";
import React from "react";

function TableNumber({ children }: { children?: string }) {
  return (
    <Text textAlign={"right"} fontSize={"12px"} textTransform={"none"}>
      Таблиця №{children ?? "__"}
    </Text>
  );
}

export default TableNumber;
