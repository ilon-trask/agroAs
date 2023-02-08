import React from "react";
import Dialog, { func } from "../components/Dialog";
import MechanicalWork from "../components/MechanicalWork";
import { createOperation, patchOperation } from "../http/requests";
import { createOperProps } from "../pages/TechnologicalMap";
export type MechanicalWorkProps = {
  nameOper: string;
  idMachine: string | number;
  idTractor: string | number;
  workingSpeed: string | number;
  fuelConsumption: string | number;
};
export const mechanicalWorkProps: MechanicalWorkProps = {
  nameOper: "",
  idMachine: "",
  idTractor: "",
  workingSpeed: "",
  fuelConsumption: "",
};

let cell: "costMechanical" = "costMechanical";

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
  isErr,
  setIsErr,
}: createOperProps<MechanicalWorkProps>) {
  return (
    <Dialog
      res={res}
      open={open}
      setOpen={setOpen}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={mechanicalWorkProps}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <MechanicalWork
        res={res as MechanicalWorkProps}
        setRes={setRes}
        cell={cell}
        setCell={setCell}
        section={section}
        setSection={setSection}
        setIsErr={setIsErr}
        setOpen={setOpen}
        update={update}
      />
    </Dialog>
  );
}
