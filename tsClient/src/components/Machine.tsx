import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Imachine } from "../../../tRPC serv/models/models";
import { createMachine, patchMachine } from "../http/requests";
import { Context } from "../main";
import { CostHandWorkProps } from "../modules/CreateCostHandWork";
import { machineProps, MachineProps } from "../modules/CreateMachine";
import { func, InputProps } from "./Dialog";
import {
  Box,
  Heading,
  Select,
  ModalBody,
  Button,
  ModalFooter,
  Input,
} from "@chakra-ui/react";

const createMachineFunc: func<MachineProps> = function (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes
) {
  if (
    res.nameMachine == "" ||
    res.brand == "" ||
    res.marketCost == "" ||
    res.depreciationPeriod == "" ||
    res.widthOfCapture == "" ||
    res.workingSpeed == ""
  ) {
    setIsErr(true);
  } else {
    setOpen(false);
    setRes(machineProps);
    setIsErr(false);
    res.marketCost = +res.marketCost;
    res.depreciationPeriod = +res.depreciationPeriod;
    res.widthOfCapture = +res.widthOfCapture;
    res.workingSpeed = +res.workingSpeed;
    res.numberOfServicePersonnel = +res.numberOfServicePersonnel;
    res.gradeId = +res.gradeId;
    if (update) {
      patchMachine(map, res as Imachine);
    } else {
      createMachine(map, res as Imachine);
    }
  }
};
type props = {
  res: MachineProps;
  setRes: (
    res: MachineProps | ((res: MachineProps) => MachineProps) | {}
  ) => void;
  setIsErr: (isErr: boolean) => void;
  setOpen: (open: boolean) => void;
  update: boolean;
};
function CreateAgriculturalMachine({
  res,
  setRes,
  setIsErr,
  setOpen,
  update,
}: props) {
  const { map } = useContext(Context);
  const { id } = useParams();
  return (
    <ModalBody>
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Внесіть дані для СГ машини
      </Heading>
      <Box mt={"15px"}>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <div>
            <Heading as={"h4"} size="sm">
              Назва СГ машини
            </Heading>
            <Input
              w={"215px"}
              size={"sm"}
              placeholder="Вкажіть назву"
              type="text"
              value={res?.nameMachine}
              onChange={(e) => {
                setRes({ ...res, nameMachine: e.target.value });
              }}
            />
          </div>
          <div>
            <Heading as={"h4"} size="sm">
              Марка СГ машини
            </Heading>
            <Input
              w={"215px"}
              size={"sm"}
              placeholder="Вкажіть марку"
              type="text"
              value={res?.brand}
              onChange={(e) => {
                setRes({ ...res, brand: e.target.value });
              }}
            />
          </div>
        </Box>{" "}
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <div>
            <Heading as={"h4"} size="sm">
              Ціна СГ машини грн
            </Heading>
            <Input
              w={"215px"}
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
              Термін амортизації в роках{" "}
            </Heading>
            <Input
              w={"215px"}
              size={"sm"}
              placeholder="Вкажіть термін"
              type="number"
              value={res?.depreciationPeriod}
              onChange={(e) => {
                setRes({ ...res, depreciationPeriod: e.target.value });
              }}
            />
          </div>
        </Box>{" "}
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <div>
            <Heading as={"h4"} size="sm">
              Ширина захвату
            </Heading>
            <Input
              w={"215px"}
              size={"sm"}
              placeholder="Вкажіть потіжність"
              type="number"
              step="0.01"
              value={res?.widthOfCapture}
              onChange={(e) => {
                setRes({ ...res, widthOfCapture: e.target.value });
              }}
            />
          </div>
          <div>
            <Heading as={"h4"} size="sm">
              Робоча швидкість
            </Heading>
            <Input
              w={"215px"}
              size={"sm"}
              placeholder="Вкажіть потіжність"
              type="number"
              value={res?.workingSpeed}
              onChange={(e) => {
                setRes({ ...res, workingSpeed: e.target.value });
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
              w={"215px"}
              size={"sm"}
              placeholder="Вкажіть кількість"
              type="number"
              value={res?.numberOfServicePersonnel}
              onChange={(e) => {
                setRes({ ...res, numberOfServicePersonnel: e.target.value });
              }}
            />
          </div>
          <div>
            <Heading as={"h4"} size="sm">
              Розряд роботи
            </Heading>
            <Select
              w={"215px"}
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
            createMachineFunc(+id!, map, update, res, setIsErr, setOpen, setRes)
          }
        >
          Зберегти
        </Button>
      </ModalFooter>
    </ModalBody>
  );
}

export default CreateAgriculturalMachine;
