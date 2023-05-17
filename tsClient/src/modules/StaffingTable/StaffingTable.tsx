import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Iworker } from "../../../../tRPC serv/models/models";
import { Context } from "../../main";
export function StaffingTableHeadRow() {
  return (
    <Tr>
      <Th>Посада</Th>
      <Th>Кількість</Th>
      <Th>Місячний оклад</Th>
      <Th>Дата прийняття</Th>
      <Th>Вид найму</Th>
      <Th>Сума&nbsp;за&nbsp;рік</Th>
    </Tr>
  );
}
export function StaffingTableBodyRows({
  thisWorkers,
}: {
  thisWorkers: Iworker[];
}) {
  const { enterpriseStore } = useContext(Context);
  return (
    <>
      <Tr>
        <Td colSpan={6}>Адмінісаративний персонал</Td>
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
        <Td colSpan={6}>Виробничий персонал</Td>
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
    </>
  );
}
function StaffingTable({ thisWorkers }: { thisWorkers: Iworker[] }) {
  return (
    <Table size={"sm"}>
      <Thead>
        <StaffingTableHeadRow />
      </Thead>
      <Tbody>
        <StaffingTableBodyRows thisWorkers={thisWorkers} />
      </Tbody>
    </Table>
  );
}

export default StaffingTable;
