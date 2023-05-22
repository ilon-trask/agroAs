import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorker } from "../http/requests";
import { Context } from "../main";
import CreateWorker from "../modules/CreateWorker";
import { CreateWorkerProp } from "../modules/CreateWorker/CreateWorker";
import StaffingTable from "../modules/StaffingTable";
import { EnterpriseFormType } from "./hook/useEnterpriseForm";

function EnterpriseFormPage() {
  const { form, id } = useParams();
  const { enterpriseStore } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState<CreateWorkerProp>({
    amount: "",
    class: "",
    enterpriseId: +id!,
    isConst: false,
    form: form as EnterpriseFormType,
    jobId: "",
    salary: "",
  });
  const thisWorkers = enterpriseStore.worker.filter(
    (el) => el.enterpriseId == id && el.form == form
  );
  const myEnterprise = enterpriseStore.enterprise.find((el) => el.id == +id!);
  useEffect(() => {
    getWorker(enterpriseStore);
  }, []);
  return (
    <Container maxW={"container.lg"}>
      <Heading textAlign={"center"} size={"md"} mt={3}>
        Штатний роспис <br /> для ОПФ - {form}
        <br />
        розрахунок на 1га
      </Heading>
      <StaffingTable
        thisWorkers={thisWorkers}
        setOpen={setOpen}
        setRes={setRes}
        setUpdate={setUpdate}
      />
      <Button onClick={() => setOpen(true)}>Додати працівника</Button>
      <CreateWorker
        open={open}
        setOpen={setOpen}
        update={update}
        setUpdate={setUpdate}
        res={res}
        setRes={setRes}
        form={form as EnterpriseFormType}
      />
    </Container>
  );
}

export default observer(EnterpriseFormPage);
