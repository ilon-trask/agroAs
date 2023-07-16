import { TableContainer, TableContainerProps } from "@chakra-ui/react";
import React from "react";

function MyTableContainer(props: TableContainerProps) {
  return (
    <TableContainer
      maxW="1000px"
      mx="auto"
      mt={"20px"}
      overflowX={"auto"}
      {...props}
    >
      {props.children}
    </TableContainer>
  );
}

export default MyTableContainer;
