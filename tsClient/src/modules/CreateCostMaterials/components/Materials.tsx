import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { materialsProps, MaterialsProps } from "../CreateCostMaterials";
import style from "./Input.module.css";
import { func, InputProps } from "../../../components/Dialog";
import { createOperation, patchOperation } from "../../../http/requests";
import { Context } from "../../../main";
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
    res.consumptionPerHectare == "" ||
    res.unitsOfCost == "" ||
    res.unitsOfConsumption == ""
  ) {
    setIsErr(true);
  } else {
    if (cell == undefined) return;
    setOpen(false);
    setCell!("");
    setRes(materialsProps);
    setIsErr(false);
    setSection!("");
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

const Materials = observer(
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
          Внесіть дані для розрахунку
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
              Назва матеріалу
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
            justifyContent={"space-evenly"}
            alignItems={"center"}
            maxW={"490px"}
            mx={"auto"}
            mt={"10px"}
          >
            <Heading as={"h4"} size="sm" minW={"max-content"} mr={"20px"}>
              Дата використання
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
                placeholder="Вкажіть одиниці"
                type="text"
                value={res?.unitsOfCost}
                onChange={(e) => {
                  setRes({ ...res, unitsOfCost: e.target.value });
                }}
              />
            </div>
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
        <Text w={"590px"} mx={"auto"}>
          <b>Увага!</b>
          <br />
          Одиниці виміру "ціни" повинні відповідати одиницям виміру "розходу"
          <br />
          Наприклад (грн/кг) відповідає (кг/га) або (грн/шт) відповідає (шт/га)
        </Text>
      </ModalBody>
    );
  }
);

export default Materials;
