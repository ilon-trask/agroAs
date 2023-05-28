import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteWork, setIsPublic } from "../../../http/requests";
import { Context } from "../../../main";
import { workProps } from "../../CreateWork";

import { Tr, Td, Checkbox } from "@chakra-ui/react";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";

interface props {
  e: workProps;
  setUpdate: (update: boolean) => void;
  setOpen: (open: boolean) => void;
  setRes: (res: workProps) => void;
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
              workId: e.id!,
              ...e,
            });
          }}
        >
          <MyEditIcon />
        </Td>
        <Td>
          {/* <Link 
              to={TEHMAP_ROUTER + `/${e.id}`}
        > */}
          {e.nameWork}
          {/* </Link> */}
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
                    text: "спеціалізовану роботу",
                    func: () => {
                      deleteWork(map, e.id!);
                      setDeleteOpen({ ...deleteOpen, isOpen: false });
                    },
                  }));
                }
          }
        >
          <MyDeleteIcon />
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
