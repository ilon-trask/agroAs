import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../main";
import BusinessTableItem from "./component/BusinessConceptTableItem";

import Loader from "../../components/Loader";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Box } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { BusinessProps } from "../CreateBusiness/CreateBusinessPlan";
import { IbusinessPlan } from "../../../../tRPC serv/models/models";
import { useParams } from "react-router-dom";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";

interface props {
  // maps: resTechCartsWithOpers[] | [];
  // setCreate: Dispatch<SetStateAction<boolean>>;
  // deleteFunc: (BusinessId: number) => void;
  // setShowAlert: Dispatch<SetStateAction<boolean>>;
  // setUpdate: Dispatch<SetStateAction<boolean>>;
  // setRes: Dispatch<SetStateAction<BusinessProps>>;
  // agreeFunc: (BusinessId: number, isPublic: boolean, isAgree?: boolean) => void;
  setOpenResume: Dispatch<SetStateAction<boolean>>;
  getData: (name: string, children: string, infCartId?: number) => void;
}
const CartsTable = observer(
  ({
    setOpenResume,
    getData,
  }: // setCreate,
  // deleteFunc,
  // setShowAlert,
  // setUpdate,
  // setRes,
  // agreeFunc,

  props) => {
    const { map, user, business } = useContext(Context);
    const { id } = useParams();
    const Business: resBusinessPlan[] = JSON.parse(
      JSON.stringify(business.businessPlan)
    );
    const [showAlert, setShowAlert] = useState(false);
    const [myBusiness] = Business.filter((el) => el.id == id);
    const data = [
      { id: 1, name: "Титульний", label: "", setOpen: () => {} },
      {
        id: 2,
        name: "Резюме",
        label: "resume",
        setOpen: setOpenResume,
        children: myBusiness?.resume,
      },
      { id: 3, name: "Про підприємство", label: "", setOpen: () => {} },
      { id: 4, name: "Про проект", label: "", setOpen: () => {} },
      { id: 5, name: "Фінансування", label: "", setOpen: () => {} },
      { id: 6, name: "Додатку", label: "", setOpen: () => {} },
    ];
    return (
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>Зміст</Th>
            <Th></Th>
            <Th></Th>
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
          {data.map((e) => (
            <BusinessTableItem
              key={e.id}
              e={e}
              setOpen={e.setOpen}
              // deleteFunc={deleteFunc}
              setShowAlert={setShowAlert}
              // setUpdate={setUpdate}
              // setRes={setRes}
              // agreeFunc={agreeFunc}
              getData={getData}
              // setOpen={setOpen}
              // setUpdate={setUpdate}
              // deleteOpen={deleteOpen}
              // setDeleteOpen={setDeleteOpen}
              // setPublicationOpen={setPublicationOpen}
            />
          ))}
        </Tbody>
      </Table>
    );
  }
);

export default CartsTable;
