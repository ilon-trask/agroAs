import React from "react";
import Dialog from "../components/Dialog";
import MechanicalWork from "../components/MechanicalWork";
import { createOperation, patchOperation } from "../http/requests";

const mechanicalWorkProps = {
  nameOper: "",
  idMachine: "",
  idTractor: "",
  workingSpeed: "",
  fuelConsumption: "",
};

function mechanicalWorkFunc(
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  cell,
  setCell,
  setRes,
  section
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
    setOpen(false);
    setCell("");
    setRes(mechanicalWorkProps);
    res.idMachine = +res.idMachine;
    res.idTractor = +res.idTractor;
    res.workingSpeed = +res.workingSpeed;
    res.fuelConsumption = +res.fuelConsumption;
    setIsErr(false);
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
}
let cell = "costMechanical";

export default function CreateCostMechanical({
  open,
  setOpen,
  setCell,
  section,
  setSection,
  res,
  setRes,
  update,
  setUpdate,
}) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      cell={cell}
      setCell={setCell}
      section={section}
      setSection={setSection}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      func={mechanicalWorkFunc}
      props={mechanicalWorkProps}
    >
      <MechanicalWork res={res} setRes={setRes} />
    </Dialog>
  );
}
