import { Text, TextProps } from "@chakra-ui/react";
import React from "react";
interface Props extends TextProps {}
function Description(props: Props) {
  return (
    <Text
      fontSize={"12px"}
      fontWeight={"normal"}
      textTransform={"none"}
      marginTop={"5px"}
      {...props}
    >
      {props.children}
    </Text>
  );
}

export default Description;
