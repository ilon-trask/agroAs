import React, { Dispatch, SetStateAction, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../main";
import TEJAgreeTableItem from "./component/TEJAgreeTableItem";

import Loader from "../../components/Loader";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Box } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { resTechnologicalEconomicJustification } from "../../../../tRPC serv/controllers/TEJService";

interface props {
  setCreate: Dispatch<SetStateAction<boolean>>;
  TEJPubOpenFunc: (
    TEJId: number,
    isPublic: boolean,
    isAgree: boolean,
    authorName: string,
    publicComment: string
  ) => void;
}

const BusinessAgreeTable = observer(({ setCreate, TEJPubOpenFunc }: props) => {
  const { map, user, TEJ } = useContext(Context);
  const NoAgreeJustification: resTechnologicalEconomicJustification[] =
    JSON.parse(JSON.stringify(TEJ.noAgreeJustification));
  NoAgreeJustification.sort(
    //@ts-ignore
    (a, b) => new Date(a.createdAt!) - new Date(b.createdAt!)
  );
  return (
    <Table variant="simple" size={"sm"}>
      <Thead>
        <Tr>
          <Th>Назва </Th>
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
        {NoAgreeJustification.map((e) => (
          <TEJAgreeTableItem key={e.id} e={e} TEJPubOpenFunc={TEJPubOpenFunc} />
        ))}
      </Tbody>
    </Table>
  );
});

export default BusinessAgreeTable;
