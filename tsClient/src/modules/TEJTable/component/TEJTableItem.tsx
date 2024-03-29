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
import {
  BUSINESSpLAN_ROUTER,
  TEHMAP_ROUTER,
  TEJ_ROUTER,
} from "../../../utils/consts";

import { Tr, Td, Checkbox, Tooltip } from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  QuestionOutlineIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  IbusinessPlan,
  ItechnologicalEconomicJustification,
} from "../../../../../tRPC serv/models/models";
import { TEJProps } from "../../CreateTEJ/CreateTEJ";
import { resTechnologicalEconomicJustification } from "../../../../../tRPC serv/controllers/TEJService";

interface props {
  e: resTechnologicalEconomicJustification;
  deleteFunc: (TEJId: number) => void;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRes: Dispatch<SetStateAction<TEJProps>>;
  TEJPubOpenFunc: (
    TEJId: number,
    isPublic: boolean,
    isAgree: boolean,
    authorName: string,
    publicComment: string
  ) => void;
}

const CartsTableItem = observer(
  ({
    e,
    deleteFunc,
    setShowAlert,
    setUpdate,
    setOpen,
    setRes,
    TEJPubOpenFunc,
  }: props) => {
    const { map, business, user } = useContext(Context);
    return (
      <Tr key={e.id!}>
        <Td
          textAlign={"center"}
          onClick={() => {
            setUpdate(true);
            setOpen(true);
            setRes({
              TEJId: e.id,
              cartId: e.techCartId!,
              comment: e.comment!,
              area: e.area,
              cultivationTechnologyId: e.cultivationTechnologyId!,
              cultureId: e.cultureId!,
            });
          }}
        >
          <EditIcon
            color={"blue.400"}
            w={"20px"}
            h={"auto"}
            cursor={"pointer"}
          />
        </Td>
        <Td>
          <Link to={TEJ_ROUTER + `/${e.id}`}>
            <ViewIcon boxSize={5} color={"blue.400"} /> {e.culture.name}
          </Link>
        </Td>
        <Td>{e.cultivationTechnology?.name}</Td>
        <Td>{e.comment}</Td>

        <Td
          textAlign={"center"}
          cursor={"pointer"}
          color={"red"}
          onClick={
            user.role == ""
              ? () => setShowAlert(true)
              : () => {
                  console.log(e.id);
                  deleteFunc(e.id!);
                }
          }
        >
          <DeleteIcon w={"20px"} h={"auto"} />
        </Td>

        <Td>
          {(user.role == "ADMIN" ||
            user.role == "AUTHOR" ||
            user.role == "service_role") && (
            <div
              onClick={() => {
                TEJPubOpenFunc(
                  e.id!,
                  !e.isPublic,
                  e.isAgree!,
                  e.authorName!,
                  e.publicComment!
                );
              }}
            >
              <Checkbox size="md" colorScheme="green" isChecked={e.isPublic}>
                опублікувати
              </Checkbox>
            </div>
          )}
        </Td>
      </Tr>
    );
  }
);
export default CartsTableItem;
