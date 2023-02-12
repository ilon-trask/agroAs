import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { transportProps, TransportProps } from "../modules/CreateCostTransport";
import { func, InputProps } from "./Dialog";
import { createOperation, patchOperation } from "../http/requests";
import { Context } from "../main";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Center,
  ModalFooter,
  Input,
  Text,
} from "@chakra-ui/react";
const createTransport: func<TransportProps> = function (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes,
  cell,
  setCell,
  section,
  setSection
) {
  if (res.nameOper == "" || res.price == "") {
    setIsErr(true);
  } else {
    if (cell == undefined) return;
    setOpen(false);
    setCell!("");
    setRes(transportProps);
    setIsErr(false);
    res.price = +res.price;
    if (cell == "") return;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
};
const Easy = observer(
  ({
    res,
    setRes,
    cell,
    section,
    setCell,
    setIsErr,
    setOpen,
    setSection,
    update,
  }: InputProps<TransportProps>) => {
    const { map } = useContext(Context);
    const { id } = useParams();
    useEffect(() => {
      setRes({ ...res, unitsOfCost: "грн/га" });
    }, [res]);
    return (
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Внесіть дані для розрахунку транспортування
        </Heading>
        <Box
          display={"flex"}
          gap={3}
          mt={"15px"}
          maxW={"490px"}
          alignItems={"center"}
          mx={"auto"}
        >
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Назва робіт
          </Heading>
          <Input
            size={"sm"}
            placeholder="Вкажіть назву"
            type="text"
            value={res?.nameOper}
            onChange={(e) => {
              setRes({ ...res, nameOper: e.target.value });
            }}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          mt={"15px"}
          maxW={"490px"}
          mx={"auto"}
        >
          <div>
            <Heading as={"h4"} size="sm">
              Ціна
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть ціну"
              type="number"
              value={res?.price}
              onChange={(e) => {
                setRes({ ...res, price: e.target.value });
              }}
            />
          </div>
          <div>
            <Heading as={"h4"} size="sm">
              Одиниці виміру ціни
            </Heading>
            <Input
              size={"sm"}
              disabled
              placeholder="Вкажіть одиниці"
              type="text"
              value={res?.unitsOfCost}
              onChange={(e) => {
                setRes({ ...res, unitsOfCost: e.target.value });
              }}
            />
          </div>
        </Box>
        <ModalFooter p={"15px 67px"}>
          <Button
            onClick={() =>
              createTransport(
                +id!,
                map,
                update,
                res,
                setIsErr,
                setOpen,
                setRes,
                cell,
                setCell,
                section,
                setSection
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

export default Easy;
