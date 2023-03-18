import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../main";
import AgreeCartsTableItem from "./components/AgreeCartsTableItem";

import Loader from "../../components/Loader";

import { Table, Thead, Tbody, Tr, Th, Box } from "@chakra-ui/react";
import { resTechCartsWithOpers } from "../../../../tRPC serv/controllers/TechCartService";
import { Itech_cart } from "../../../../tRPC serv/models/models";

interface props {
  setRes: (res: Itech_cart) => void;
  setOpen: (open: boolean) => void;
  setPublicationOpen: ({
    isOpen,
    data: { id, isPublic },
  }: {
    isOpen: boolean;
    data: { id: number; isPublic: boolean; agree: boolean };
  }) => void;
}

const AgreeCartsTable = observer(
  ({ setRes, setOpen, setPublicationOpen }: props) => {
    const { map, user } = useContext(Context);

    return (
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>Назва культури</Th>
            <Th>Площа (га)</Th>
            <Th>Загальна вартість</Th>
            <Th>Витрати на 1 га</Th>
            <Th>Автор</Th>
            <Th>Культура</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {map.isLoading ? (
            <Box mx={"auto"}>
              <Loader />
            </Box>
          ) : null}
          {map.NoAgreeCarts.map((e) => (
            <AgreeCartsTableItem
              key={e.id}
              e={e}
              setOpen={setOpen}
              setRes={setRes}
              setPublicationOpen={setPublicationOpen}
            />
          ))}
        </Tbody>
      </Table>
    );
  }
);

export default AgreeCartsTable;
