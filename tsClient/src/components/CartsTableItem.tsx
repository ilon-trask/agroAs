import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Itech_cart } from "../../../tRPC serv/models/models";
import { deleteCart, setIsPublic } from "../http/requests";
import { Context } from "../main";
import { cartProps } from "../modules/CreateCart";
import { Icart } from "../pages/MapJornal";
import MapStore from "../store/MapStore";
import { TEHMAP_ROUTER } from "../utils/consts";
import style from "./TableItem.module.css";

import { Tr, Td, Checkbox } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface props {
  e: cartProps;
  setUpdate: (update: boolean) => void;
  setOpen: (open: boolean) => void;
  setRes: (res: cartProps) => void;
  setShowAlert: (showAlert: boolean) => void;
  deleteOpen: any;
  setDeleteOpen: (deleteOpen: any) => void;
}
const td = "text-align: center;";
const CartsTableItem = observer(
  ({
    e,
    setUpdate,
    setOpen,
    setRes,
    setShowAlert,
    deleteOpen,
    setDeleteOpen,
  }: props) => {
    const { map, user } = useContext(Context);
    return (
      <Tr key={e.id!}>
        <Td
          textAlign={"center"}
          onClick={() => {
            setUpdate(true);
            setOpen(true);
            setRes({
              ...e,
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
          <Link to={TEHMAP_ROUTER + `/${e.id}`}>{e.nameCart}</Link>
        </Td>
        <Td>{e.area}</Td>
        <Td>{Math.round(10 * (e.totalCost! * +e.area)) / 10 || "0"}</Td>
        <Td>{e.totalCost || "0"}</Td>

        <Td
          textAlign={"center"}
          cursor={"pointer"}
          color={"red"}
          onClick={
            user.role == ""
              ? () => setShowAlert(true)
              : () => {
                  console.log(e.id);

                  setDeleteOpen(() => ({
                    ...deleteOpen,
                    isOpen: true,
                    cartId: e.id!,
                    text: "карту",
                    func: () => {
                      deleteCart(map, e.id!);
                      setDeleteOpen({ ...deleteOpen, isOpen: false });
                    },
                  }));
                }
          }
        >
          <DeleteIcon w={"20px"} h={"auto"} />
        </Td>

        <Td>
          {user.role == "ADMIN" && (
            <div
              onClick={() => {
                setIsPublic(map, { id: e.id!, isPublic: !e.isPublic });
              }}
            >
              <Checkbox size="md" colorScheme="green" isChecked={!!e.isPublic}>
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
