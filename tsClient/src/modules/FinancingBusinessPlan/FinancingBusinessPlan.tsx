import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Context } from "src/main";
import Description from "src/ui/Description";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";

function FinancingBusinessPlan({ start, end }: { start: number; end: number }) {
  const { income } = useContext(Context);
  return (
    <>
      <SectionTitle>Фінансування</SectionTitle>
      <Heading textAlign={"center"} size={"sm"} mt={5}>
        План залучення коштів
      </Heading>
      {(() => {
        const res = [];
        for (let i = start; i < end; i++) {
          res.push(
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th>Назва</Th>
                  <Th>Дата</Th>
                  <Th>Сума</Th>
                  <Th>Призначення</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(() => {
                  const res = income.credit.map((e) => {
                    if (e.isUseCost && +e.date.split("-")[0] == i)
                      return (
                        <Tr>
                          <Td>{e.name}</Td>
                          <Td>{e.date}</Td>
                          <Td>{e.cost}</Td>
                          <Td>{e.purpose}</Td>
                        </Tr>
                      );
                  });
                  if (res)
                    return (
                      <>
                        <Tr>
                          <Td fontWeight={"bold"}>Кредит</Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </Tr>
                        {res}
                      </>
                    );
                })()}
              </Tbody>
            </Table>
          );
        }
        return res;
      })()}
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <TableName>План інвестування коштів</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Показники</Th>
            <Th>1 кв.</Th>
            <Th>2 кв.</Th>
            <Th>3 кв.</Th>
            <Th>4 кв.</Th>
            <Th>За рік</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i < end; i++) {
              res.push(
                <>
                  <Tr fontWeight={"bold"}>
                    <Td>{i}</Td>
                  </Tr>
                  <Tr fontWeight={"bold"}>
                    <Td>Прям інвестицій</Td>
                  </Tr>
                  <Tr fontWeight={"bold"}>
                    <Td>Всього прямих інвестицій</Td>
                  </Tr>
                  <Tr fontWeight={"bold"}>
                    <Td>Всього інвестицій {i}</Td>
                  </Tr>
                </>
              );
            }
            return res;
          })()}
          <Tr>
            <Td>Вартість проекту</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}

export default FinancingBusinessPlan;
