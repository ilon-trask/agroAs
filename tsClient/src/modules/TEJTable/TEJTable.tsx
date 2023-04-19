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
  deleteFunc: (TEJId: number) => void;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setRes: Dispatch<SetStateAction<TEJProps>>;
  TEJPubOpenFunc: (
    TEJId: number,
    isPublic: boolean,
    isAgree: boolean,
    authorName: string,
    publicComment: string
  ) => void;
}

const TEJTable = observer(
  ({
    setCreate,
    deleteFunc,
    setShowAlert,
    setUpdate,
    setRes,
    TEJPubOpenFunc,
  }: props) => {
    const { map, user, TEJ } = useContext(Context);
    const Justification: resTechnologicalEconomicJustification[] | undefined =
      JSON.parse(JSON.stringify(TEJ.justification || []));
    Justification?.sort(
      //@ts-ignore
      (a, b) => new Date(a.createdAt!) - new Date(b.createdAt!)
    );
    console.log(Justification);

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
            <Th>Коментар</Th>
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
          {Justification?.map((e) => (
            <TEJTableItem
              key={e.id}
              e={e}
              deleteFunc={deleteFunc}
              setShowAlert={setShowAlert}
              setOpen={setCreate}
              setUpdate={setUpdate}
              setRes={setRes}
              TEJPubOpenFunc={TEJPubOpenFunc}
            />
          ))}
          <Tr>
            <Th>
              <PlusSquareIcon
                h={6}
                w={6}
                color={"blue.400"}
                onClick={() => {
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

export default TEJTable;
