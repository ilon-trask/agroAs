import {
  Button,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBusinessPlans, getWorker } from "../../http/requests";
import { Context } from "../../main";
import CreateWorker from "../../modules/CreateWorker";
import { CreateWorkerProp } from "../../modules/CreateWorker/CreateWorker";
import { BUSINESSpLAN_ROUTER } from "../../utils/consts";
import { EnterpriseFormType } from "../../shared/hook/useEnterpriseForm";
import getStartAndEndBusinessPlan from "src/shared/funcs/getStartAndEndBusinessPlan";
import {
  StaffingTableBody,
  StaffingTableHeadRow,
} from "src/modules/StaffingTable/StaffingTable";
import MyHeading from "src/ui/MyHeading";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import EnterpriseLeaderDialog from "./modules/EnterpriseLeaderDialog";

function EnterpriseFormPage() {
  const { form, busId } = useParams();
  const { enterpriseStore, business, map } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const myBusiness =
    business.businessPlan.find((el) => el.id == +busId!) ||
    business.publicBusinessPlan.find((el) => el.id == +busId!);

  const { start, end } = getStartAndEndBusinessPlan(myBusiness!);
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
  const [leaderOpen, setLeaderOpen] = useState(false);
  useEffect(() => {
    getBusinessPlans(map, business);
    getWorker(enterpriseStore);
  }, []);
  const navigate = useNavigate();
  return (
    <Container maxW={"container.xl"}>
      <Button
        onClick={() => navigate(BUSINESSpLAN_ROUTER + "/" + myBusiness?.id)}
      >
        Назад
      </Button>
      <MyHeading>Керівник господарства</MyHeading>
      <TableContainer maxW={"500px"} mx={"auto"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>П. І. Б.</Th>
              <Th>Освіта</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <MyEditIcon onClick={() => setLeaderOpen(true)} />
              </Td>
              <Td>{myBusiness?.enterprise?.leader}</Td>
              <Td>{myBusiness?.enterprise?.leaderEducation}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <EnterpriseLeaderDialog
        busId={myBusiness?.id!}
        enterpriseId={myBusiness?.enterpriseId!}
        leader={myBusiness?.enterprise?.leader}
        leaderEducation={myBusiness?.enterprise?.leaderEducation}
        open={leaderOpen}
        setOpen={setLeaderOpen}
      />
      <MyHeading mt={3}>
        Штатний роспис <br /> для ОПФ - {form}
        <br />
        розрахунок на рік
      </MyHeading>
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
