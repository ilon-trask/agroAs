import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../main";
import CartsTableItem from "../components/CartsTableItem";
import { cartProps } from "./CreateCart";

import Loader from "../components/Loader";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Box, Td } from "@chakra-ui/react";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";

interface props {
  maps: resTechCartsWithOpers[] | [];
  setRes: (res: cartProps) => void;
  setOpen: (open: boolean) => void;
  setUpdate: (update: boolean) => void;
  setShowAlert: (showAlert: boolean) => void;
  deleteOpen: any;
  setDeleteOpen: (deleteOpen: any) => void;
  setPublicationOpen: ({
    isOpen,
    data: { id, isPublic },
  }: {
    isOpen: boolean;
    data: { id: number; isPublic: boolean; agree: boolean };
  }) => void;
  isCul?: boolean;
}
function isNotEmpty(res: (JSX.Element | undefined)[][]) {
  for (let i = 0; i < res.length; i++) {
    const el = res[i];
    for (let j = 0; j < el.length; j++) {
      const e = el[j];
      if (e) return true;
    }
  }
  return false;
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
    setPublicationOpen,
    isCul,
  }: props) => {
    const { map, user } = useContext(Context);
    return (
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            {isCul && (
              <>
                <Th>Технологія</Th>
                <Th>Рік</Th>
              </>
            )}
            <Th>Назва карти</Th>
            <Th>Площа (га)</Th>
            <Th>Загальна вартість (грн)</Th>
            <Th>Витрати на 1 га (грн)</Th>
            {!isCul && <Th></Th>}
            {(user.role == "ADMIN" ||
              user.role == "AUTHOR" ||
              user.role == "service_role") &&
              !isCul && <Th></Th>}
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
          {isCul
            ? map.culture.map((el) => {
                const res = map.cultivationTechnologies.map((elx) =>
                  maps.map((e) => {
                    if (
                      e.cultureId == el.id &&
                      elx.id == e.cultivationTechnologyId
                    )
                      return (
                        <CartsTableItem
                          key={e.id}
                          e={e}
                          setOpen={setOpen}
                          setRes={setRes}
                          setUpdate={setUpdate}
                          setShowAlert={setShowAlert}
                          deleteOpen={deleteOpen}
                          setDeleteOpen={setDeleteOpen}
                          setPublicationOpen={setPublicationOpen}
                          isCul={isCul}
                        />
                      );
                  })
                );

                if (isNotEmpty(res))
                  return (
                    <>
                      <Tr>
                        <Td></Td>
                        <Td>{el.name}</Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                      </Tr>

                      {res}
                    </>
                  );
              })
            : maps.map((e) => (
                <CartsTableItem
                  key={e.id}
                  e={e}
                  setOpen={setOpen}
                  setRes={setRes}
                  setUpdate={setUpdate}
                  setShowAlert={setShowAlert}
                  deleteOpen={deleteOpen}
                  setDeleteOpen={setDeleteOpen}
                  setPublicationOpen={setPublicationOpen}
                />
              ))}
        </Tbody>
      </Table>
    );
  }
);

export default CartsTable;
