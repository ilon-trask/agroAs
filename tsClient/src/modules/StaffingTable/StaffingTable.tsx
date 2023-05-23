import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { Iworker } from "../../../../tRPC serv/models/models";
import { deleteWorker } from "../../http/requests";
import { Context } from "../../main";
import { EnterpriseFormType } from "../../pages/hook/useEnterpriseForm";
import { EnterpriseTaxGroupType } from "../../pages/hook/useEnterpriseTaxGroup";
import { WorkerClassesType } from "../../pages/hook/useWorkersClasses";
import EnterpriseStore from "../../store/EnterpriseStore";
import { CreateWorkerProp } from "../CreateWorker/CreateWorker";
export function StaffingTableHeadRow({ isPlan }: { isPlan?: boolean }) {
  return (
    <Tr>
      {!isPlan && <Th></Th>}
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
      <Th>Вид витрат</Th>
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
}: {
  name: string;
  el: Iworker;
  setRes?: Dispatch<SetStateAction<CreateWorkerProp>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isPlan?: boolean;
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
              });
            if (setUpdate) setUpdate(true);
            if (setOpen) setOpen(true);
          }}
        >
          <EditIcon
            color={"blue.400"}
            w={"20px"}
            h={"auto"}
            cursor={"pointer"}
          />
        </Td>
      )}
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
      <Td>{yearSalary * 0.15}</Td>
      <Td>{yearSalary + yearSalary * 0.22 + yearSalary * 0.015}</Td>
      <Td>{el.isConst ? "Постійний" : "Сезонний"}</Td>
      <Td>{}</Td>
      {!isPlan && (
        <Td
          onClick={() => {
            deleteWorker(enterpriseStore, { workerId: el.id! });
          }}
        >
          <DeleteIcon w={"20px"} h={"auto"} color={"red"} cursor={"pointer"} />
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
}: {
  thisWorkers: Iworker[];
  setRes?: Dispatch<SetStateAction<CreateWorkerProp>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isPlan?: boolean;
}) {
  const { enterpriseStore } = useContext(Context);
  return (
    <>
      <Tr>
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
            />
          );
      })}
      <Tr>
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
            />
          );
      })}
    </>
  );
}
function StaffingTable({
  thisWorkers,
  setRes,
  setOpen,
  setUpdate,
}: {
  thisWorkers: Iworker[];
  setRes: Dispatch<SetStateAction<CreateWorkerProp>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Table size={"sm"}>
      <Thead>
        <StaffingTableHeadRow />
      </Thead>
      <Tbody>
        <StaffingTableBodyRows
          thisWorkers={thisWorkers}
          setRes={setRes}
          setOpen={setOpen}
          setUpdate={setUpdate}
        />
        <Tr fontWeight={"bold"}>
          <Td></Td>
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
                    12),
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
                    12),
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
                    12),
              0
            )}
          </Td>
          <Td>
            {thisWorkers.reduce(
              (p, c) =>
                p +
                (c.salary * 0.015 + c.salary * 0.22 + c.salary) * //@ts-ignore
                  (c.dateTo?.split("-")[1] - c.dateFrom?.split("-")[1] + 1 ||
                    12),
              0
            )}
          </Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default observer(StaffingTable);
