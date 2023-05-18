import { Text } from "@chakra-ui/react";
import React from "react";

function Paragraph({ children }: { children: string }) {
  return (
    <Text
      fontSize={"20px"}
      textAlign={"left"}
      fontWeight={"bold"}
      textTransform={"none"}
      ml={"20px"}
    >
      {children}
    </Text>
  );
}

export default Paragraph;
