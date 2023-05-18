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
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState<CreateWorkerProp>({
    amount: "",
    class: "",
    enterpriseId: +id!,
    isConst: false,
    jobId: "",
    salary: "",
  });
  const thisWorkers = enterpriseStore.worker.filter(
    (el) => el.enterpriseId == id
  );
  useEffect(() => {
    getWorker(enterpriseStore);
  }, []);
  // thisWorkers.sort
  return (
    <Container maxW={"container.lg"}>
      <Box mx={"auto"}>
        <Heading size={"md"} textAlign={"center"} mt={5}>
          Загальні данні
          <br /> підприємства: {myEnterprise?.name}
        </Heading>
      </Box>
      <Heading textAlign={"center"} size={"md"} mt={3}>
        Штатний роспис
      </Heading>
      <StaffingTable thisWorkers={thisWorkers} />
      <Button onClick={() => setOpen(true)}>Додати працівника</Button>
      <CreateWorker
        open={open}
        setOpen={setOpen}
        update={update}
        setUpdate={setUpdate}
        res={res}
        setRes={setRes}
      />
    </Container>
  );
}

export default observer(Enterprise);
