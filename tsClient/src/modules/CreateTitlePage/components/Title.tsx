import { loggerLink } from "@trpc/client";
import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Icell } from "../../../../../tRPC serv/controllers/OperService";
import { Icost_hand_work } from "../../../../../tRPC serv/models/models";
import {
  createOperation,
  patchOperation,
  patchResume,
  patchTitlePage,
} from "../../../http/requests";
import { Context } from "../../../main";
import { func, InputProps } from "../../../components/Dialog";
import {
  Box,
  Heading,
  Select,
  ModalBody,
  Button,
  ModalFooter,
  Text,
  Input,
  Radio,
  Textarea,
} from "@chakra-ui/react";
import { costHandWorkProps, CostHandWorkProps } from "../CreateTitlePage";
import MapStore from "../../../store/MapStore";
import BusinessStore from "../../../store/BusinessStore";
const createTitle: (
  businessId: number,
  text: string,
  setIsErr: any,
  setOpen: any,
  business: BusinessStore
) => void = (businessId, text, setIsErr, setOpen, business) => {
  if (text == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setIsErr(false);
    patchTitlePage(business, { businessId, title: text });
  }
};

const Title = observer(
  ({
    setOpen,
  }: // res,
  // setRes,
  // update,
  // cell,
  // setCell,
  // section,
  // setSection,
  // setIsErr,
  {
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) => {
    const { business } = useContext(Context);
    const { id } = useParams();
    console.log(id);

    const [text, setText] = useState("");
    return (
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Титульна сторінка
        </Heading>

        <Box>
          <Heading as={"h4"} size="sm">
            Напишіть назву бізнес-плану
          </Heading>
          <Textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Box>
        <ModalFooter p={"15px 67px"}>
          <Button
            onClick={() => createTitle(+id!, text, () => {}, setOpen, business)}
          >
            Зберегти
          </Button>
        </ModalFooter>
      </ModalBody>
    );
  }
);

export default Title;
