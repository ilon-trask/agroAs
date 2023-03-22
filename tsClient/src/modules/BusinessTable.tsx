import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../main";
import BusinessTableItem from "../components/BusinessTableItem";

import Loader from "../components/Loader";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Box } from "@chakra-ui/react";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IbusinessPlan } from "../../../tRPC serv/models/models";

interface props {
  // maps: resTechCartsWithOpers[] | [];
  setCreate: (open: boolean) => void;
  // setRes: (res: cartProps) => void;
  // setOpen: (open: boolean) => void;
  // setUpdate: (update: boolean) => void;
  // setShowAlert: (showAlert: boolean) => void;
  // deleteOpen: any;
  // setDeleteOpen: (deleteOpen: any) => void;
  // setPublicationOpen: ({
  //   isOpen,
  //   data: { id, isPublic },
  // }: {
  //   isOpen: boolean;
  //   data: { id: number; isPublic: boolean; agree: boolean };
  // }) => void;
}

const CartsTable = observer(
  ({
    setCreate,
  }: // maps,
  // setRes,
  // setOpen,
  // setUpdate,
  // setShowAlert,
  // deleteOpen,
  // setDeleteOpen,
  // setPublicationOpen,
  props) => {
    const { map, user, business } = useContext(Context);

    return (
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Назва </Th>
            <Th></Th>
            {(user.role == "ADMIN" ||
              user.role == "AUTHOR" ||
              user.role == "service_role") && <Th></Th>}
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
          {business.businessPlan.map((e) => (
            <BusinessTableItem
              key={e.id}
              e={e}
              // setOpen={setOpen}
              // setRes={setRes}
              // setUpdate={setUpdate}
              // setShowAlert={setShowAlert}
              // deleteOpen={deleteOpen}
              // setDeleteOpen={setDeleteOpen}
              // setPublicationOpen={setPublicationOpen}
            />
          ))}
          <Tr>
            <Th>
              <PlusSquareIcon
                h={6}
                w={6}
                color={"blue.400"}
                onClick={() => {
                  console.log(23423);

                  setCreate(true);
                }}
              />
            </Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Tbody>
      </Table>
    );
  }
);

export default CartsTable;
