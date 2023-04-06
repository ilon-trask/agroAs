import React, { useContext, useState } from "react";
import { Context } from "../main";
import { createCart, updateMap } from "../http/requests";
import { CartProps, cartProps } from "../modules/CreateCart";
import style from "./Input.module.css";
import { func } from "./Dialog";
import { useParams } from "react-router-dom";
import { Itech_cart } from "../../../tRPC serv/models/models";
import {
  Box,
  Heading,
  Select,
  ModalBody,
  Button,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
const createCartFunc: func<cartProps> = (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes
) => {
  if (
    res.nameCart == "" ||
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
    setRes(CartProps);
    if (update) {
      updateMap(map, res as resTechCartsWithOpers);
    } else {
      createCart(map, res as Itech_cart);
    }
  }
};

type props = {
  res: cartProps;
  setRes: (res: cartProps | ((res: cartProps) => cartProps) | {}) => void;
  setIsErr: (isErr: boolean) => void;
  setOpen: (open: boolean) => void;
  update: boolean;
  noBtn?: boolean;
};

export default function MapInputs({
  res,
  setRes,
  setIsErr,
  setOpen,
  update,
  noBtn,
}: props) {
  const { map } = useContext(Context);
  const { id } = useParams();
  console.log(res);

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
          Назва культури
        </Heading>
        <Input
          placeholder="Вкажіть культуру"
          type="text"
          value={res?.nameCart}
          onChange={(e) => {
            setRes({ ...res, nameCart: e.target.value });
          }}
        />
      </Box>
      <Box display={"flex"} gap={3} mt={"15px"}>
        <div>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Площа,
            <br /> гектари
          </Heading>
          <Input
            mt={"auto"}
            placeholder="Вкажіть площу"
            type="number"
            onChange={(e) => {
              setRes({ ...res, area: e.target.value });
            }}
            value={res?.area}
          />
        </div>
        <div>
          <Heading as={"h4"} size="sm">
            Розрахункова <br /> ЗП, грн/міс
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
            Ціна ДП, <br />
            грн/л
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
        {!noBtn && (
          <Button
            onClick={() =>
              createCartFunc(+id!, map, update, res, setIsErr, setOpen, setRes)
            }
          >
            Зберегти
          </Button>
        )}
      </ModalFooter>
    </ModalBody>
  );
}
