import React, { useState, useContext, ChangeEvent } from "react";
import { Context } from "../main";
import style from "./Input.module.css";
import CreateTractor, { TracProps } from "../modules/CreateTractor";
import CreateMachine, { MachineProps } from "../modules/CreateMachine";
import { observer } from "mobx-react-lite";
import {
  mechanicalWorkProps,
  MechanicalWorkProps,
} from "../modules/CreateCostMechanical";
import { func, InputProps } from "./Dialog";
import { createOperation, patchOperation } from "../http/requests";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Select,
  ModalBody,
  Button,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const mechanicalWorkFunc: func<MechanicalWorkProps> = function (
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
    res.idMachine == "" ||
    res.idTractor == "" ||
    res.workingSpeed == "" ||
    res.fuelConsumption == ""
  ) {
    setIsErr(true);
  } else {
    if (cell == undefined) return;
    setOpen(false);
    setCell!("");
    setRes(mechanicalWorkProps);
    res.idMachine = +res.idMachine;
    res.idTractor = +res.idTractor;
    res.workingSpeed = +res.workingSpeed;
    res.fuelConsumption = +res.fuelConsumption;
    setIsErr(false);
    if (cell == "") return;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
};

const MechanicalWork = observer(
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
  }: InputProps<MechanicalWorkProps>) => {
    const [inRes, setInRes] = useState<TracProps | MachineProps | {}>({});
    //   {
    //   nameTractor: "",
    //   brand: "",
    //   marketCost: "",
    //   depreciationPeriod: "",
    //   enginePower: "",
    //   fuelConsumption: "",
    //   numberOfPersonnel: "",
    //   gradeId: "",
    // }
    // const [machineRes, setMachineRes] = useState({});
    //   {
    //   nameMachine: "",
    //   brand: "",
    //   marketCost: "",
    //   depreciationPeriod: "",
    //   widthOfCapture: "",
    //   workingSpeed: "",
    //   numberOfServicePersonnel: "",
    //   gradeId: "",
    // }
    const [tractorOpen, setTractorOpen] = useState(false);
    const [agriculturalOpen, setAgriculturalOpen] = useState(false);
    const [inUpdate, setInUpdate] = useState(false);
    const [inIsErr, setInIsErr] = useState(false);
    const { map } = useContext(Context);
    const { id } = useParams();
    console.log(map.tractor);
    return (
      <ModalBody>
        <Box>
          <Heading as={"h4"} size="md" textAlign={"center"}>
            Внесіть данні для розрахунку
          </Heading>
          <Box mt={"15px"} w={"590px"} mx={"auto"}>
            <Box display={"flex"}>
              <Heading as={"h4"} size="sm" w={"200px"}>
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
            <Box mt={"15px"} display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"}>
                <Button
                  size="lg"
                  mt={"5px"}
                  onClick={() => {
                    if (res.idTractor) {
                      console.log(map.tractor);

                      let [second] = map.tractor.filter(
                        (el) => el.id == res.idTractor
                      );
                      console.log(second);

                      setInRes(second);
                      setInUpdate(true);
                      setTractorOpen(true);
                      console.log(1);
                    }
                  }}
                >
                  <EditIcon w={"30px"} h={"auto"} color={"blue.400"} />
                </Button>
                <Box>
                  <Heading as={"h4"} size="sm">
                    Трактор
                  </Heading>
                  <Select
                    w={"173px"}
                    size="sm"
                    value={res.idTractor}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setRes(() => {
                        const [tractor] = map.tractor.filter(
                          (el) => el.id! == +e.target.value
                        );
                        return {
                          ...res,
                          fuelConsumption: tractor.fuelConsumption,
                        };
                      });
                      setRes((prev) => ({
                        ...prev,
                        idTractor: e.target.value,
                      }));
                    }}
                  >
                    <option value="" hidden>
                      вибрати трактор
                    </option>
                    {map.tractor.map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.nameTractor}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box>
                <Heading as={"h4"} size="sm">
                  Розхід палива на 1 год
                </Heading>

                <Input
                  w={"200px"}
                  size="sm"
                  placeholder="Вкажіть розхід"
                  type="number"
                  value={res?.fuelConsumption}
                  onChange={(e) => {
                    setRes(() => {
                      return { ...res, fuelConsumption: e.target.value };
                    });
                  }}
                />
              </Box>
              <Box>
                <Button
                  w={"100px"}
                  mt={"5px"}
                  color={"blue.400"}
                  size="lg"
                  onClick={() => {
                    setTractorOpen(true);
                  }}
                >
                  додати <br /> трактор
                </Button>
              </Box>
            </Box>
            <Box mt={"15px"} display={"flex"} justifyContent={"space-between"}>
              <Box style={{ height: "min-content", margin: "auto 0 0" }}>
                <Box display={"flex"}>
                  <Button
                    mt={"5px"}
                    size="lg"
                    onClick={() => {
                      if (res.idMachine) {
                        let [second] = map.machine.filter(
                          (el) => el.id == res.idMachine
                        );
                        //@ts-ignore
                        setInRes(second);
                        setInUpdate(true);
                        setAgriculturalOpen(true);
                      }
                    }}
                  >
                    <EditIcon w={"30px"} h={"auto"} color={"blue.400"} />
                  </Button>
                  <Box>
                    <Heading as={"h4"} size="sm">
                      СГ машина
                    </Heading>
                    <Select
                      size="sm"
                      value={res.idMachine}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setRes(() => {
                          const machine = map.machine.filter(
                            (el) => el.id! == +e.target.value
                          );
                          return {
                            ...res,
                            workingSpeed: machine[0].workingSpeed,
                          };
                        });
                        setRes((prev) => ({
                          ...prev,
                          idMachine: e.target.value,
                        }));
                      }}
                    >
                      <option value="" hidden>
                        вибрати СГ машину
                      </option>
                      {map?.machine?.map((el) => (
                        <option key={el.id} value={el.id}>
                          {el.nameMachine}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Heading as={"h4"} size="sm">
                  Робоча швидкість км/год
                </Heading>
                <Input
                  size="sm"
                  placeholder="Вкажіть швидкість"
                  type="number"
                  value={res?.workingSpeed}
                  onChange={(e) => {
                    setRes({ ...res, workingSpeed: e.target.value });
                  }}
                />
              </Box>
              <Box>
                <Button
                  w={"100px"}
                  mt={"5px"}
                  color={"blue.400"}
                  size="lg"
                  onClick={() => {
                    setAgriculturalOpen(true);
                  }}
                >
                  додати <br />
                  СГ машину
                </Button>
              </Box>
            </Box>
          </Box>
          <CreateTractor
            open={tractorOpen}
            setOpen={setTractorOpen}
            res={inRes as TracProps}
            setRes={setInRes}
            update={inUpdate}
            setUpdate={setInUpdate}
            isErr={inIsErr}
            setIsErr={setInIsErr}
          />
          <CreateMachine
            open={agriculturalOpen}
            setOpen={setAgriculturalOpen}
            res={inRes as MachineProps}
            setRes={setInRes}
            update={inUpdate}
            setUpdate={setInUpdate}
            isErr={inIsErr}
            setIsErr={setInIsErr}
          />
        </Box>
        <ModalFooter p={"15px 20px"}>
          <Button
            onClick={() =>
              mechanicalWorkFunc(
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

export default MechanicalWork;
