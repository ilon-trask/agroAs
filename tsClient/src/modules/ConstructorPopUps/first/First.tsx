import { Box, Heading, Table, Td, Text, Th } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { resTechCartsWithOpers } from "../../../../../tRPC serv/controllers/TechCartService";
import MapInputs from "../../CreateCart/MapInputs";
import { Context } from "../../../main";
import { cartProps } from "../../CreateCart";
import GeneralDataTable from "../../GeneralDataTable";

function First({
  res,
  setRes,
}: {
  res: resTechCartsWithOpers;
  setRes: Dispatch<SetStateAction<cartProps>>;
}) {
  return (
    <Box h={"300px"}>
      <Heading as={"h4"} size={"md"} textAlign={"center"}>
        Змінити загальні данні
      </Heading>
      <MapInputs
        //@ts-ignore
        res={res}
        setRes={setRes as any}
        setIsErr={() => {}}
        setOpen={() => {}}
        update={true}
        noBtn={true}
      />
    </Box>
  );
}

export default observer(First);
