import { EditIcon } from "@chakra-ui/icons";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { isPlainObject } from "mobx/dist/internal";
import React, { useContext } from "react";
import { Iproduction } from "../../../../tRPC serv/models/models";
import { Context } from "../../main";
import useProductionTypes from "../../pages/hook/useProductionTypes";
import IncomeStore from "../../store/IncomeStore";

function Item({ el }: { el: Iproduction }) {
  const { income, map } = useContext(Context);
  const myProduct = map.product.find((e) => e.id! == el.productId!);
  const myYield = income.yieldPlant.find(
    (e) => e.cultureId! == myProduct?.cultureId!
  );
  const myCart = map.maps.find((e) => {
    return e.id! == el.techCartId!;
  });
  const planYield =
    Math.round(myYield?.yieldPerHectare! * myCart?.area! * 100) / 100;
  return (
    <Tr key={el.id}>
      <Td>
        <EditIcon color={"blue.400"} w={"20px"} h={"auto"} cursor={"pointer"} />
      </Td>
      <Td>{myProduct?.name}</Td>
      <Td>{myYield?.yieldPerHectare}</Td>
      <Td>{myCart?.area}</Td>
      <Td>{planYield}</Td>
      <Td>
        {Math.round(
          ((myCart?.costHectare! * myCart?.area!) / planYield) * 100
        ) / 100}
      </Td>
      <Td>{myCart?.costHectare! * myCart?.area!}</Td>
    </Tr>
  );
}
function GigItem({
  arr,
  isPrimary,
  year,
}: {
  arr: Iproduction[];
  year: number;
  isPrimary: boolean;
}) {
  return (
    <>
      <Tr>
        <Td></Td>
        <Td>
          {year + " рік "}
          {useProductionTypes.find((e) => e.value == isPrimary)?.name}
        </Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
      </Tr>
      {arr.map((e) => (
        <Item key={e.id} el={e} />
      ))}
    </>
  );
}
function returner(isPrimary: boolean, income: IncomeStore) {
  const array = new Array(20);
  array.fill(1);
  return array.map((e, ind) => {
    const arr = income.production.filter(
      (e) => e.year == ind && e.isPrimary == isPrimary
    );
    return arr[0] && <GigItem arr={arr} isPrimary={isPrimary} year={ind} />;
  });
}
function PlanIncomeProductionTable() {
  const { income, map } = useContext(Context);

  return (
    <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Продукт або послуга</Th>
            <Th>
              Планова <br />
              урожайність (т/га)
            </Th>
            <Th>Площа (га)</Th>
            <Th>
              Планове <br />
              виробництво (т)
            </Th>
            <Th>
              Собівартість <br />
              грн/т
            </Th>
            <Th>Сума грн</Th>
          </Tr>
        </Thead>
        <Tbody>
          {returner(true, income)}
          {returner(false, income)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default observer(PlanIncomeProductionTable);
