import { Text } from "@chakra-ui/react";
import React from "react";

function Paragraph({ children }: { children: string }) {
  return (
    <Text
      fontSize={"20px"}
      textAlign={"left"}
      fontWeight={"bold"}
      textTransform={"none"}
    >
      {children}
    </Text>
  );
}

export default Paragraph;
