import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteCart, setIsBasicCart, setIsPublic } from "../http/requests";
import { Context } from "../main";
import { cartProps } from "../modules/CreateCart";
import MapStore from "../store/MapStore";
import { TEHMAP_ROUTER } from "../utils/consts";

import { Tr, Td, Checkbox, Tooltip } from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  QuestionOutlineIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";

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
    const { map, user } = useContext(Context);
    // console.log(e);

    return (
      <Tr key={e.id!}>
        <Td
          textAlign={"center"}
          onClick={() => {
            setUpdate(true);
            setOpen(true);
            setRes({
              ...e,
              sectionId: e.sectionId!,
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
            <ViewIcon boxSize={5} color={"blue.400"} /> {e.nameCart}
          </Link>
        </Td>
        <Td>{e.area}</Td>
        <Td>{Math.round(10 * (e.costHectare! * +e.area)) / 10 || "0"}</Td>
        <Td>{e.costHectare || "0"}</Td>
        {!isCul && (
          <Td
            textAlign={"center"}
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
            <DeleteIcon
              w={"20px"}
              h={"auto"}
              color={"red"}
              cursor={"pointer"}
            />
          </Td>
        )}
        {isCul && (
          <Td>
            <div
              onClick={() =>
                setIsBasicCart(map, { cartId: e.id!, isBasic: !e.isBasic })
              }
            >
              <Checkbox size="md" colorScheme="green" isChecked={!!e.isBasic}>
                до бізнес-плану
              </Checkbox>
            </div>
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
