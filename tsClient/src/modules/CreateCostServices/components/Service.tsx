import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ServiceProps, servicesProps } from "../CreateCostServices";
import { func, InputProps } from "../../../components/Dialog";
import { Context } from "../../../main";
import { useParams } from "react-router-dom";
import { createOperation, patchOperation } from "../../../http/requests";
import {
  Box,
  Heading,
  ModalBody,
  Button,
  ModalFooter,
  Input,
  Text,
} from "@chakra-ui/react";
const createServices: func<ServiceProps> = function (
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
    setRes(servicesProps);
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
const Service = observer(
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
  }: InputProps<ServiceProps>) => {
    const { map } = useContext(Context);
    const { id } = useParams();
    useEffect(() => {
      setRes({ ...res, unitsOfCost: "грн/га" });
    }, [res]);
    return (
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Внесіть дані для розрахунку
        </Heading>
        <Box
          mt={"15px"}
          display={"flex"}
          gap={3}
          alignItems={"center"}
          maxW={"490px"}
          mx={"auto"}
        >
          <Heading size="sm" minW={"max-content"}>
            Назва послуги
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
          <Heading size="sm" minW={"max-content"}>
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
            <Heading size="sm">Ціна</Heading>
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
            <Heading size="sm">Одиниці виміру ціни</Heading>
            <Input
              disabled
              size={"sm"}
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
              createServices(
                +id!,
                map,
                update,
                res,
                setIsErr,
                setOpen,
                setRes,
                cell!,
                setCell!,
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

export default Service;
