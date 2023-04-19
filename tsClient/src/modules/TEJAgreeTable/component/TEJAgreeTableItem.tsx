import { observer } from "mobx-react-lite";
import React, { FC, useContext, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import {
  deleteCart,
  setIsAgreeBusiness,
  setIsAgreeTEJ,
  setIsPublic,
  setIsPublicBusiness,
} from "../../../http/requests";
import { Context } from "../../../main";
import { cartProps } from "../../CreateCart";
import MapStore from "../../../store/MapStore";
import { BUSINESSpLAN_ROUTER, TEHMAP_ROUTER } from "../../../utils/consts";

import { Tr, Td, Checkbox, Tooltip } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { resTechnologicalEconomicJustification } from "../../../../../tRPC serv/controllers/TEJService";
interface props {
  e: resTechnologicalEconomicJustification;
  TEJPubOpenFunc: (
    TEJId: number,
    isPublic: boolean,
    isAgree: boolean,
    authorName: string,
    publicComment: string
  ) => void;
}

const TEJAgreeTableItem = observer(({ e, TEJPubOpenFunc }: props) => {
  const { TEJ, user } = useContext(Context);
  return (
    <Tr key={e.id!}>
      <Td>
        <Link to={BUSINESSpLAN_ROUTER + `/${e.id}`}>{e.culture.name}</Link>
      </Td>
      <Td>{e.cultivationTechnology.name}</Td>
      <Td>{e.publicComment}</Td>

      <Td
        textAlign={"center"}
        cursor={"pointer"}
        color={"red"}
        onClick={() => {
          setIsAgreeTEJ(TEJ, {
            publicComment: e.publicComment,
            authorName: e.authorName!,
            isPublic: false,
            TEJId: e.id!,
            isAgree: false,
          });
        }}
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
                setIsAgreeTEJ(TEJ, {
                  publicComment: e.publicComment,
                  authorName: e.authorName!,
                  isPublic: false,
                  TEJId: e.id!,
                  isAgree: false,
                });
              } else {
                TEJPubOpenFunc(
                  e.id!,
                  e.isPublic!,
                  !e.isAgree!,
                  e.authorName!,
                  e.publicComment!
                );
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
});
export default TEJAgreeTableItem;
