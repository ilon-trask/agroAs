import { Heading } from "@chakra-ui/react";
import React from "react";

function SectionTitle({
  children,
  mt,
}: {
  children: string;
  mt?: string | number;
}) {
  return (
    <Heading
      fontSize={"24px"}
      textAlign={"left"}
      textTransform={"none"}
      mt={mt}
      ml={30}
    >
      {children}
    </Heading>
  );
}

export default SectionTitle;