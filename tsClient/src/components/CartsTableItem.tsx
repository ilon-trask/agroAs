import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { deleteCart, setIsPublic } from "../http/requests";
import { Context } from "../main";
import { cartProps } from "../modules/CreateCart";
import { TEHMAP_ROUTER, TEJ_ROUTER } from "../utils/consts";

import { Tr, Td, Checkbox, Tooltip } from "@chakra-ui/react";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import MyViewIcon from "src/ui/Icons/MyViewIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";

interface props {
  e: resTechCartsWithOpers;
  setUpdate: (update: boolean) => void;
  setOpen: (open: boolean) => void;
  setRes: (res: cartProps) => void;
  setShowAlert: (showAlert: boolean) => void;
  deleteOpen: any;
  setDeleteOpen: (deleteOpen: any) => void;
  setPublicationOpen: ({
    isOpen,
    data: { id, isPublic },
  }: {
    isOpen: boolean;
    data: { id: number; isPublic: boolean; agree: boolean };
  }) => void;
  isCul?: boolean;
}

const CartsTableItem = observer(
  ({
    e,
    setUpdate,
    setOpen,
    setRes,
    setShowAlert,
    deleteOpen,
    setDeleteOpen,
    setPublicationOpen,
    isCul,
  }: props) => {
    const { map, user, TEJ } = useContext(Context);
    const myTEJ = TEJ.justification.find((el) => el.techCartId == e.id);
    return (
      <Tr key={e.id!}>
        <Td
          onClick={() => {
            setUpdate(true);
            setOpen(true);
            setRes({
              ...e,
              sectionId: e.sectionId!,
            });
          }}
        >
          <MyEditIcon />
        </Td>
        {isCul && (
          <>
            <Td>
              {
                map.cultivationTechnologies.find(
                  (el) => el?.id == e?.cultivationTechnologyId
                )?.name
              }
            </Td>
            <Td>{e.year}</Td>
          </>
        )}
        <Td>
          <Link to={TEHMAP_ROUTER + `/${e.id}`}>
            <MyViewIcon /> {e.nameCart}
          </Link>
        </Td>
        <Td>{e.area}</Td>
        <Td>{Math.round(10 * (e.costHectare! * +e.area)) / 10 || "0"}</Td>
        <Td>{e.costHectare || "0"}</Td>
        <Td>
          <Link to={TEJ_ROUTER + "/" + e.id!}>
            <MyViewIcon /> ТЕП
          </Link>
        </Td>
        {!isCul && (
          <Td
            onClick={
              user.role == ""
                ? () => setShowAlert(true)
                : () => {
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
            <MyDeleteIcon />
          </Td>
        )}

        {!isCul && (
          <Td>
            {(user.role == "ADMIN" ||
              user.role == "AUTHOR" ||
              user.role == "service_role") && (
              <div
                onClick={() => {
                  if (e.isPublic) {
                    setIsPublic(map, { id: e.id!, isPublic: !e.isPublic });
                  } else {
                    setPublicationOpen({
                      isOpen: true,
                      data: { id: e.id!, isPublic: !e.isPublic, agree: false },
                    });
                  }
                }}
              >
                <Checkbox size="md" colorScheme="green" isChecked={e.isPublic}>
                  опублікувати
                </Checkbox>
              </div>
            )}
          </Td>
        )}
      </Tr>
    );
  }
);
export default CartsTableItem;
