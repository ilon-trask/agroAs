import { Heading } from "@chakra-ui/react";
import React, { RefObject } from "react";

function SectionTitle({
  children,
  mt,
  aref,
}: {
  children: string;
  mt?: string | number;
  aref?: RefObject<HTMLTableElement>;
}) {
  return (
    <Heading
      ref={aref}
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
