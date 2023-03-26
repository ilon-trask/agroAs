import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteCart, setIsPublic } from "../../../http/requests";
import { Context } from "../../../main";
import { cartProps } from "../../../modules/CreateCart";
import MapStore from "../../../store/MapStore";
import { TEHMAP_ROUTER } from "../../../utils/consts";

import { Tr, Td, Checkbox, Tooltip } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Itech_cart } from "../../../../../tRPC serv/models/models";

interface props {
  e: Itech_cart;
}

const CartsTableItem = observer(({ e }: props) => {
  const { map, user } = useContext(Context);
  return (
    <Tr>
      <Td>{e.nameCart}</Td>
      <Td>{e.area}</Td>
      <Td>{Math.round(10 * (e.totalCost! * +e.area)) / 10 || "0"}</Td>
      <Td>{e.totalCost || "0"}</Td>
    </Tr>
  );
});
export default CartsTableItem;
