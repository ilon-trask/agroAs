import React from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import Dialog, { func } from "../components/Dialog";
import Materials from "../components/Materials";
import { createOperation, patchOperation } from "../http/requests";
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

const createMaterials: func<MaterialsProps> = function (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  cell,
  setCell,
  setRes,
  section,
  setSection
) {
  if (
    res.nameOper == "" ||
    res.price == "" ||
    res.consumptionPerHectare == ""
  ) {
    setIsErr(true);
  } else {
    console.log(update);
    setOpen(false);
    setCell("");
    setRes(materialsProps);
    setIsErr(false);
    res.consumptionPerHectare = +res.consumptionPerHectare;
    res.price = +res.price;
    if (cell == "") return;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
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
}: createOperProps<MaterialsProps>) {
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
      func={createMaterials}
      props={materialsProps}
    >
      <Materials res={res} setRes={setRes} />
    </Dialog>
  );
}
