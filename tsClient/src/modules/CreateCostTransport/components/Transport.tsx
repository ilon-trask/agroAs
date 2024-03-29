import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { transportProps, TransportProps } from "../CreateCostTransport";
import { func, InputProps } from "../../../components/Dialog";
import { createOperation, patchOperation } from "../../../http/requests";
import { Context } from "../../../main";
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
  if (res.nameOper == "" || res.price == "" || res.unitsOfCost == "") {
    setIsErr(true);
  } else {
    if (cell == undefined) return;
    setOpen(false);
    setCell!("");
    setRes(transportProps);
    setIsErr(false);
    setSection!("");
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
const Transport = observer(
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
    console.log(map.maps.filter((el) => el.id == 119));

    const { id } = useParams();
    useEffect(() => {
      setRes({ ...res, unitsOfCost: "грн/га" });
    }, [res.nameOper]);
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
          gap={3}
          mt={"10px"}
          maxW={"490px"}
          alignItems={"center"}
          mx={"auto"}
        >
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Дата початку
          </Heading>
          <Input
            placeholder="Select Date and Time"
            size="sm"
            type="date"
            value={res.date}
            onChange={(e) => setRes({ ...res, date: e.target.value })}
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
        <Text w={"590px"} mx={"auto"}>
          <b>Увага!</b>
          <br />
          Одиниця виміру "ціни" тільки "грн/га"
        </Text>
      </ModalBody>
    );
  }
);

export default Transport;
