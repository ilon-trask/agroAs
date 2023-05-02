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
  const first = { income: 0 };
  const second = { income: 0 };
  const third = { income: 0 };
  const fourth = { income: 0 };
  const fifth = { income: 0, outcome: 0 };
  const sixth = { income: 0 };
  const seventh = { income: 0 };
  const eight = { income: 0 };
  const ninth = { income: 0 };
  const tenth = { income: 0 };
  const eleventh = { income: 0 };
  const twelfth = { income: 0 };
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
    const sale = income.credit.find((e) => e.id == el.saleId);
    const credit = income.credit.find((e) => e.id == el.creditId);
    const date = +credit?.date?.split("-")[1];
    console.log(date);
    if (date) obj[date].income += credit?.cost;
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
        </Tr>
        <Tr>
          <Td>2</Td>
        </Tr>
        <Tr>
          <Td>3</Td>
        </Tr>
        <Tr>
          <Td>I квартал</Td>
        </Tr>
        <Tr>
          <Td>4</Td>
        </Tr>
        <Tr>
          <Td>5</Td>
          <Td></Td>
          <Td>{fifth.income}</Td>
        </Tr>
        <Tr>
          <Td>6</Td>
        </Tr>
        <Tr>
          <Td>II квартал</Td>
        </Tr>
        <Tr>
          <Td>7</Td>
        </Tr>
        <Tr>
          <Td>8</Td>
        </Tr>
        <Tr>
          <Td>9</Td>
        </Tr>
        <Tr>
          <Td>III квартал</Td>
        </Tr>
        <Tr>
          <Td>10</Td>
        </Tr>
        <Tr>
          <Td>11</Td>
        </Tr>
        <Tr>
          <Td>12</Td>
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
              <Td>{cart?.area * cart?.costHectare!}</Td>
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
          return (
            <Tr key={el.id}>
              <Td></Td>
              <Td>{product?.name || credit?.name}</Td>
              <Td>{sale?.amount! * sale?.price! || credit?.cost}</Td>
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
