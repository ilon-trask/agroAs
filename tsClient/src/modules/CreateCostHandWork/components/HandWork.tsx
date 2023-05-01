import { loggerLink } from "@trpc/client";
import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Icell } from "../../../../../tRPC serv/controllers/OperService";
import { Icost_hand_work } from "../../../../../tRPC serv/models/models";
import { createOperation, patchOperation } from "../../../http/requests";
import { Context } from "../../../main";
import { func, InputProps } from "../../../components/Dialog";
import {
  Box,
  Heading,
  Select,
  ModalBody,
  Button,
  ModalFooter,
  Text,
  Input,
  Radio,
} from "@chakra-ui/react";
import { costHandWorkProps, CostHandWorkProps } from "../CreateCostHandWork";

const createCostHandWorkFunc: func<CostHandWorkProps> = (
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
) => {
  if (
    res.nameOper == "" ||
    (res.productionRateTime == "" &&
      (res.productionRateWeight == "" || res.yieldСapacity == "") &&
      (res.productionRateAmount == "" || res.spending == "")) ||
    res.gradeId == ""
  ) {
    setIsErr(true);
  } else {
    if (cell == undefined) return;
    setOpen(false);
    setCell!("");
    setRes(costHandWorkProps);
    setSection!("");
    setIsErr(false);
    setSection!("");
    res.spending = +res.spending!;
    res.yieldСapacity = +res.yieldСapacity!;
    res.gradeId = +res.gradeId!;
    res.productionRateAmount = +res.productionRateAmount!;
    res.productionRateTime = +res.productionRateTime!;
    res.productionRateWeight = +res.productionRateWeight!;

    if (res.type == 1) {
      res.productionRateAmount = 0;
      res.productionRateWeight = 0;
      res.yieldСapacity = 0;
      res.spending = 0;
    } else if (res.type == 2) {
      res.productionRateAmount = 0;
      res.productionRateTime = 0;
      res.spending = 0;
    } else if (res.type == 3) {
      res.productionRateTime = 0;
      res.productionRateWeight = 0;
      res.yieldСapacity = 0;
    }
    if (cell == "") return;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
};

const HandWork = observer(
  ({
    res,
    setRes,
    update,
    cell,
    setCell,
    setOpen,
    section,
    setSection,
    setIsErr,
  }: InputProps<CostHandWorkProps>) => {
    const { map } = useContext(Context);
    const { id } = useParams();
    console.log(res);
    console.log(res.productionRateAmount);

    return (
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Внесіть дані для розрахунку
        </Heading>
        <Box
          display={"flex"}
          maxW={"490px"}
          mx={"auto"}
          mt={"10px"}
          gap={3}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Heading as={"h4"} size="sm" minW={"max-content"} mx={"auto"}>
            Назва операції
          </Heading>
          <Input
            size={"sm"}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRes({ ...res, nameOper: e.target.value });
            }}
            value={res?.nameOper}
            placeholder="Вкажіть назву операції"
          />
        </Box>
        <Box
          display={"flex"}
          gap={3}
          maxW={"490px"}
          mt={"10px"}
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
          maxW={"490px"}
          mx={"auto"}
          mt={"10px"}
          gap={3}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Heading as={"h4"} size="sm" minW={"max-content"} mx={"auto"}>
            Розряд робіт
          </Heading>
          <Select
            size={"sm"}
            value={res?.gradeId}
            onChange={(e) => {
              setRes({ ...res, gradeId: +e.target.value });
            }}
          >
            <option value="" selected disabled hidden>
              Виберіть розряд робіт
            </option>
            {map.grade.map((el) => (
              <option value={el.id}>{el.indicator}</option>
            ))}
          </Select>
        </Box>

        <Box display={"flex"} mt={"15px"} maxW={"490px"} mx={"auto"}>
          <Radio
            color={"gray.400"}
            mr={"5px"}
            defaultChecked
            size={"lg"}
            isChecked={res?.type == 1}
            onClick={() => {
              setRes({
                ...res,
                type: 1,
                productionRateAmount: "",
                productionRateWeight: "",
                yieldСapacity: "",
                spending: "",
              });
            }}
          />
          <Box
            onClick={() => {
              setRes({
                ...res,
                type: 1,
                productionRateAmount: "",
                productionRateWeight: "",
                yieldСapacity: "",
                spending: "",
              });
            }}
          >
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Норма виробітку годин
            </Heading>
            <Box display={"flex"}>
              <Input
                size={"sm"}
                value={res.productionRateTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRes({ ...res, productionRateTime: e.target.value });
                }}
                type="number"
                disabled={res.type !== 1}
              />
              <Heading as={"h4"} size="sm" minW={"max-content"}>
                м²/год
              </Heading>
            </Box>
          </Box>
        </Box>
        <Box
          justifyContent={"center"}
          mt={"15px"}
          display={"flex"}
          maxW={"490px"}
          mx={"auto"}
          onClick={() => {
            setRes({
              ...res,
              type: 2,
              productionRateAmount: "",
              productionRateTime: "",
              spending: "",
            });
          }}
        >
          <Radio
            color={"gray.400"}
            mr={"5px"}
            size={"lg"}
            isChecked={res.type == 2}
            onClick={() => {
              setRes({
                ...res,
                type: 2,
                productionRateAmount: "",
                productionRateTime: "",
                spending: "",
              });
            }}
          />
          <div>
            <Box display={"flex"} gap={"15px"}>
              <div>
                <Heading as={"h4"} size="sm" minW={"max-content"}>
                  Норма виробітку ваги
                </Heading>
                <Box display={"flex"}>
                  <Input
                    size={"sm"}
                    value={res.productionRateWeight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRes({
                        ...res,
                        productionRateWeight: e.target.value,
                      });
                    }}
                    type="number"
                    disabled={res.type !== 2}
                  />
                  <Heading as={"h4"} size="sm" minW={"max-content"}>
                    кг/год
                  </Heading>
                </Box>
              </div>
              <div>
                <Heading as={"h4"} size="sm" minW={"max-content"}>
                  Урожайність з 1 га
                </Heading>
                <Box display={"flex"}>
                  <Input
                    size={"sm"}
                    value={res.yieldСapacity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRes({ ...res, yieldСapacity: e.target.value });
                    }}
                    type="number"
                    disabled={res.type !== 2}
                  />
                  <Heading as={"h4"} size="sm" minW={"max-content"}>
                    кг/га
                  </Heading>
                </Box>
              </div>
            </Box>
          </div>
        </Box>
        <Box
          justifyContent={"center"}
          mt={"10px"}
          display={"flex"}
          maxW={"490px"}
          mx={"auto"}
          onClick={() => {
            setRes({
              ...res,
              type: 3,
              productionRateTime: "",
              productionRateWeight: "",
              yieldСapacity: "",
            });
          }}
        >
          <Radio
            color={"gray.400"}
            mr={"5px"}
            size={"lg"}
            isChecked={res.type == 3}
            onClick={() => {
              setRes({
                ...res,
                type: 3,
                productionRateTime: "",
                productionRateWeight: "",
                yieldСapacity: "",
              });
            }}
          />
          <div>
            <Box display={"flex"} gap={"15px"}>
              <div>
                <Heading as={"h4"} size="sm" minW={"max-content"}>
                  Норма виробітку кількість
                </Heading>
                <Box display={"flex"}>
                  <Input
                    size={"sm"}
                    value={res.productionRateAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRes({
                        ...res,
                        productionRateAmount: e.target.value,
                      });
                    }}
                    type="number"
                    disabled={res.type !== 3}
                  />
                  <Heading as={"h4"} size="sm" minW={"max-content"}>
                    шт/год
                  </Heading>
                </Box>
              </div>
              <div>
                <Heading as={"h4"} size="sm" minW={"max-content"}>
                  Розхід на 1 га
                </Heading>
                <Box display={"flex"}>
                  <Input
                    size={"sm"}
                    value={res.spending}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRes({ ...res, spending: e.target.value });
                    }}
                    type="number"
                    disabled={res.type !== 3}
                  />
                  <Heading as={"h4"} size="sm" minW={"max-content"}>
                    шт/га
                  </Heading>
                </Box>
              </div>
            </Box>
          </div>
        </Box>
        <ModalFooter p={"15px 67px"}>
          <Button
            onClick={() =>
              createCostHandWorkFunc(
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

export default HandWork;
