import {
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Context } from "src/main";
import getYearFromString from "src/shared/funcs/getYearFromString";
import Description from "src/ui/Description";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
import { Ifinancing } from "../../../../tRPC serv/models/models";

function FinancingBusinessPlan({
  start,
  end,
  thisCredit,
  thisDerj,
  thisGrand,
  thisInvestment,
}: {
  start: number;
  end: number;
  thisCredit: Ifinancing[] | undefined;
  thisInvestment: Ifinancing[] | undefined;
  thisDerj: Ifinancing[] | undefined;
  thisGrand: Ifinancing[] | undefined;
}) {
  return (
    <>
      <SectionTitle>Фінансування</SectionTitle>
      <Heading textAlign={"center"} size={"sm"} mt={5}>
        План залучення коштів
      </Heading>

      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>Назва</Th>
            <Th>Дата</Th>
            <Th>Інвестиції</Th>
            <Th>Кредит</Th>
            <Th>Державна підтримка</Th>
            <Th>Грант</Th>
            <Th>Разом</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i < end; i++) {
              res.push(
                (() => {
                  return (
                    <>
                      {(() => {
                        const res = [];
                        res.push(
                          thisCredit
                            ?.filter((el) => getYearFromString(el.date) == i)
                            .map((el) => (
                              <Tr key={el.id}>
                                <Td>
                                  <Text>{el.name}</Text>
                                </Td>
                                <Td>
                                  <Text>{el.date}</Text>
                                </Td>
                                <Td></Td>
                                <Td>{el.cost}</Td>
                              </Tr>
                            ))
                        );

                        res.push(
                          thisInvestment
                            ?.filter((el) => getYearFromString(el.date) == i)
                            .map((el) => (
                              <Tr key={el.id}>
                                <Td>
                                  <Text>{el.name}</Text>
                                </Td>
                                <Td>
                                  <Text>{el.date}</Text>
                                </Td>
                                <Td>{el.cost}</Td>
                              </Tr>
                            ))
                        );
                        res.push(
                          thisDerj
                            ?.filter((el) => getYearFromString(el.date) == i)
                            .map((el) => (
                              <Tr key={el.id}>
                                <Td>
                                  <Text>{el.name}</Text>
                                </Td>
                                <Td>
                                  <Text>{el.date}</Text>
                                </Td>
                                <Td></Td>
                                <Td></Td>
                                <Td>{el.cost}</Td>
                              </Tr>
                            ))
                        );
                        res.push(
                          thisGrand
                            ?.filter((el) => getYearFromString(el.date) == i)
                            .map((el) => (
                              <Tr key={el.id}>
                                <Td>
                                  <Text>{el.name}</Text>
                                </Td>
                                <Td>
                                  <Text>{el.date}</Text>
                                </Td>
                                <Td></Td>
                                <Td></Td>
                                <Td></Td>
                                <Td>{el.cost}</Td>
                              </Tr>
                            ))
                        );
                        return res;
                      })()}
                      {(() => {
                        const sumInv = thisInvestment
                          ?.filter((el) => getYearFromString(el.date) == i)
                          .reduce((p, c) => p + c.cost, 0);
                        const sumCred = thisCredit
                          ?.filter((el) => getYearFromString(el.date) == i)
                          .reduce((p, c) => p + c.cost, 0);
                        const sumDerj = thisDerj
                          ?.filter((el) => getYearFromString(el.date) == i)
                          .reduce((p, c) => p + c.cost, 0);
                        const sumGrand = thisGrand
                          ?.filter((el) => getYearFromString(el.date) == i)
                          .reduce((p, c) => p + c.cost, 0);
                        return (
                          <Tr fontWeight={"bold"}>
                            <Td>{i}</Td>
                            <Td></Td>
                            <Td>{sumInv}</Td>
                            <Td> {sumCred} </Td>
                            <Td>{sumDerj}</Td>
                            <Td>{sumGrand}</Td>
                            <Td>
                              {(sumInv || 0) +
                                (sumCred || 0) +
                                (sumDerj || 0) +
                                (sumGrand || 0)}
                            </Td>
                          </Tr>
                        );
                      })()}
                    </>
                  );
                })()
              );
            }
            return res;
          })()}
        </Tbody>
      </Table>

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
