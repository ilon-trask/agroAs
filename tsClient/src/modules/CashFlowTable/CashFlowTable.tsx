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
function CashFlowTable() {
  const { map, income } = useContext(Context);

  const outcomes = map.outcome.filter((el) => el.isUsing! == true);
  const incomes = income.income.filter((el) => el.isUsing! == true);
  const first = { income: 0, type: "" };
  const second = { income: 0, type: "" };
  const third = { income: 0, type: "" };
  const fourth = { income: 0, type: "" };
  const fifth = { income: 0, outcome: 0, type: "" };
  const sixth = { income: 0, type: "" };
  const seventh = { income: 0, type: "" };
  const eight = { income: 0, type: "" };
  const ninth = { income: 0, type: "" };
  const tenth = { income: 0, type: "" };
  const eleventh = { income: 0, type: "" };
  const twelfth = { income: 0, type: "" };
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
  incomes.forEach((el) => {
    const sale = income.sale.find((e) => e.id == el.saleId);
    const credit = income.credit.find((e) => e.id == el.creditId);
    const derj = income.derj.find((e) => e.id == el.derjSupportId);
    const investment = income.investment.find((e) => e.id == el.investmentId);
    const grant = income.grant.find((e) => e.id == el.grantId);
    const prop = credit || derj || investment || grant;
    //@ts-ignore
    const date = +prop?.date?.split("-")[1] || +sale?.date?.split("-")[1];
    if (date) {
      //@ts-ignore
      obj[date].income += prop?.cost || sale?.price * sale?.amount;
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
        </Tr>
        <Tr>
          <Td>2</Td>
          <Td></Td>
          <Td>{second.income}</Td>
          <Td>{second.type}</Td>
        </Tr>
        <Tr>
          <Td>3</Td>
          <Td></Td>
          <Td>{third.income}</Td>
          <Td>{third.type}</Td>
        </Tr>
        <Tr>
          <Td>I квартал</Td>
        </Tr>
        <Tr>
          <Td>4</Td>
          <Td></Td>
          <Td>{fourth.income}</Td>
          <Td>{fourth.type}</Td>
        </Tr>
        <Tr>
          <Td>5</Td>
          <Td></Td>
          <Td>{fifth.income}</Td>
          <Td>{fifth.type}</Td>
        </Tr>
        <Tr>
          <Td>6</Td>
          <Td></Td>
          <Td>{sixth.income}</Td>
          <Td>{sixth.type}</Td>
        </Tr>
        <Tr>
          <Td>II квартал</Td>
        </Tr>
        <Tr>
          <Td>7</Td>
          <Td></Td>
          <Td>{seventh.income}</Td>
          <Td>{seventh.type}</Td>
        </Tr>
        <Tr>
          <Td>8</Td>
          <Td></Td>
          <Td>{eight.income}</Td>
          <Td>{eight.type}</Td>
        </Tr>
        <Tr>
          <Td>9</Td>
          <Td></Td>
          <Td>{ninth.income}</Td>
          <Td>{ninth.type}</Td>
        </Tr>
        <Tr>
          <Td>III квартал</Td>
        </Tr>
        <Tr>
          <Td>10</Td>
          <Td></Td>
          <Td>{tenth.income}</Td>
          <Td>{tenth.type}</Td>
        </Tr>
        <Tr>
          <Td>11</Td>
          <Td></Td>
          <Td>{eleventh.income}</Td>
          <Td>{eleventh.type}</Td>
        </Tr>
        <Tr>
          <Td>12</Td>
          <Td></Td>
          <Td>{twelfth.income}</Td>
          <Td>{twelfth.type}</Td>
        </Tr>
        <Tr>
          <Td>IV квартал</Td>
        </Tr>
        <Tr>
          <Td>Рік</Td>
        </Tr>
        <Tr>
          <Td>Оборот за рік</Td>
        </Tr>
        {outcomes.map((el) => {
          const cart = map.maps.find((e) => e.id == el.techCartId);
          return (
            <Tr key={el.id}>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>{cart?.area! * cart?.costHectare!}</Td>
              <Td>{el.type}</Td>
              <Td>{cart?.nameCart}</Td>
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
          console.log(sale);

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
