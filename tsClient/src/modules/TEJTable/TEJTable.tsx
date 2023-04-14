import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../main";
import TEJTableItem from "./component/TEJTableItem";

import Loader from "../../components/Loader";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Box } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { TEJProps } from "../CreateTEJ/CreateTEJ";
import { resTechnologicalEconomicJustification } from "../../../../tRPC serv/controllers/TEJService";
import { getTEJ } from "../../http/requests";

interface props {
  // maps: resTechCartsWithOpers[] | [];
  setCreate: Dispatch<SetStateAction<boolean>>;
  deleteFunc: (BusinessId: number) => void;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setRes: Dispatch<SetStateAction<TEJProps>>;
  agreeFunc: (BusinessId: number, isPublic: boolean, isAgree?: boolean) => void;
}

const CartsTable = observer(
  ({
    setCreate,
    deleteFunc,
    setShowAlert,
    setUpdate,
    setRes,
    agreeFunc,
  }: props) => {
    const { map, user, TEJ } = useContext(Context);
    console.log(TEJ.justification);
    const Justification: resTechnologicalEconomicJustification[] = JSON.parse(
      JSON.stringify(TEJ.justification)
    );
    Justification.sort((a, b) => a.id! - b.id!);

    useEffect(() => {
      getTEJ(TEJ);
    }, []);
    return (
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Культура</Th>
            <Th>Технологія</Th>
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
          {Justification.map((e) => (
            <TEJTableItem
              key={e.id}
              e={e}
              deleteFunc={deleteFunc}
              setShowAlert={setShowAlert}
              setOpen={setCreate}
              setUpdate={setUpdate}
              setRes={setRes}
              agreeFunc={agreeFunc}
              // setOpen={setOpen}
              // setUpdate={setUpdate}
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
