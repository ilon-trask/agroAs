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
import { BusinessProps } from "../../CreateBusiness/CreateBusinessPlan";

interface props {
  e: { id: number; name: string; label: string; children?: any };
  // deleteFunc: (BusinessId: number) => void;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  // setUpdate: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // setRes: Dispatch<SetStateAction<BusinessProps>>;
  // agreeFunc: (BusinessId: number, isPublic: boolean, isAgree?: boolean) => void;
  getData: (name: string, children: string, infCartId?: number) => void;
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

          <Td
            textAlign={"center"}
            cursor={"pointer"}
            onClick={
              user.role == ""
                ? () => setShowAlert(true)
                : () => {
                    setOpen(true);
                  }
            }
          >
            <PlusSquareIcon w={"20px"} h={"auto"} />
          </Td>

          <Td>
            {/* {(user.role == "ADMIN" ||
              user.role == "AUTHOR" ||
              user.role == "service_role") && (
              <div
                onClick={() => {
                  if (e.isPublic) {
                    setIsPublicBusiness(map, business, {
                      BusinessId: e.id!,
                      isPublic: false,
                    });
                  } else {
                    agreeFunc(e.id!, true);
                  }
                }}
              >
                <Checkbox size="md" colorScheme="green" isChecked={e.isPublic}>
                  опублікувати
                </Checkbox>
              </div>
            )} */}
          </Td>
        </Tr>
        {!!e.children &&
          props?.map((el) => {
            if (
              el != "id" &&
              el != "createdAt" &&
              el != "updatedAt" &&
              el != "businessPlanId"
            )
              if (e.children[el])
                return (
                  <Tr>
                    <Td
                      onClick={() => {
                        getData(e.label, el, e.children.id_tableInvestment);
                      }}
                      cursor={"pointer"}
                      _hover={{ color: "blue.400" }}
                    >
                      {
                        //@ts-ignore
                        names[el]
                      }
                    </Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                );
          })}
      </>
    );
  }
);
export default CartsTableItem;
