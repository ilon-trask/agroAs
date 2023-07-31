import React from "react";
import { Heading, HeadingProps } from "@chakra-ui/react";

function BusHeading(props: HeadingProps) {
  return (
    <Heading textAlign={"left"} fontSize={"20"} {...props}>
      {props.children}
    </Heading>
  );
}

export default BusHeading;
