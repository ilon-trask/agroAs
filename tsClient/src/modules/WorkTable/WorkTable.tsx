import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../../main";
import WorkTableItem from "./components/WorkTableItem";
import { workProps } from "../CreateWork";
import Loader from "../../components/Loader";

import { Table, Thead, Tbody, Tr, Th, Box } from "@chakra-ui/react";
import { Ispecial_work } from "../../../../tRPC serv/models/models";

interface props {
  works: Ispecial_work[] | [];
  setRes: (res: workProps) => void;
  setOpen: (open: boolean) => void;
  setUpdate: (update: boolean) => void;
  setShowAlert: (showAlert: boolean) => void;
  deleteOpen: any;
  setDeleteOpen: (deleteOpen: any) => void;
}

const CartsTable = observer(
  ({
    works,
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
            <Th>Назва роботи</Th>
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
          {works.map((e) => (
            <WorkTableItem
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
