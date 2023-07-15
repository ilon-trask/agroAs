import { TableContainer, TableContainerProps } from "@chakra-ui/react";
import React from "react";
interface props extends TableContainerProps {
  children: any;
}
function MyTableContainer(props: props) {
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
