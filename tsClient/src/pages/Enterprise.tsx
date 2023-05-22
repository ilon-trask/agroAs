import {
  Box,
  Button,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorker } from "../http/requests";
import { Context } from "../main";
import CreateWorker from "../modules/CreateWorker";
import { CreateWorkerProp } from "../modules/CreateWorker/CreateWorker";
import StaffingTable from "../modules/StaffingTable";

function Enterprise() {
  const { id } = useParams();
  const { enterpriseStore } = useContext(Context);
  const myEnterprise = enterpriseStore.enterprise.find((el) => el.id == id);

  // thisWorkers.sort
  return (
    <Container maxW={"container.lg"}>
      <Box mx={"auto"}>
        <Heading size={"md"} textAlign={"center"} mt={5}>
          Загальні данні
          <br /> підприємства: {myEnterprise?.name}
        </Heading>
      </Box>
    </Container>
  );
}

export default observer(Enterprise);
