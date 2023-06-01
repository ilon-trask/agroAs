import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useState,
} from "react";
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
  setOpenResume: Dispatch<SetStateAction<boolean>>;
  setOpenTitle: Dispatch<SetStateAction<boolean>>;
  getData: (name: iName, children: iChild, infCartId: number | null) => void;
  indicatorRef: RefObject<HTMLParagraphElement>;
  resumeRef: RefObject<HTMLParagraphElement>;
  titleRef: RefObject<HTMLParagraphElement>;
  enterpriseRef: RefObject<HTMLParagraphElement>;
  productionRef: RefObject<HTMLParagraphElement>;
  financingRef: RefObject<HTMLParagraphElement>;
  additionRef: RefObject<HTMLParagraphElement>;
  buttonsRef: RefObject<HTMLDivElement>;
}
const CartsTable = observer(
  ({
    setOpenResume,
    setOpenTitle,
    indicatorRef,
    buttonsRef,
    additionRef,
    enterpriseRef,
    financingRef,
    getData,
    productionRef,
    resumeRef,
    titleRef,
  }: props) => {
    const { map, user, business } = useContext(Context);
    const { id } = useParams();
    const Business: resBusinessPlan[] = JSON.parse(
      JSON.stringify(business.businessPlan)
    );
    const [showAlert, setShowAlert] = useState(false);
    const [myBusiness] = Business.filter((el) => el.id == id);

    const data: {
      id: number;
      name: string;
      label: iName;
      setOpen: Dispatch<SetStateAction<boolean>> | ((res: any) => void);
      children: any;
      ref: RefObject<HTMLParagraphElement>;
    }[] = [
      {
        id: 1,
        name: "Титульний",
        label: "titlePage",
        setOpen: setOpenTitle,
        children: myBusiness?.titlePage,
        ref: titleRef,
      },
      {
        id: 2,
        name: "Резюме",
        label: "resume",
        setOpen: setOpenResume,
        children: myBusiness?.resume,
        ref: resumeRef,
      },
      {
        id: 3,
        name: "Підприємство",
        label: "",
        setOpen: () => {},
        children: null,
        ref: enterpriseRef,
      },
      {
        id: 4,
        name: "Виробництво",
        label: "",
        setOpen: () => {},
        children: null,
        ref: productionRef,
      },
      {
        id: 5,
        name: "Фінансування",
        label: "",
        setOpen: () => {},
        children: null,
        ref: financingRef,
      },
      {
        id: 6,
        name: "Показники",
        label: "",
        setOpen: () => {},
        children: null,
        ref: indicatorRef,
      },
      {
        id: 7,
        name: "Додатки",
        label: "",
        setOpen: () => {},
        children: null,
        ref: additionRef,
      },
    ];
    return (
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>Зміст</Th>
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
          {data.map((e) => {
            console.log(e.ref);

            return <BusinessTableItem key={e.id} e={e} aref={buttonsRef} />;
          })}
        </Tbody>
      </Table>
    );
  }
);

export default CartsTable;
