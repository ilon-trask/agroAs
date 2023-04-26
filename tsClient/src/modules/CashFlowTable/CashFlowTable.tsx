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
import React, { useContext } from "react";
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
  const { map } = useContext(Context);
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

export default CashFlowTable;
