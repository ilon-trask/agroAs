import { observer } from "mobx-react-lite";
import React, { FC, useContext, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import {
  deleteCart,
  setIsAgreeBusiness,
  setIsPublic,
  setIsPublicBusiness,
} from "../../../http/requests";
import { Context } from "../../../main";
import { cartProps } from "../../CreateCart";
import MapStore from "../../../store/MapStore";
import { TEHMAP_ROUTER } from "../../../utils/consts";

import { Tr, Td, Checkbox, Tooltip } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { IbusinessPlan } from "../../../../../tRPC serv/models/models";
import { BusinessProps } from "../../CreateBusiness/CreateBusinessPlan";

interface props {
  e: IbusinessPlan;
  deleteFunc: (BusinessId: number) => void;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRes: Dispatch<SetStateAction<BusinessProps>>;
  agreeFunc: (BusinessId: number, isPublic: boolean, isAgree?: boolean) => void;
}

const CartsTableItem = observer(
  ({
    e,
    deleteFunc,
    setShowAlert,
    setUpdate,
    setOpen,
    setRes,
    agreeFunc,
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
              id: e.id,
              businessCategoryId: e.businessCategoryId as number | "",
              name: e.name,
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
          <Link to={TEHMAP_ROUTER + `/${e.id}`}>{e.name}</Link>
        </Td>

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
                if (e.isAgree) {
                  setIsAgreeBusiness(map, business, {
                    BusinessId: e.id!,
                    isAgree: false,
                  });
                } else {
                  agreeFunc(e.id!, true, true);
                }
              }}
            >
              <Checkbox size="md" colorScheme="green" isChecked={e.isAgree}>
                дозволити
              </Checkbox>
            </div>
          )}
        </Td>
      </Tr>
    );
  }
);
export default CartsTableItem;
