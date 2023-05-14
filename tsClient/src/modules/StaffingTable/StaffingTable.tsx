import { Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Iworker } from "../../../../tRPC serv/models/models";
import { Context } from "../../main";

function StaffingTable({ thisWorkers }: { thisWorkers: Iworker[] }) {
  const { enterpriseStore } = useContext(Context);
  return (
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
  );
}

export default StaffingTable;
