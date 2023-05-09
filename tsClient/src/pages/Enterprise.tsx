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
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Td>Посада</Td>
            <Td>Кількість</Td>
            <Td>Місячний оклад</Td>
            <Td>Дата прийняття</Td>
            <Td>Вид найму</Td>
            <Td>Сума за рік</Td>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Адмінісаративний персонал</Td>
          </Tr>
          {thisWorkers?.map((el) => {
            const job = enterpriseStore.job.find((e) => e.id == el.jobId);
            if (el.class == "Адміністративний")
              return (
                <Tr key={el.id}>
                  <Td>{job?.name}</Td>
                  <Td>{el.amount}</Td>
                  <Td>{el.salary}</Td>
                  <Td>{el.dateFrom}</Td>
                  <Td>{el.isConst ? "Постійний" : "Сезонний"}</Td>
                  <Td>{el.salary * 12}</Td>
                </Tr>
              );
          })}
          <Tr>
            <Td>Виробничий персонал</Td>
          </Tr>
          {thisWorkers?.map((el) => {
            const job = enterpriseStore.job.find((e) => e.id == el.jobId);
            if (el.class == "Виробничий")
              return (
                <Tr key={el.id}>
                  <Td>{job?.name}</Td>
                  <Td>{el.amount}</Td>
                  <Td>{el.salary}</Td>
                  <Td>{el.dateFrom}</Td>
                  <Td>{el.isConst ? "Постійний" : "Сезонний"}</Td>
                  <Td>{el.salary * 12}</Td>
                </Tr>
              );
          })}
        </Tbody>
      </Table>
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
