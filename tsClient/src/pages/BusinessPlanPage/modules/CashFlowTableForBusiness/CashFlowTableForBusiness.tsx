import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import {
  CashFlowTableHead,
  CashFlowTableHeadBegin,
} from "src/modules/CashFlowTable/CashFlowTable";
import useIncomeTypes from "src/shared/hook/useIncomeTypes";
import useOutcomeGroup from "src/shared/hook/useOutcomeGroup";
import Description from "src/ui/Description";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";

function CashFlowTableForBusiness({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan;
  start: number;
  end: number;
}) {
  return (
    <Table size={"sm"}>
      <Thead>
        <Tr>
          <Td colSpan={4}>
            <Box color={"red"}>
              <Description>Опис</Description>
            </Box>
          </Td>
        </Tr>
        <Tr>
          <Th colSpan={5}>
            <TableName>Грошовий потік (річний)</TableName>
          </Th>
        </Tr>
        <Tr>
          <Th colSpan={5}>
            <TableNumber />
          </Th>
        </Tr>
      </Thead>
      {(() => {
        const res = [];
        let startSum = 0;
        for (let i = start; i <= end; i++) {
          res.push(
            <CashFlowTableHead
              year={i}
              startSum={+startSum.toFixed(2)}
              key={i + "head"}
            />
          );
          const saleValue = myBusiness.busProds
            .filter((el) => el.year == i - start)
            .reduce((p, c) => {
              const vegetationYear = c.vegetationYear;
              const amount =
                +(
                  c.area *
                  vegetationYear?.potentialYieldPerHectare! *
                  (vegetationYear?.allCoeff || 1)
                ).toFixed(2) || 0;
              return p + +(amount * (c.price || 0)).toFixed(2);
            }, 0);
          const incomeValue =
            myBusiness.financings
              .filter((el) => el.year == i - start)
              .reduce((p, c) => p + c.cost, 0) + saleValue;
          const MSHPValue = myBusiness.MSHP.filter(
            (el) => el.year == i - start
          ).reduce((p, c) => p + c.price * c.amount, 0);
          const machineValue = myBusiness.buying_machines
            .filter((el) => el.year == i - start)
            .reduce((p, c) => p + c.price * c.amount, 0);
          const buildingValue = myBusiness.buildings
            .filter((el) => el.year == i - start)
            .reduce((p, c) => p + +c.startPrice, 0);
          const directValue = myBusiness.busProds
            .filter((el) => el.year == i - start)
            .reduce((p, c) => p + (c.tech_cart?.costHectare || 0) * c.area, 0);
          let outcome = MSHPValue + machineValue + buildingValue + directValue;
          res.push(
            <Tbody key={i + "body"}>
              {useIncomeTypes.map((el) => {
                const value = myBusiness.financings
                  .filter((e) => e.year == i - start && e.typeName == el.name)
                  .reduce((p, c) => p + c.cost, 0);

                return value ? (
                  <Tr key={el.id}>
                    <Td>{i}</Td>
                    <Td>{el.name}</Td>
                    <Td>{value.toFixed(2)}</Td>
                  </Tr>
                ) : null;
              })}
              <Tr>
                <Td>{i}</Td>
                <Td>{"Реалізація"}</Td>
                <Td>{saleValue.toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>{i}</Td>
                <Td></Td>
                <Td></Td>
                <Td>{"МШП"}</Td>
                <Td>{MSHPValue.toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>{i}</Td>
                <Td></Td>
                <Td></Td>
                <Td>{"Техніка та обладнання"}</Td>
                <Td>{machineValue.toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>{i}</Td>
                <Td></Td>
                <Td></Td>
                <Td>{"Будівлі та споруди"}</Td>
                <Td>{buildingValue.toFixed(2)}</Td>
              </Tr>
              {useOutcomeGroup.map((el) => {
                const value = myBusiness.outcomes
                  .filter((e) => e.year == i - start && e.group == el.name)
                  .reduce((p, c) => p + (c.costYear || 0), 0);
                if (value) outcome += value;
                return value ? (
                  <Tr key={el.id}>
                    <Td>{i}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>{el.name}</Td>
                    <Td>{value.toFixed(2)}</Td>
                  </Tr>
                ) : null;
              })}
              <Tr>
                <Td>{i}</Td>
                <Td></Td>
                <Td></Td>
                <Td>Прямі</Td>
                <Td>{directValue.toFixed(2)}</Td>
              </Tr>
              <Tr fontWeight={"extrabold"}>
                <Td></Td>
                <Td>Оборот:</Td>
                <Td>{incomeValue.toFixed(2)}</Td>
                <Td>Оборот:</Td>
                <Td>{outcome.toFixed(2)}</Td>
              </Tr>
            </Tbody>
          );
          startSum += incomeValue;
          startSum -= outcome;
        }
        res.push(
          <CashFlowTableHeadBegin
            startSum={+startSum.toFixed(2)}
            year={end + 1}
            key={end + 1}
          />
        );
        return res;
      })()}
    </Table>
  );
}

export default CashFlowTableForBusiness;
