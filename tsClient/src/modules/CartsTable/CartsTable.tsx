import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../../main";
import CartsTableItem from "./CartsTableItem";
import { cartProps } from "../CreateCart/CreateCart";

import Loader from "../../components/Loader";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Box, Td } from "@chakra-ui/react";
import { resTechCartsWithOpers } from "../../../../tRPC serv/controllers/TechCartService";
import { IUserRole } from "../../../../tRPC serv";

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
export function CartsTableHeadRow({
  isCul,
  isPlan,
  role,
}: {
  isCul?: boolean;
  isPlan?: boolean;
  role: IUserRole;
}) {
  return (
    <Tr>
      {!isPlan && <Th></Th>}
      {isCul && <Th>Технологія</Th>}
      {(isCul || isPlan) && <Th>Рік</Th>}
      <Th>Назва карти</Th>
      <Th>Площа (га)</Th>
      <Th>Загальна вартість (грн)</Th>
      <Th>Витрати на 1 га (грн)</Th>
      {!isPlan && <Th>ТЕП</Th>}
      {!isPlan && <Th></Th>}
      {(role == "ADMIN" || role == "AUTHOR" || role == "service_role") &&
        !isCul &&
        !isPlan && <Th></Th>}
    </Tr>
  );
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
      <Table size={"sm"}>
        <Thead>
          <CartsTableHeadRow role={user.role} isCul={isCul} />
        </Thead>
        <Tbody>
          {map.isLoading ? (
            <Tr mx={"auto"}>
              <Td colSpan={10}>
                <Loader />
              </Td>
            </Tr>
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
                        <Td fontWeight={"bold"} textTransform={"uppercase"}>
                          {el.name}
                        </Td>
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
