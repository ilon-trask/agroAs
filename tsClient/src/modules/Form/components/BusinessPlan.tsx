import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BusinessProps, businessProps } from "../FeadbackForm";
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
import { createBusinessPlan } from "../../../http/requests";

const createBusiness: (
  id: number,
  map: MapStore,
  bus: BusinessStore,
  update: boolean,
  res: BusinessProps,
  setIsErr: (isErr: boolean) => void,
  setOpen: (open: boolean) => void,
  setRes: (res: BusinessProps) => void
) => void = function (id, map, bus, update, res, setIsErr, setOpen, setRes) {
  if (res.name == "" || res.businessCategoryId == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setRes(businessProps);
    setIsErr(false);
    // if (update) {
    //   (map, res, id);
    // } else {
    createBusinessPlan(map, bus, {
      name: res.name,
      businessCategoryId: res.businessCategoryId,
    });
    // }
  }
};
const Transport = observer(
  ({
    res,
    setRes,
    setIsErr,
    setOpen,
    update,
  }: {
    res: BusinessProps;
    setRes: (
      res: BusinessProps | ((res: BusinessProps) => BusinessProps)
    ) => void;
    setIsErr: (isErr: boolean) => void;
    setOpen: (open: boolean) => void;
    update: boolean;
  }) => {
    const { map, business } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {}, [res]);
    return (
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Внесіть дані для розрахунку бізнес-плану
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
              Назва бізнес-плану
            </Heading>
            <Input
              type={"text"}
              size={"sm"}
              value={res.name}
              onChange={(e) => {
                setRes((prev) => ({ ...prev, name: e.target.value }));
              }}
            ></Input>
          </Box>
          <Box>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              напрям бізнес-плану
            </Heading>
            <Select
              size={"sm"}
              onChange={(e) => {
                setRes((prev) => ({
                  ...prev,
                  businessCategoryId: +e.target.value,
                }));
              }}
              value={res.businessCategoryId}
            >
              <option disabled hidden value="">
                Виберіть напрямок
              </option>
              {business.businessCategory?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </Select>
          </Box>
        </Box>
        <ModalFooter p={"15px 67px"}>
          <Button
            onClick={() =>
              createBusiness(
                +id!,
                map,
                business,
                update,
                res,
                setIsErr,
                setOpen,
                setRes
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

export default Transport;
