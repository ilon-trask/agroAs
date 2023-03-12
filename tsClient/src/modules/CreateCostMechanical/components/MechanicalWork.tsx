import React, { useState, useContext, ChangeEvent } from "react";
import { Context } from "../../../main";
import CreateTractor, { TracProps } from "../../CreateTractor/CreateTractor";
import CreateMachine, { MachineProps } from "../../CreateMachine/CreateMachine";
import { observer } from "mobx-react-lite";
import {
  mechanicalWorkProps,
  MechanicalWorkProps,
} from "../CreateCostMechanical";
import { func, InputProps } from "../../../components/Dialog";
import {
  createOperation,
  getCopyMachine,
  getCopyTractors,
  patchOperation,
} from "../../../http/requests";
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
import CopyTractorPopUp from "../../CopyTractorPopUp";
import CopyMachinePopUp from "../../CopyMachinePopUp";

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
    setSection!("");
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

interface MechanicalWorkComProps extends InputProps<MechanicalWorkProps> {
  setShowAlert: (showAlert: boolean) => void;
}

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
    setShowAlert,
  }: MechanicalWorkComProps) => {
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
    const [copyTractorOpen, setCopyTractorOpen] = useState(false);
    const [copyMachineOpen, setCopyMachineOpen] = useState(false);
    const [agriculturalOpen, setAgriculturalOpen] = useState(false);
    const [inUpdate, setInUpdate] = useState(false);
    const [inIsErr, setInIsErr] = useState(false);
    const { map, user } = useContext(Context);
    const { id } = useParams();
    return (
      <ModalBody>
        <Box>
          <Heading as={"h4"} size="md" textAlign={"center"}>
            Внесіть дані для розрахунку
          </Heading>
          <Box mt={"15px"} mx={"auto"}>
            <Box display={"flex"} gap={3}>
              <Heading as={"h4"} size="sm" minW={"max-content"}>
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
            <Box
              display={"flex"}
              gap={3}
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
              mt={"15px"}
              display={"flex"}
              gap={1}
              justifyContent={"space-between"}
            >
              <Box display={"flex"}>
                <Button
                  size="lg"
                  mt={"5px"}
                  onClick={
                    user.role == ""
                      ? () => setShowAlert(true)
                      : () => {
                          if (res.idTractor) {
                            let [second] = map.tractor.filter(
                              (el) => el.id == res.idTractor
                            );

                            setInRes(second);
                            setInUpdate(true);
                            setTractorOpen(true);
                          }
                        }
                  }
                >
                  <EditIcon w={"30px"} h={"auto"} color={"blue.400"} />
                </Button>
                <Box>
                  <Heading as={"h3"} size="sm" fontSize={"15px"}>
                    Трактор
                  </Heading>
                  <Select
                    w={"max-content"}
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
                        {el.brand}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box>
                <Heading as={"h4"} size="sm" fontSize={"15px"}>
                  Розхід палива на 1 год
                </Heading>

                <Input
                  w={"max-content"}
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
                  w={"100%"}
                  mt={"5px"}
                  h={"50%"}
                  fontSize={15}
                  color={"blue.400"}
                  size="lg"
                  onClick={
                    user.role == ""
                      ? () => setShowAlert(true)
                      : () => {
                          setTractorOpen(true);
                        }
                  }
                >
                  додати трактор
                </Button>
                <Button
                  fontSize={15}
                  h={"50%"}
                  mt={"5px"}
                  color={"blue.400"}
                  w={"200px"}
                  onClick={() => {
                    getCopyTractors(map);
                    setCopyTractorOpen(true);
                  }}
                >
                  скопіювати трактор
                </Button>
              </Box>
            </Box>
            <Box mt={"15px"} display={"flex"} justifyContent={"space-between"}>
              <Box style={{ height: "min-content", margin: "auto 0 0" }}>
                <Box display={"flex"}>
                  <Button
                    mt={"5px"}
                    size="lg"
                    onClick={
                      user.role == ""
                        ? () => setShowAlert(true)
                        : () => {
                            if (res.idMachine) {
                              let [second] = map.machine.filter(
                                (el) => el.id == res.idMachine
                              );
                              //@ts-ignore
                              setInRes(second);
                              setInUpdate(true);
                              setAgriculturalOpen(true);
                            }
                          }
                    }
                  >
                    <EditIcon w={"30px"} h={"auto"} color={"blue.400"} />
                  </Button>
                  <Box>
                    <Heading as={"h4"} size="sm" fontSize={"15px"}>
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
                          {el.brand}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Heading as={"h4"} size="sm" fontSize={"15px"}>
                  Роб. швидкість км/год
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
              <Box w={"min-content"}>
                <Button
                  mt={"5px"}
                  fontSize={15}
                  h={"50%"}
                  w={"100%"}
                  color={"blue.400"}
                  size="lg"
                  onClick={
                    user.role == ""
                      ? () => setShowAlert(true)
                      : () => {
                          setAgriculturalOpen(true);
                        }
                  }
                >
                  додати СГ машину
                </Button>
                <Button
                  h={"50%"}
                  mt={"5px"}
                  fontSize={15}
                  color={"blue.400"}
                  onClick={() => {
                    getCopyMachine(map);
                    setCopyMachineOpen(true);
                  }}
                >
                  скопіювати СГ машину
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
          <CopyTractorPopUp
            open={copyTractorOpen}
            setOpen={setCopyTractorOpen}
          />
          <CopyMachinePopUp
            open={copyMachineOpen}
            setOpen={setCopyMachineOpen}
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
