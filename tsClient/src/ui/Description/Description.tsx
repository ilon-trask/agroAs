import { Text } from "@chakra-ui/react";
import React from "react";

function Description({
  children,
  mt,
}: {
  children: any;
  mt?: number | string;
}) {
  return (
    <Text
      fontSize={"12px"}
      fontWeight={"normal"}
      textTransform={"none"}
      mt={mt}
      marginTop={"5px"}
    >
      {children}
    </Text>
  );
}

export default Description;
