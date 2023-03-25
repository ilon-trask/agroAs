import React, { Dispatch, SetStateAction, useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../main";
import BusinessTableItem from "./component/BusinessTableItem";

import Loader from "../../components/Loader";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Box } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { BusinessProps } from "../CreateBusiness/CreateBusinessPlan";
import { IbusinessPlan } from "../../../../tRPC serv/models/models";

interface props {
  // maps: resTechCartsWithOpers[] | [];
  setCreate: Dispatch<SetStateAction<boolean>>;
  deleteFunc: (BusinessId: number) => void;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setRes: Dispatch<SetStateAction<BusinessProps>>;
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
    const { map, user, business } = useContext(Context);
    const Business: IbusinessPlan[] = JSON.parse(
      JSON.stringify(business.businessPlan)
    );
    Business.sort((a, b) => a.id! - b.id!);
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
          {Business.map((e) => (
            <BusinessTableItem
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
