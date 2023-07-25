import { Button, Container, Heading, Table, Td, Tr } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBusinessPlans, getWorker } from "../http/requests";
import { Context } from "../main";
import CreateWorker from "../modules/CreateWorker";
import { CreateWorkerProp } from "../modules/CreateWorker/CreateWorker";
import { BUSINESSpLAN_ROUTER } from "../utils/consts";
import { EnterpriseFormType } from "../shared/hook/useEnterpriseForm";
import getStartAndEndBusinessPlan from "src/shared/hook/getStartAndEndBusinessPlan";
import {
  StaffingTableBody,
  StaffingTableHeadRow,
} from "src/modules/StaffingTable/StaffingTable";

function EnterpriseFormPage() {
  const { form, busId } = useParams();
  const { enterpriseStore, business, map } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const myBusiness =
    business.businessPlan.find((el) => el.id == +busId!) ||
    business.publicBusinessPlan.find((el) => el.id == +busId!);
  //@ts-ignore
  const { start, end } = getStartAndEndBusinessPlan(myBusiness);
  const [res, setRes] = useState<CreateWorkerProp>({
    amount: "",
    class: "",
    enterpriseId: myBusiness?.enterpriseId!,
    isConst: true,
    businessPlanId: myBusiness?.id!,
    year: 0,
    form: form as EnterpriseFormType,
    jobId: "",
    salary: "",
    dateFrom: null,
    dateTo: null,
  });

  useEffect(() => {
    getBusinessPlans(map, business);
    getWorker(enterpriseStore);
  }, []);
  const navigate = useNavigate();
  return (
    <Container maxW={"container.lg"}>
      <Button
        onClick={() => navigate(BUSINESSpLAN_ROUTER + "/" + myBusiness?.id)}
      >
        Назад
      </Button>
      <Heading textAlign={"center"} size={"md"} mt={3}>
        Штатний роспис <br /> для ОПФ - {form}
        <br />
        розрахунок на рік
      </Heading>
      <Table size="sm">
        <StaffingTableHeadRow />
        {(() => {
          const res = [];
          for (let i = start; i <= end; i++) {
            const thisWorkers = myBusiness?.workers.filter(
              (el) => el.year == i - start && el.form == form
            );
            res.push(
              <StaffingTableBody
                key={i}
                thisWorkers={thisWorkers}
                setOpen={setOpen}
                setRes={setRes}
                setUpdate={setUpdate}
                i={i}
                start={start}
                myBusiness={myBusiness}
              />
            );
          }
          res.push(
            <Tr key={end + 1} fontWeight={"extrabold"}>
              <Td></Td>
              <Td></Td>
              <Td>ВСЕ РАЗОМ:</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>
                {myBusiness?.workers.reduce(
                  (p, c) =>
                    p +
                    c.salary *
                      (+c.dateTo?.split("-")[1] -
                        +c.dateFrom?.split("-")[1] +
                        1 || 12) *
                      c.amount,
                  0
                )}
              </Td>
              <Td>
                {myBusiness?.workers.reduce(
                  (p, c) =>
                    p +
                    c.salary *
                      0.22 *
                      (+c.dateTo?.split("-")[1] -
                        +c.dateFrom?.split("-")[1] +
                        1 || 12) *
                      c.amount,
                  0
                )}
              </Td>
              <Td>
                {myBusiness?.workers.reduce(
                  (p, c) =>
                    p +
                    c.salary *
                      0.015 *
                      (+c.dateTo?.split("-")[1] -
                        +c.dateFrom?.split("-")[1] +
                        1 || 12) *
                      c.amount,
                  0
                )}
              </Td>
              <Td>
                {myBusiness?.workers.reduce(
                  (p, c) =>
                    p +
                    (c.salary * 0.015 + c.salary * 0.22 + c.salary) *
                      (+c.dateTo?.split("-")[1] -
                        +c.dateFrom?.split("-")[1] +
                        1 || 12) *
                      c.amount,
                  0
                )}
              </Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          );
          return res;
        })()}
      </Table>
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
