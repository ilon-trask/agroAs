import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { materialsProps, MaterialsProps } from "../modules/CreateCostMaterials";
import style from "./Input.module.css";
import { func, InputProps } from "./Dialog";
import { createOperation, patchOperation } from "../http/requests";
import { Context } from "../main";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Select,
  ModalBody,
  Button,
  ModalFooter,
  Text,
  Input,
} from "@chakra-ui/react";
const createMaterials: func<MaterialsProps> = function (
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
  if (
    res.nameOper == "" ||
    res.price == "" ||
    res.consumptionPerHectare == ""
  ) {
    setIsErr(true);
  } else {
    if (cell == undefined) return;
    console.log(update);
    setOpen(false);
    setCell!("");
    setRes(materialsProps);
    setIsErr(false);
    res.consumptionPerHectare = +res.consumptionPerHectare;
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
  }: InputProps<MaterialsProps>) => {
    const { map } = useContext(Context);
    const { id } = useParams();

    return (
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Внесіть данні для розрахунку
        </Heading>
        <Box mt={"15px"}>
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            maxW={"490px"}
            mx={"auto"}
          >
            <Heading as={"h4"} size="sm" minW={"max-content"} mr={"20px"}>
              Назва операції
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
          <Box display={"flex"} justifyContent={"space-evenly"} mt={"15px"}>
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
                placeholder="Вкажіть одиниці"
                type="text"
                value={res?.unitsOfCost}
                onChange={(e) => {
                  setRes({ ...res, unitsOfCost: e.target.value });
                }}
              />
            </div>
          </Box>
          <Box display={"flex"} justifyContent={"space-evenly"} mt={"15px"}>
            <div>
              <Heading as={"h4"} size="sm">
                Розхід/кількість на 1 га
              </Heading>
              <Input
                size={"sm"}
                placeholder="Вкажіть розхід"
                type="number"
                value={res?.consumptionPerHectare}
                onChange={(e) => {
                  setRes({ ...res, consumptionPerHectare: e.target.value });
                }}
              />
            </div>
            <div>
              <Heading as={"h4"} size="sm">
                Одиниці виміру розходу
              </Heading>
              <Input
                size={"sm"}
                placeholder="Вкажіть одиниці"
                type="text"
                value={res?.unitsOfConsumption}
                onChange={(e) => {
                  setRes({ ...res, unitsOfConsumption: e.target.value });
                }}
              />
            </div>
          </Box>
        </Box>
        <ModalFooter p={"15px 67px"}>
          <Button
            onClick={() =>
              createMaterials(
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
      </ModalBody>
    );
  }
);

export default Easy;
