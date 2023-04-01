import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Itech_cart } from "../../../../../tRPC serv/models/models";
// import { deleteCart, setIsPublic } from "../http/requests";
import { Context } from "../../../main";
import { cartProps } from "../../CreateCart";
import { TEHMAP_ROUTER } from "../../../utils/consts";

import { Tr, Td, Checkbox } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { setIsPublic } from "../../../http/requests";

interface props {
  e: Itech_cart;
  setOpen: (open: boolean) => void;
  setRes: (res: Itech_cart) => void;
  setPublicationOpen: ({
    isOpen,
    data: { id, isPublic, agree },
  }: {
    isOpen: boolean;
    data: { id: number; isPublic: boolean; agree: boolean };
  }) => void;
}

const CartsTableItem = observer(
  ({ e, setOpen, setRes, setPublicationOpen }: props) => {
    const { map, user } = useContext(Context);
    const [cultural] = map.cultural.filter((el) => el.id == e.culturesTypeId);

    return (
      <Tr key={e.id!}>
        <Td>
          <Link to={TEHMAP_ROUTER + `/${e.id}`}>{e.nameCart}</Link>
        </Td>
        <Td>{e.area}</Td>
        <Td>{Math.round(10 * (e.costHectare! * +e.area)) / 10 || "0"}</Td>
        <Td>{e.costHectare || "0"}</Td>
        <Td>{e.authorName || "нема"}</Td>
        <Td>{cultural?.nameCulture || "нема"}</Td>

        <Td
          textAlign={"center"}
          cursor={"pointer"}
          color={"red"}
          onClick={() => {
            setIsPublic(map, { id: e.id!, isPublic: false });
          }}
        >
          <DeleteIcon w={"20px"} h={"auto"} />
        </Td>

        <Td>
          <div
            onClick={() => {
              setPublicationOpen({
                isOpen: true,
                data: { id: e.id!, isPublic: true, agree: true },
              });
            }}
          >
            <Checkbox size="md" colorScheme="green" isChecked={e.isAgree}>
              дозволити
            </Checkbox>
          </div>
        </Td>
      </Tr>
    );
  }
);
export default CartsTableItem;
