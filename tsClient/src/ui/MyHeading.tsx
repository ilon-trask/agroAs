import { Heading, HeadingProps } from "@chakra-ui/react";
import React from "react";

function MyHeading(props: HeadingProps) {
  return (
    <Heading mt={3} textAlign={"center"} fontSize={"25"} {...props}>
      {props.children}
    </Heading>
  );
}

export default MyHeading;
