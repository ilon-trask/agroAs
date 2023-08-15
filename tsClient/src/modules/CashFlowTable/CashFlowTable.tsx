import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Popover,
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

import useIncomeTypes from "../../shared/hook/useIncomeTypes";
import useOutcomeTypes from "../../shared/hook/useOutcomeTypes";
let akk: number[] = [];
function setAkk(value: number) {
  if (!akk.includes(value)) {
    akk.push(value);
  }
}
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

export function CashFlowTableHeadBegin({
  startSum,
  year,
}: {
  startSum: number | undefined;
  year: number;
}) {
  return (
    <Tr>
      <Th></Th>
      <Th>{startSum ?? 0}</Th>
      <Th colSpan={3}>Залишок на початок періоду {year || 2222}</Th>
      {/* <Th></Th> */}
    </Tr>
  );
}
export function CashFlowTableHead({
  startSum,
  year,
}: {
  startSum: number | undefined;
  year: number;
}) {
  return (
    <Thead>
      <CashFlowTableHeadBegin startSum={startSum} year={year} />
      <Tr>
        <Th>Період</Th>
        <Th>Назва доходу</Th>
        <Th>Прихід</Th>
        <Th>Назва витрат</Th>
        <Th>Розхід</Th>
      </Tr>
    </Thead>
  );
}
function CashFlowTable({
  year,
  startSum,
  endSum,
  fkIncome = 0,
  fkOutcome = 0,
  fourthkIncome = 0,
  fourthkOutcome = 0,
  skIncome = 0,
  skOutcome = 0,
  tkIncome = 0,
  tkOutcome = 0,
  yearOutcome = 0,
  yearIncome = 0,
}: {
  year: number;
  startSum?: number;
  endSum?: number;
  fkIncome?: number;
  skIncome?: number;
  tkIncome?: number;
  fourthkIncome?: number;
  yearOutcome?: number;
  yearIncome?: number;
  fkOutcome?: number;
  skOutcome?: number;
  tkOutcome?: number;
  fourthkOutcome?: number;
}) {
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

  return (
    <Table size={"sm"}>
      <CashFlowTableHead startSum={startSum} year={0} />
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
          <Td>
            {yearIncome || Math.round((endSum! - startSum!) * 1000) / 1000}
          </Td>
          <Td></Td>
          <Td>{yearOutcome}</Td>
        </Tr>
        <Tr>
          <Td>Оборот за рік</Td>
          <Td></Td>
          <Td>
            {yearIncome || Math.round((endSum! - startSum!) * 1000) / 1000}
          </Td>
        </Tr>
        {/* {[].map((el, ind) => {
          return (
            <Tr key={ind}>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>
                {cart?.area! * cart?.costHectare! ||
                  buying?.amount! * buying?.cost! ||
                  adm?.cost}
              </Td>
              <Td>{el.type}</Td>
              <Td>{cart?.nameCart || buying?.name || adm?.name}</Td>
            </Tr>
          );
        })} */}
        {/* {[].map((el) => {
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
        })} */}
        <Tr>
          <Th></Th>
          <Th></Th>
          <Th>{endSum || 0}</Th>
          <Th colSpan={3}>Залишок на кінець періоду {year || 2222}</Th>
          <Th></Th>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default CashFlowTable;
