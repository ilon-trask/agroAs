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
  return (
    <Tr>
      {!isPlan && <Th></Th>}
      <Th>Рік</Th>
      <Th>Посада</Th>
      <Th>Кількість</Th>
      <Th>Місячний оклад</Th>
      {isPlan && <Th>Дата початку</Th>}
      <Th>Початок сезону</Th>
      <Th>Кінець сезону</Th>
      <Th>Річний фонд ОП</Th>
      <Th>ЄСВ 22%</Th>
      <Th>Військовий збір 1,5%</Th>
      <Th>Загальний фонд ОП</Th>
      <Th>Вид найму</Th>
      <Th>Налаштування</Th>
      {!isPlan && <Th></Th>}
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
}: {
  name: string;
  el: Iworker;
  setRes?: Dispatch<SetStateAction<CreateWorkerProp>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isPlan?: boolean;
  i?: number;
}) {
  const { enterpriseStore } = useContext(Context);
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
      {isPlan && <Td></Td>}
      <Td>
        {(el.dateFrom?.split("-")[1] || "") +
          "." +
          (el.dateFrom?.split("-")[2] || "")}
      </Td>
      <Td>
        {(el.dateTo?.split("-")[1] || "") +
          "." +
          (el.dateTo?.split("-")[2] || "")}
      </Td>
      <Td>{yearSalary}</Td>
      <Td>{yearSalary * 0.22}</Td>
      <Td>{yearSalary * 0.015}</Td>
      <Td>{yearSalary + yearSalary * 0.22 + yearSalary * 0.015}</Td>
      <Td>{el.isConst ? "Постійний" : "Сезонний"}</Td>
      <Td>
        <Button size="sm">Додати</Button>
      </Td>
      {!isPlan && (
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
}: {
  thisWorkers: Iworker[];
  setRes?: Dispatch<SetStateAction<CreateWorkerProp>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isPlan?: boolean;
  i?: number;
}) {
  const { enterpriseStore } = useContext(Context);
  return (
    <>
      <Tr>
        <Td></Td>
        <Td></Td>
        <Td colSpan={7}>Адмінісаративний персонал</Td>
      </Tr>
      {thisWorkers?.map((el) => {
        const job = enterpriseStore.job.find((e) => e.id == el.jobId);
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
            />
          );
      })}
      <Tr>
        <Td></Td>
        <Td></Td>
        <Td colSpan={7}>Інженерно технічний</Td>
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
            />
          );
      })}
      <Tr>
        <Td></Td>
        <Td></Td>
        <Td colSpan={7}>Виробничий персонал</Td>
      </Tr>
      {thisWorkers?.map((el) => {
        const job = enterpriseStore.job.find((e) => e.id == el.jobId);
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
  thisWorkers: Iworker[];
  setRes: Dispatch<SetStateAction<CreateWorkerProp>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  i: number;
  start: number;
  myBusiness: resBusinessPlan;
}) {
  return (
    <Tbody>
      <StaffingTableBodyRows
        thisWorkers={thisWorkers}
        setRes={setRes}
        setOpen={setOpen}
        setUpdate={setUpdate}
        i={i}
      />
      <Tr fontWeight={"bold"}>
        <Td>
          <MyPlusIcon
            onClick={() => {
              setOpen(true);
              setRes((prev) => ({
                amount: "",
                class: "",
                enterpriseId: myBusiness.enterpriseId!,
                businessPlanId: myBusiness.id!,
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
        </Td>
        <Td>{i}</Td>
        <Td>Разом</Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td>
          {thisWorkers.reduce(
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
          {thisWorkers.reduce(
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
          {thisWorkers.reduce(
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
          {thisWorkers.reduce(
            (p, c) =>
              p +
              (c.salary * 0.015 + c.salary * 0.22 + c.salary) *
                (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                  12) *
                c.amount,
            0
          )}
        </Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
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
