import {
  Box,
  Heading,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { resTechOperation } from "../../../../../tRPC serv/controllers/TechCartService";
import { Context } from "../../../main";

function Second() {
//     {
//   prop,
//   setProp,
// }: {
//   prop: resTechOperation[] | [];
//   setProp: Dispatch<SetStateAction<resTechOperation[]>>;
// }
  return (
    <Box>
      <Heading as={"h4"} size={"md"} textAlign={"center"} mt={3}>
        Змінити Вартість механізованих робіт
      </Heading>
    </Box>
  );
}

export default Second;
