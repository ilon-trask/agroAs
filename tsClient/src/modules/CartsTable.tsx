import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../main";
import CartsTableItem from "../components/CartsTableItem";
import { cartProps } from "./CreateCart";

import Loader from "../components/Loader";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";

interface props {
  maps: resTechCartsWithOpers[] | [];
  setRes: (res: cartProps) => void;
  setOpen: (open: boolean) => void;
  setUpdate: (update: boolean) => void;
  setShowAlert: (showAlert: boolean) => void;
  deleteOpen: any;
  setDeleteOpen: (deleteOpen: any) => void;
}

const CartsTable = observer(
  ({
    maps,
    setRes,
    setOpen,
    setUpdate,
    setShowAlert,
    deleteOpen,
    setDeleteOpen,
  }: props) => {
    const { map, user } = useContext(Context);

    return (
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Назва культури</Th>
            <Th>Площа (га)</Th>
            <Th>Загальна вартість (грн)</Th>
            <Th>Витрати на 1 га (грн)</Th>
            <Th></Th>
            {user.role == "ADMIN" && <Th></Th>}
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
          {maps.map((e) => (
            <CartsTableItem
              key={e.id}
              e={e}
              setOpen={setOpen}
              setRes={setRes}
              setUpdate={setUpdate}
              setShowAlert={setShowAlert}
              deleteOpen={deleteOpen}
              setDeleteOpen={setDeleteOpen}
            />
          ))}
        </Tbody>
      </Table>
    );
  }
);

export default CartsTable;
