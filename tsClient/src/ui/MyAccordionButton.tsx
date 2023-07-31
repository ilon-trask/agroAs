import {
  AccordionButton,
  AccordionIcon,
  AccordionButtonProps,
} from "@chakra-ui/react";
import React from "react";

function MyAccordionButton(props: AccordionButtonProps) {
  return (
    <AccordionButton {...props}>
      <AccordionIcon />
      {props.children}
    </AccordionButton>
  );
}

export default MyAccordionButton;
