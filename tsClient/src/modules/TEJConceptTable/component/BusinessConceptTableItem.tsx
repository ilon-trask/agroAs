import { observer } from "mobx-react-lite";
import React, { FC, useContext, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import {
  deleteCart,
  setIsPublic,
  setIsPublicBusiness,
} from "../../../http/requests";
import { Context } from "../../../main";
import { cartProps } from "../../CreateCart";
import MapStore from "../../../store/MapStore";
import { BUSINESSpLAN_ROUTER, TEHMAP_ROUTER } from "../../../utils/consts";

import { Tr, Td, Checkbox, Tooltip } from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  QuestionOutlineIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import { IbusinessPlan } from "../../../../../tRPC serv/models/models";
// import { BusinessProps } from "../../CreateTEJ/CreateTEJ";
import { iChild, iName } from "../../../pages/BusinessPlanPage";

interface props {
  e: { id: number; name: string; label: iName; children?: any };
  // deleteFunc: (BusinessId: number) => void;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  // setUpdate: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // setRes: Dispatch<SetStateAction<BusinessProps>>;
  // agreeFunc: (BusinessId: number, isPublic: boolean, isAgree?: boolean) => void;
  getData: (name: iName, children: iChild, infCartId: number | null) => void;
}
import names from "../names";
const CartsTableItem = observer(
  ({
    e,
    // deleteFunc,
    setShowAlert,
    // setUpdate,
    setOpen,
    // setRes,
    // agreeFunc,
    getData,
  }: props) => {
    const { map, business, user } = useContext(Context);
    let props;
    if (e.children) props = Object.keys(e.children);

    return (
      <>
        <Tr key={e.id!}>
          <Td fontWeight={"600"}>{e.name}</Td>
        </Tr>
      </>
    );
  }
);
export default CartsTableItem;
