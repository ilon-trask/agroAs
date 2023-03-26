import { loggerLink } from "@trpc/client";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Icell } from "../../../../../tRPC serv/controllers/OperService";
import { Icost_hand_work } from "../../../../../tRPC serv/models/models";
import {
  createOperation,
  patchOperation,
  patchResume,
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
import { costHandWorkProps, CostHandWorkProps } from "../CreateResume";
import MapStore from "../../../store/MapStore";
import BusinessStore from "../../../store/BusinessStore";
const createResume: (
  businessId: number,
  select: string,
  text: string,
  setIsErr: any,
  setOpen: any,
  business: BusinessStore
) => void = (businessId, select, text, setIsErr, setOpen, business) => {
  if (select == "" || text == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setIsErr(false);
    //@ts-ignore
    patchResume(business, { businessId: businessId, data: { [select]: text } });
  }
};

const Resumes = observer(
  (
    {
      // res,
      // setRes,
      // update,
      // cell,
      // setCell,
      // setOpen,
      // section,
      // setSection,
      // setIsErr,
    }
  ) => {
    const { business } = useContext(Context);
    const { id } = useParams();
    console.log(id);

    const [select, setSelect] = useState("");
    const [text, setText] = useState("");
    return (
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Резюме
        </Heading>
        <Box>
          <Select
            value={select}
            onChange={(e) => {
              setSelect(e.target.value);
            }}
          >
            <option value="" hidden disabled defaultChecked></option>
            <option value="aboutProject">Про проект</option>
            <option value="investment">Інвестиції</option>
            <option value="finIndicators">Фінансові показники</option>
            <option value="deduction">Висновки</option>
          </Select>
        </Box>
        <Box>
          <Heading as={"h4"} size="sm">
            Опишіть параграф
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
            onClick={() =>
              createResume(
                +id!,
                select,
                text,
                () => {},
                () => {
                  console.log(false);
                },
                business
              )
            }
          >
            Зберегти
          </Button>
        </ModalFooter>
      </ModalBody>
    );
  }
);

export default Resumes;
