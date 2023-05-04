import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { resTechCartsWithOpers } from "../../../../tRPC serv/controllers/TechCartService";
import { Context } from "../../main";
import useIncomeTypes from "../../pages/hook/useIncomeTypes";
import useOutcomeTypes from "../../pages/hook/useOutcomeTypes";
import Button from "../../ui/Button/Button";

function PopOver({
  children,
  arr,
}: {
  children: JSX.Element;
  arr: { id: number; name: string }[];
}) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            {arr.map((el) => (
              <Checkbox as={"div"} size={"sm"} key={el.id}>
                {el.name}
              </Checkbox>
            ))}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
const incomeTypes = useIncomeTypes;
const outcomeTypes = useOutcomeTypes;
function CashFlowTable({ year }: { year: number }) {
  const { map, income } = useContext(Context);
  console.log(year);

  const outcomes = map.outcome.filter((el) => el.isUsing! == true);
  const incomes = income.income.filter((el) => el.isUsing! == true);
  const first = { income: 0, outcome: 0, type: "" };
  const second = { income: 0, outcome: 0, type: "" };
  const third = { income: 0, outcome: 0, type: "" };
  const fourth = { income: 0, outcome: 0, type: "" };
  const fifth = { income: 0, outcome: 0, type: "" };
  const sixth = { income: 0, outcome: 0, type: "" };
  const seventh = { income: 0, outcome: 0, type: "" };
  const eight = { income: 0, outcome: 0, type: "" };
  const ninth = { income: 0, outcome: 0, type: "" };
  const tenth = { income: 0, outcome: 0, type: "" };
  const eleventh = { income: 0, outcome: 0, type: "" };
  const twelfth = { income: 0, outcome: 0, type: "" };
  const obj = {
    1: first,
    2: second,
    3: third,
    4: fourth,
    5: fifth,
    6: sixth,
    7: seventh,
    8: eight,
    9: ninth,
    10: tenth,
    11: eleventh,
    12: twelfth,
  };
  let yearIncome: number = 0;
  let fkIncome: number = 0;
  let skIncome: number = 0;
  let tkIncome: number = 0;
  let fourthkIncome: number = 0;
  let yearOutcome: number = 0;
  let fkOutcome: number = 0;
  let skOutcome: number = 0;
  let tkOutcome: number = 0;
  let fourthkOutcome: number = 0;
  incomes.forEach((el) => {
    const sale = income.sale.find(
      (e) => e.id == el.saleId && +e.date.split("-")[0] == year
    );
    const credit = income.credit.find(
      (e) => e.id == el.creditId && +e.date.split("-")[0] == year
    );
    const derj = income.derj.find(
      (e) => e.id == el.derjSupportId && +e.date.split("-")[0] == year
    );
    const investment = income.investment.find(
      (e) => e.id == el.investmentId && +e.date.split("-")[0] == year
    );
    const grant = income.grant.find(
      (e) => e.id == el.grantId && +e.date.split("-")[0] == year
    );
    const prop = credit || derj || investment || grant;
    //@ts-ignore
    const month = +prop?.date?.split("-")[1] || +sale?.date?.split("-")[1];
    if (month) {
      //@ts-ignore
      obj[month].income += prop?.cost || sale?.price * sale?.amount;
      yearIncome += prop?.cost || sale?.price! * sale?.amount!;
      if (month >= 1 && month <= 3) {
        fkIncome += prop?.cost || sale?.price! * sale?.amount!;
      } else if (month >= 3 && month <= 5) {
        skIncome += prop?.cost || sale?.price! * sale?.amount!;
      } else if (month >= 6 && month < 9) {
        tkIncome += prop?.cost || sale?.price! * sale?.amount!;
      } else if (month >= 9 && month < 12) {
        fourthkIncome += prop?.cost || sale?.price! * sale?.amount!;
      }
    }
  });
  outcomes.forEach((el) => {
    // const cart = map.maps.find((e) => e.id == el.techCartId);
    const buying = map.buyingMachine.find(
      (e) => e.id == el.buyingMachineId && +e.date.split("-")[0] == year
    );
    const prop = buying;
    const month = +prop?.date?.split("-")[1];
    if (month) {
      //@ts-ignore
      obj[month].outcome += prop?.cost * prop?.amount;
      yearOutcome += prop?.cost! * prop?.amount!;
      if (month >= 1 && month <= 3) {
        fkOutcome += prop?.cost! * prop?.amount!;
      } else if (month >= 3 && month <= 5) {
        skOutcome += prop?.cost! * prop?.amount!;
      } else if (month >= 6 && month < 9) {
        tkOutcome += prop?.cost! * prop?.amount!;
      } else if (month >= 9 && month < 12) {
        fourthkOutcome += prop?.cost! * prop?.amount!;
      }
    }
  });
  return (
    <Table size={"sm"}>
      <Thead>
        <Tr>
          <Th></Th>
          <Th></Th>
          <Th>10000</Th>
          <Th colSpan={3}>Залишок на початок періоду 2222</Th>
          <Th></Th>
        </Tr>
        <Tr>
          <Th>Період</Th>
          <Th>Назва доходу</Th>
          <Th>Прихід</Th>
          <Th cursor={"pointer"}>
            <PopOver arr={incomeTypes}>
              <Box>
                Тип доходу <TriangleDownIcon color={"blue.400"} />
              </Box>
            </PopOver>
          </Th>
          <Th>Розхід</Th>
          <Th cursor={"pointer"}>
            <PopOver arr={outcomeTypes}>
              <Box>
                Тип витрат <TriangleDownIcon color={"blue.400"} />
              </Box>
            </PopOver>
          </Th>
          <Th>Назва витрат</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>1</Td>
          <Td></Td>
          <Td>{first.income}</Td>
          <Td>{first.type}</Td>
          <Td>{first.outcome}</Td>
        </Tr>
        <Tr>
          <Td>2</Td>
          <Td></Td>
          <Td>{second.income}</Td>
          <Td>{second.type}</Td>
          <Td>{second.outcome}</Td>
        </Tr>
        <Tr>
          <Td>3</Td>
          <Td></Td>
          <Td>{third.income}</Td>
          <Td>{third.type}</Td>
          <Td>{third.outcome}</Td>
        </Tr>
        <Tr fontWeight={"bold"}>
          <Td>I квартал</Td>
          <Td></Td>
          <Td>{fkIncome}</Td>
          <Td></Td>
          <Td>{fkOutcome}</Td>
        </Tr>
        <Tr>
          <Td>4</Td>
          <Td></Td>
          <Td>{fourth.income}</Td>
          <Td>{fourth.type}</Td>
          <Td>{fourth.outcome}</Td>
        </Tr>
        <Tr>
          <Td>5</Td>
          <Td></Td>
          <Td>{fifth.income}</Td>
          <Td>{fifth.type}</Td>
          <Td>{fifth.outcome}</Td>
        </Tr>
        <Tr>
          <Td>6</Td>
          <Td></Td>
          <Td>{sixth.income}</Td>
          <Td>{sixth.type}</Td>
          <Td>{sixth.outcome}</Td>
        </Tr>
        <Tr fontWeight={"bold"}>
          <Td>II квартал</Td>
          <Td></Td>
          <Td>{skIncome}</Td>
          <Td></Td>
          <Td>{skOutcome}</Td>
        </Tr>
        <Tr>
          <Td>7</Td>
          <Td></Td>
          <Td>{seventh.income}</Td>
          <Td>{seventh.type}</Td>
          <Td>{seventh.outcome}</Td>
        </Tr>
        <Tr>
          <Td>8</Td>
          <Td></Td>
          <Td>{eight.income}</Td>
          <Td>{eight.type}</Td>
          <Td>{eight.outcome}</Td>
        </Tr>
        <Tr>
          <Td>9</Td>
          <Td></Td>
          <Td>{ninth.income}</Td>
          <Td>{ninth.type}</Td>
          <Td>{ninth.outcome}</Td>
        </Tr>
        <Tr fontWeight={"bold"}>
          <Td>III квартал</Td>
          <Td></Td>
          <Td>{tkIncome}</Td>
          <Td></Td>
          <Td>{tkOutcome}</Td>
        </Tr>
        <Tr>
          <Td>10</Td>
          <Td></Td>
          <Td>{tenth.income}</Td>
          <Td>{tenth.type}</Td>
          <Td>{tenth.outcome}</Td>
        </Tr>
        <Tr>
          <Td>11</Td>
          <Td></Td>
          <Td>{eleventh.income}</Td>
          <Td>{eleventh.type}</Td>
          <Td>{eleventh.outcome}</Td>
        </Tr>
        <Tr>
          <Td>12</Td>
          <Td></Td>
          <Td>{twelfth.income}</Td>
          <Td>{twelfth.type}</Td>
          <Td>{twelfth.outcome}</Td>
        </Tr>
        <Tr fontWeight={"bold"}>
          <Td>IV квартал</Td>
          <Td></Td>
          <Td>{fourthkIncome}</Td>
          <Td></Td>
          <Td>{fourthkOutcome}</Td>
        </Tr>
        <Tr fontWeight={"bold"}>
          <Td>Рік</Td>
          <Td></Td>
          <Td>{yearIncome}</Td>
          <Td></Td>
          <Td>{yearOutcome}</Td>
        </Tr>
        <Tr>
          <Td>Оборот за рік</Td>
        </Tr>
        {outcomes.map((el) => {
          const cart = map.maps.find((e) => e.id == el.techCartId);
          const buying = map.buyingMachine.find(
            (e) => e.id == el.buyingMachineId
          );
          return (
            <Tr key={el.id}>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>
                {cart?.area! * cart?.costHectare! ||
                  buying?.amount! * buying?.cost!}
              </Td>
              <Td>{el.type}</Td>
              <Td>{cart?.nameCart || buying?.name}</Td>
            </Tr>
          );
        })}
        {incomes.map((el) => {
          const sale = income.sale.find((e) => e.id == el.saleId);
          const credit = income.credit.find((e) => e.id == el.creditId);
          const product = map.product.find(
            (e) =>
              e.id ==
              income.production.find((e) => e.id == sale?.productionId)
                ?.productId
          );
          const derj = income.derj.find((e) => e.id == el.derjSupportId);
          const investment = income.investment.find(
            (e) => e.id == el.investmentId
          );
          const grant = income.grant.find((e) => e.id == el.grantId);
          const conditionTime =
            +sale?.date?.split("-")[0] == year ||
            +credit?.date?.split("-")[0] == year ||
            +derj?.date?.split("-")[0] == year ||
            +investment?.date?.split("-")[0] == year ||
            +grant?.date?.split("-")[0] == year;
          if (conditionTime)
            return (
              <Tr key={el.id}>
                <Td></Td>
                <Td>
                  {product?.name ||
                    credit?.name ||
                    derj?.name ||
                    investment?.name ||
                    grant?.name}
                </Td>
                <Td>
                  {sale?.amount! * sale?.price! ||
                    credit?.cost ||
                    derj?.cost ||
                    investment?.cost ||
                    grant?.cost}
                </Td>
                <Td>{el.type}</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            );
        })}
        <Tr>
          <Th></Th>
          <Th></Th>
          <Th>10000</Th>
          <Th colSpan={3}>Залишок на кінець періоду 2222</Th>
          <Th></Th>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default observer(CashFlowTable);
