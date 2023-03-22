import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteCart, setIsPublic } from "../http/requests";
import { Context } from "../main";
import { cartProps } from "../modules/CreateCart";
import MapStore from "../store/MapStore";
import { TEHMAP_ROUTER } from "../utils/consts";

import { Tr, Td, Checkbox, Tooltip } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { IbusinessPlan } from "../../../tRPC serv/models/models";

interface props {
  e: IbusinessPlan;
  // setUpdate: (update: boolean) => void;
  // setOpen: (open: boolean) => void;
  // setRes: (res: cartProps) => void;
  // setShowAlert: (showAlert: boolean) => void;
  // deleteOpen: any;
  // setDeleteOpen: (deleteOpen: any) => void;
  // setPublicationOpen: ({
  //   isOpen,
  //   data: { id, isPublic },
  // }: {
  //   isOpen: boolean;
  //   data: { id: number; isPublic: boolean; agree: boolean };
  // }) => void;
}

const CartsTableItem = observer(
  ({
    e,
  }: // setUpdate,
  // setOpen,
  // setRes,
  // setShowAlert,
  // deleteOpen,
  // setDeleteOpen,
  // setPublicationOpen,
  props) => {
    const { map, user } = useContext(Context);
    return (
      <Tr key={e.id!}>
        <Td
          textAlign={"center"}
          // onClick={
          //   () => {
          //   setUpdate(true);
          //   setOpen(true);
          //   setRes({
          //     ...e,
          //   });
          // }}
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
          // onClick={
          //   user.role == ""
          //     ? () => setShowAlert(true)
          //     : () => {
          //         console.log(e.id);

          //         setDeleteOpen(() => ({
          //           ...deleteOpen,
          //           isOpen: true,
          //           cartId: e.id!,
          //           text: "карту",
          //           func: () => {
          //             // deleteCart(map, e.id!);
          //             // setDeleteOpen({ ...deleteOpen, isOpen: false });
          //           },
          //         }));
          //       }
          // }
        >
          <DeleteIcon w={"20px"} h={"auto"} />
        </Td>

        <Td>
          {(user.role == "ADMIN" ||
            user.role == "AUTHOR" ||
            user.role == "service_role") && (
            <div
            // onClick={() => {
            //   if (e.isPublic) {
            //     setIsPublic(map, { id: e.id!, isPublic: !e.isPublic });
            //   } else {
            //     setPublicationOpen({
            //       isOpen: true,
            //       data: { id: e.id!, isPublic: !e.isPublic, agree: false },
            //     });
            //   }
            // }}
            >
              <Checkbox size="md" colorScheme="green" isChecked={false}>
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
