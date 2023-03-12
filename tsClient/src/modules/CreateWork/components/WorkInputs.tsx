import React, { useContext, useState } from "react";
import { Context } from "../../../main";
import {
  createCart,
  createWork,
  patchWork,
  updateMap,
} from "../../../http/requests";
import { WorkProps, workProps } from "..//CreateWork";
import { func } from "../../../components/Dialog";
import { useParams } from "react-router-dom";
import {
  Ispecial_work,
  Itech_cart,
} from "../../../../../tRPC serv/models/models";
import {
  Box,
  Heading,
  Select,
  ModalBody,
  Button,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
const createWorkFunc: func<workProps> = (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes
) => {
  if (
    res.nameWork == "" ||
    res.area == "" ||
    res.salary == "" ||
    res.priceDiesel == ""
  ) {
    setIsErr(true);
  } else {
    setIsErr(false);
    setOpen(false);
    res.area = +res.area;
    res.salary = +res.salary;
    res.priceDiesel = +res.priceDiesel;
    setRes(WorkProps);
    if (update) {
      patchWork(map, res);
    } else {
      createWork(map, res as Ispecial_work);
    }
  }
};

type props = {
  res: workProps;
  setRes: (res: workProps | ((res: workProps) => workProps) | {}) => void;
  setIsErr: (isErr: boolean) => void;
  setOpen: (open: boolean) => void;
  update: boolean;
};

export default function WorkInputs({
  res,
  setRes,
  setIsErr,
  setOpen,
  update,
}: props) {
  const { map } = useContext(Context);
  const { id } = useParams();
  return (
    <ModalBody>
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Загальні показники для розрахунку
      </Heading>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={3}
        mx={"auto"}
        mt={"15px"}
      >
        <Heading as={"h4"} size="sm" minW={"max-content"}>
          Назва роботи
        </Heading>
        <Input
          placeholder="Вкажіть назву"
          type="text"
          value={res?.nameWork}
          onChange={(e) => {
            setRes({ ...res, nameWork: e.target.value });
          }}
        />
      </Box>
      <Box display={"flex"} gap={3} mt={"15px"}>
        <div>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Площа, га
          </Heading>
          <Input
            placeholder="Вкажіть площу"
            type="number"
            onChange={(e) => {
              setRes({ ...res, area: e.target.value });
            }}
            value={res?.area}
          />
        </div>
        <div>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Розрахункова ЗП, грн
          </Heading>
          <Input
            placeholder="Вкажіть ЗП"
            type="number"
            onChange={(e) => {
              setRes({ ...res, salary: e.target.value });
            }}
            value={res?.salary}
          />
        </div>
        <div>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Ціна ДП, грн
          </Heading>
          <Input
            placeholder="Вкажіть ціну ДП"
            type="number"
            onChange={(e) => {
              setRes({ ...res, priceDiesel: e.target.value });
            }}
            value={res?.priceDiesel}
          />
        </div>
      </Box>
      <ModalFooter p={"15px 5px"}>
        <Button
          onClick={() =>
            createWorkFunc(+id!, map, update, res, setIsErr, setOpen, setRes)
          }
        >
          Зберегти
        </Button>
      </ModalFooter>
    </ModalBody>
  );
}
