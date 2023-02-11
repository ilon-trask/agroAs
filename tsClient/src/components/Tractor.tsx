import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Itractor } from "../../../tRPC serv/models/models";
import { createTractor, patchTractor } from "../http/requests";
import { Context } from "../main";
import { tracProps, TracProps } from "../modules/CreateTractor";
import { func } from "./Dialog";
import {
  Box,
  Heading,
  Select,
  ModalBody,
  Button,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
const createTrac: func<TracProps> = function (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes
) {
  if (
    res.nameTractor == "" ||
    res.marketCost == "" ||
    res.depreciationPeriod == "" ||
    res.enginePower == "" ||
    res.fuelConsumption == "" ||
    res.numberOfPersonnel == ""
  ) {
    setIsErr(true);
  } else {
    res.marketCost = +res.marketCost;
    res.depreciationPeriod = +res.depreciationPeriod;
    res.enginePower = +res.enginePower;
    res.fuelConsumption = +res.fuelConsumption;
    res.numberOfPersonnel = +res.numberOfPersonnel;
    res.gradeId = +res.gradeId;
    setOpen(false);
    setRes(tracProps);
    setIsErr(false);
    if (update) {
      patchTractor(map, res as Itractor);
    } else {
      createTractor(map, res as Itractor);
    }
  }
};

type props = {
  res: TracProps;
  setRes: (res: TracProps | ((res: TracProps) => TracProps) | {}) => void;
  setIsErr: (isErr: boolean) => void;
  setOpen: (open: boolean) => void;
  update: boolean;
};
const CreateTractor = ({ res, setRes, setIsErr, setOpen, update }: props) => {
  const { map } = useContext(Context);
  const { id } = useParams();
  return (
    <ModalBody>
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Внесіть данні для трактора
      </Heading>
      <Box mt={"15px"}>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <div>
            <Heading as={"h4"} size="sm">
              Назва трактора
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть назву"
              type="text"
              value={res?.nameTractor}
              onChange={(e) => {
                setRes({ ...res, nameTractor: e.target.value });
              }}
            />
          </div>
          <div>
            <Heading as={"h4"} size="sm">
              Марка трактора
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть марку"
              type="text"
              value={res?.brand}
              onChange={(e) => {
                setRes({ ...res, brand: e.target.value });
              }}
            />
          </div>
        </Box>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <div>
            <Heading as={"h4"} size="sm">
              Ціна трактора грн
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть ціну"
              type="number"
              value={res?.marketCost}
              onChange={(e) => {
                setRes({ ...res, marketCost: e.target.value });
              }}
            />
          </div>
          <div>
            <Heading as={"h4"} size="sm">
              Термін амортизації в роках
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть термін"
              type="number"
              value={res?.depreciationPeriod}
              onChange={(e) => {
                setRes({ ...res, depreciationPeriod: e.target.value });
              }}
            />
          </div>
        </Box>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <div>
            <Heading as={"h4"} size="sm">
              Потужність двигуна кВт
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть потіжність"
              type="number"
              value={res?.enginePower}
              onChange={(e) => {
                setRes({ ...res, enginePower: e.target.value });
              }}
            />
          </div>
          <div>
            <Heading as={"h4"} size="sm">
              Розхід палива на 1 год
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть розхід"
              type="number"
              value={res?.fuelConsumption}
              onChange={(e) => {
                setRes({ ...res, fuelConsumption: e.target.value });
              }}
            />
          </div>
        </Box>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <div>
            <Heading as={"h4"} size="sm">
              Кількість персоналу
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть кількість"
              type="number"
              value={res?.numberOfPersonnel}
              onChange={(e) => {
                setRes({ ...res, numberOfPersonnel: e.target.value });
              }}
            />
          </div>
          <div>
            <Heading as={"h4"} size="sm">
              Розряд роботи
            </Heading>
            <Select
              size={"sm"}
              value={res.gradeId}
              onChange={(e) => {
                setRes({ ...res, gradeId: e.target.value });
              }}
            >
              <option selected disabled hidden value="">
                Виберіть тип роботи
              </option>
              {map.grade.map((el) => (
                <option value={el.id}>{el.indicator}</option>
              ))}
            </Select>
          </div>
        </Box>
      </Box>
      <ModalFooter p={"15px 67px"}>
        <Button
          onClick={() =>
            createTrac(+id!, map, update, res, setIsErr, setOpen, setRes)
          }
        >
          Зберегти
        </Button>
      </ModalFooter>
    </ModalBody>
  );
};

export default CreateTractor;
