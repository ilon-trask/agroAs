import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../../main";
import CartsTableItemInBusiness from "./component/CartsTableItemInBusiness";
import { cartProps } from "../CreateCart";

import Loader from "../../components/Loader";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Box } from "@chakra-ui/react";
import { resTechCartsWithOpers } from "../../../../tRPC serv/controllers/TechCartService";

interface props {
  cartId: number;
}

const CartsTable = observer(({ cartId }: props) => {
  const { map, user } = useContext(Context);
  const myMap = map.maps.filter((el) => el.id == cartId);
  return (
    <Table variant="simple" size={"sm"}>
      <Thead>
        <Tr>
          <Th>Назва культури</Th>
          <Th>Площа (га)</Th>
          <Th>Загальна вартість (грн)</Th>
          <Th>Витрати на 1 га (грн)</Th>
        </Tr>
      </Thead>
      <Tbody>
        {map.isLoading ? (
          <Box mx={"auto"}>
            <Loader />
          </Box>
        ) : (
          <></>
        )}
        {myMap?.map(
          (e) => <CartsTableItemInBusiness key={e.id} e={e} /> || null
        )}
      </Tbody>
    </Table>
  );
});

export default CartsTable;
