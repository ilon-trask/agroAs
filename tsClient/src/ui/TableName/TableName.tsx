import { Text } from "@chakra-ui/react";
import React from "react";

function TableName({ children }: { children: string }) {
  return (
    <Text fontSize={"16px"} textTransform={"none"} textAlign={"center"}>
      {children}
    </Text>
  );
}

export default TableName;
