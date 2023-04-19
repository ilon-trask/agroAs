import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../main";
import BusinessTableItem from "./component/BusinessConceptTableItem";

import Loader from "../../components/Loader";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Box } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IbusinessPlan } from "../../../../tRPC serv/models/models";
import { useParams } from "react-router-dom";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
import { iChild, iName } from "../../pages/BusinessPlanPage";

interface props {
  // maps: resTechCartsWithOpers[] | [];
  // setCreate: Dispatch<SetStateAction<boolean>>;
  // deleteFunc: (BusinessId: number) => void;
  // setShowAlert: Dispatch<SetStateAction<boolean>>;
  // setUpdate: Dispatch<SetStateAction<boolean>>;
  // setRes: Dispatch<SetStateAction<BusinessProps>>;
  // agreeFunc: (BusinessId: number, isPublic: boolean, isAgree?: boolean) => void;
  setOpenResume: Dispatch<SetStateAction<boolean>>;
  setOpenTitle: Dispatch<SetStateAction<boolean>>;
  getData: (name: iName, children: iChild, infCartId: number | null) => void;
}
const CartsTable = observer(
  ({
    setOpenResume,
    setOpenTitle,
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
    console.log(myBusiness);

    const data: {
      id: number;
      name: string;
      label: iName;
      setOpen: Dispatch<SetStateAction<boolean>> | ((res: any) => void);
      children: any;
    }[] = [
      {
        id: 1,
        name: "Титульний",
        label: "titlePage",
        setOpen: setOpenTitle,
        children: myBusiness?.titlePage,
      },
      {
        id: 2,
        name: "Резюме",
        label: "resume",
        setOpen: setOpenResume,
        children: myBusiness?.resume,
      },
      {
        id: 3,
        name: "Про підприємство",
        label: "",
        setOpen: () => {},
        children: null,
      },
      {
        id: 4,
        name: "Про проект",
        label: "",
        setOpen: () => {},
        children: null,
      },
      {
        id: 5,
        name: "Фінансування",
        label: "",
        setOpen: () => {},
        children: null,
      },
      { id: 6, name: "Додатки", label: "", setOpen: () => {}, children: null },
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
