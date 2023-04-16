import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TEJProps, tejProps } from "../CreateTEJ";
import { func, InputProps } from "../../../components/Dialog";
import { Context } from "../../../main";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  ModalBody,
  Button,
  Center,
  ModalFooter,
  Input,
  Text,
  Select,
} from "@chakra-ui/react";
import MapStore from "../../../store/MapStore";
import BusinessStore from "../../../store/BusinessStore";
import {
  createBusinessPlan,
  createTEJ,
  patchTEJ,
} from "../../../http/requests";
import TEJStore from "../../../store/TEJStore";

const CreateTEJ: (
  TEJ: TEJStore,
  update: boolean,
  setUpdate: Dispatch<SetStateAction<boolean>>,
  res: TEJProps,
  setIsErr: (isErr: boolean) => void,
  setOpen: (open: boolean) => void,
  setRes: (res: TEJProps) => void
) => void = function (TEJ, update, setUpdate, res, setIsErr, setOpen, setRes) {
  if (res.cartId == "") {
    setIsErr(true);
  } else {
    // res.cultureId = +res.cultureId;
    setOpen(false);
    setRes(tejProps);
    setUpdate(false);
    setIsErr(false);
    if (update) {
      patchTEJ(
        {
          TEJId: res.TEJId!,
          cartId: res.cartId,
          comment: res.comment,
          area: res.area,
        },
        TEJ
      );
    } else {
      createTEJ(
        {
          cartId: res.cartId,
          comment: res.comment,
        },
        TEJ
      );
    }
  }
};
const TEJ = observer(
  ({
    res,
    setRes,
    setIsErr,
    setOpen,
    update,
    setUpdate,
  }: {
    res: TEJProps;
    setRes: (res: TEJProps | ((res: TEJProps) => TEJProps)) => void;
    setIsErr: (isErr: boolean) => void;
    setOpen: (open: boolean) => void;
    update: boolean;
    setUpdate: Dispatch<SetStateAction<boolean>>;
  }) => {
    const { map, business, TEJ } = useContext(Context);

    // useEffect(() => {
    //   if (!update) {
    //     //@ts-ignore

    //     setRes({});
    //     console.log(123);
    //   }
    // }, [res]);

    return (
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Виберіть дані для розрахунку ТЕО
        </Heading>
        <Box
          mt={3}
          display={"flex"}
          alignItems={"center"}
          gap={4}
          mx={"auto"}
          w={"fit-content"}
        >
          <Box>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Виберіть карту
            </Heading>
            <Select
              size={"sm"}
              onChange={(e) => {
                setRes((prev) => ({
                  ...prev,
                  cartId: +e.target.value,
                }));
              }}
              value={res.cartId}
            >
              <option disabled hidden value="">
                Виберіть напрямок
              </option>
              {map.maps?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.nameCart +
                    "(" +
                    (el.cultivationTechnology?.name || "не визначений") +
                    ")"}
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Впишіть коментар
            </Heading>
            <Input
              value={res.comment}
              onChange={(e) => {
                setRes((prev) => ({ ...prev, comment: e.target.value }));
              }}
              size={"sm"}
            />
          </Box>
        </Box>
        <ModalFooter p={"15px 67px"}>
          <Button
            onClick={() =>
              CreateTEJ(TEJ, update, setUpdate, res, setIsErr, setOpen, setRes)
            }
          >
            Зберегти
          </Button>
        </ModalFooter>
      </ModalBody>
    );
  }
);

export default TEJ;
