import React from "react";
import Dialog, { func } from "../components/Dialog";
import Materials from "../components/Materials";
import { createOperProps } from "../pages/TechnologicalMap";

export type MaterialsProps = {
  nameOper: string;
  price: string | number;
  consumptionPerHectare: string | number;
  unitsOfCost: string;
  unitsOfConsumption: string;
};

const materialsProps = {
  nameOper: "",
  price: "",
  consumptionPerHectare: "",
  unitsOfCost: "",
  unitsOfConsumption: "",
};

const cell = "costMaterials";

export default function CreateCostMaterials({
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
}: createOperProps<MaterialsProps>) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={materialsProps}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <Materials
        setOpen={setOpen}
        res={res as MaterialsProps}
        setRes={setRes}
        cell={cell}
        setCell={setCell}
        section={section}
        setSection={setSection}
        setIsErr={setIsErr}
        update={update}
      />
    </Dialog>
  );
}
