import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyPlusIcon from "src/ui/Icons/MyPlusIcon";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
import { Iworker } from "../../../../tRPC serv/models/models";
import { deleteWorker } from "../../http/requests";
import { Context } from "../../main";

import { CreateWorkerProp } from "../CreateWorker/CreateWorker";
export function StaffingTableHeadRow({ isPlan }: { isPlan?: boolean }) {
  const { user } = useContext(Context);
  return (
    <Tr>
      {!isPlan && <Th></Th>}
      <Th>Рік</Th>
      <Th>Посада</Th>
      <Th>Кількість</Th>
      <Th>Місячний оклад</Th>

      <Th>Початок сезону</Th>
      <Th>Кінець сезону</Th>
      <Th>Річний фонд ОП</Th>
      <Th>ЄСВ 22%</Th>
      <Th>Військовий збір 1,5%</Th>
      <Th>Загальний фонд ОП</Th>
      {user.role != "" && <Th>Вид найму</Th>}
      {user.role != "" && !isPlan && <Th>Налаштування</Th>}
      {!isPlan && user.role != "" && <Th></Th>}
    </Tr>
  );
}
function StaffingTableRow({
  name,
  el,
  setRes,
  setOpen,
  setUpdate,
  isPlan,
  i,
  dateStart,
}: {
  name: string;
  el: Iworker;
  setRes?: Dispatch<SetStateAction<CreateWorkerProp>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isPlan?: boolean;
  i?: number;
  dateStart?: string | null;
}) {
  const { enterpriseStore, user } = useContext(Context);
  const yearSalary =
    el.salary *
    (+el.dateTo?.split("-")[1] - +el.dateFrom?.split("-")[1] + 1 || 12) *
    el.amount;
  return (
    <Tr>
      {!isPlan && (
        <Td
          onClick={() => {
            if (setRes)
              setRes({
                amount: el.amount,
                class: el.class,
                enterpriseId: el.enterpriseId!,
                isConst: el.isConst,
                jobId: el.jobId!,
                salary: el.salary,
                form: el.form,
                dateFrom: el.dateFrom,
                dateTo: el.dateTo,
                workerId: el.id!,
                businessPlanId: el.businessPlanId!,
                year: el.year,
              });
            if (setUpdate) setUpdate(true);
            if (setOpen) setOpen(true);
          }}
        >
          <MyEditIcon />
        </Td>
      )}
      <Td>{i}</Td>
      <Td>{name}</Td>
      <Td>{el.amount}</Td>
      <Td>{el.salary}</Td>

      <Td>
        {dateStart
          ? dateStart.split("-")[1] + "." + dateStart.split("-")[2]
          : (el.dateFrom?.split("-")[1] || "01") +
            "." +
            (el.dateFrom?.split("-")[2] || "01")}
      </Td>
      <Td>
        {(el.dateTo?.split("-")[1] || "12") +
          "." +
          (el.dateTo?.split("-")[2] || "31")}
      </Td>
      <Td>{yearSalary}</Td>
      <Td>{yearSalary * 0.22}</Td>
      <Td>{yearSalary * 0.015}</Td>
      <Td>{yearSalary + yearSalary * 0.22 + yearSalary * 0.015}</Td>
      {user.role != "" && <Td>{el.isConst ? "Постійний" : "Сезонний"}</Td>}
      {user.role != "" && !isPlan && (
        <Td>
          <Button size="sm">Додати</Button>
        </Td>
      )}
      {!isPlan && user.role != "" && (
        <Td onClick={() => deleteWorker(enterpriseStore, { workerId: el.id! })}>
          <MyDeleteIcon />
        </Td>
      )}
    </Tr>
  );
}
export function StaffingTableBodyRows({
  thisWorkers,
  setOpen,
  setRes,
  setUpdate,
  isPlan,
  i,
  dateStart,
}: {
  thisWorkers: Iworker[] | undefined;
  setRes?: Dispatch<SetStateAction<CreateWorkerProp>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isPlan?: boolean;
  i?: number;
  dateStart?: string | null;
}) {
  const { enterpriseStore, user } = useContext(Context);
  return (
    <>
      <Tr>
        {/* <Td></Td> */}
        {/* <Td></Td> */}
        <Td colSpan={user.role == "" ? 11 : 14}>Адмінісаративний персонал</Td>
      </Tr>
      {thisWorkers?.map((el) => {
        const job = enterpriseStore.job?.find((e) => e.id == el.jobId);
        if (el.class == "Адміністративний")
          return (
            <StaffingTableRow
              key={el.id}
              name={job?.name!}
              el={el}
              setRes={setRes}
              setOpen={setOpen}
              setUpdate={setUpdate}
              isPlan={isPlan}
              i={i}
              dateStart={dateStart}
            />
          );
      })}
      <Tr>
        {/* <Td></Td>
        <Td></Td> */}
        <Td colSpan={user.role == "" ? 11 : 14}>Інженерно технічний</Td>
      </Tr>
      {thisWorkers?.map((el) => {
        const job = enterpriseStore.job.find((e) => e.id == el.jobId);
        if (el.class == "Інженерно технічний")
          return (
            <StaffingTableRow
              key={el.id}
              name={job?.name!}
              el={el}
              setRes={setRes}
              setOpen={setOpen}
              setUpdate={setUpdate}
              isPlan={isPlan}
              i={i}
              dateStart={dateStart}
            />
          );
      })}
      <Tr>
        {/* <Td></Td>
        <Td></Td> */}
        <Td colSpan={user.role == "" ? 11 : 14}>Виробничий персонал</Td>
      </Tr>
      {thisWorkers?.map((el) => {
        const job = enterpriseStore.job?.find((e) => e.id == el.jobId);
        if (el.class == "Виробничий")
          return (
            <StaffingTableRow
              key={el.id}
              name={job?.name!}
              el={el}
              setRes={setRes}
              setOpen={setOpen}
              setUpdate={setUpdate}
              isPlan={isPlan}
              i={i}
              dateStart={dateStart}
            />
          );
      })}
    </>
  );
}
export function StaffingTableBody({
  setOpen,
  setRes,
  setUpdate,
  thisWorkers,
  i,
  start,
  myBusiness,
}: {
  thisWorkers: Iworker[] | undefined;
  setRes: Dispatch<SetStateAction<CreateWorkerProp>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  i: number;
  start: number;
  myBusiness: resBusinessPlan | undefined;
}) {
  const { user } = useContext(Context);

  return (
    <Tbody>
      <StaffingTableBodyRows
        thisWorkers={thisWorkers}
        dateStart={i - start == 0 ? myBusiness?.dateStart : null}
        setRes={setRes}
        setOpen={setOpen}
        setUpdate={setUpdate}
        i={i}
      />
      <Tr fontWeight={"bold"}>
        <Td>
          {user.role == "" ? null : (
            <MyPlusIcon
              onClick={() => {
                setOpen(true);
                setRes((prev) => ({
                  amount: "",
                  class: "",
                  enterpriseId: myBusiness?.enterpriseId!,
                  businessPlanId: myBusiness?.id!,
                  year: i - start,
                  isConst: true,
                  form: prev.form,
                  jobId: "",
                  salary: "",
                  dateFrom: null,
                  dateTo: null,
                }));
              }}
            />
          )}
        </Td>
        <Td>{i}</Td>
        <Td>Разом</Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td>
          {thisWorkers?.reduce(
            (p, c) =>
              p +
              c.salary *
                (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                  12) *
                c.amount,
            0
          )}
        </Td>
        <Td>
          {thisWorkers?.reduce(
            (p, c) =>
              p +
              c.salary *
                0.22 *
                (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                  12) *
                c.amount,
            0
          )}
        </Td>
        <Td>
          {thisWorkers?.reduce(
            (p, c) =>
              p +
              c.salary *
                0.015 *
                (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                  12) *
                c.amount,
            0
          )}
        </Td>
        <Td>
          {thisWorkers?.reduce(
            (p, c) =>
              p +
              (c.salary * 0.015 + c.salary * 0.22 + c.salary) *
                (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                  12) *
                c.amount,
            0
          )}
        </Td>
        {user.role != "" && <Td></Td>}
        {user.role != "" && <Td></Td>}
        {user.role != "" && <Td></Td>}
      </Tr>
    </Tbody>
  );
}
// function StaffingTable({
//   thisWorkers,
//   setRes,
//   setOpen,
//   setUpdate,
// }: {
//   thisWorkers: Iworker[];
//   setRes: Dispatch<SetStateAction<CreateWorkerProp>>;
//   setUpdate: Dispatch<SetStateAction<boolean>>;
//   setOpen: Dispatch<SetStateAction<boolean>>;
// }) {
//   return (
//     <Table size={"sm"}>
//       <Thead>
//         <StaffingTableHeadRow />
//       </Thead>
//       <StaffingTableBody
//         setOpen={setOpen}
//         setRes={setRes}
//         setUpdate={setUpdate}
//         thisWorkers={thisWorkers}
//       />
//     </Table>
//   );
// }

// export default observer(StaffingTable);
