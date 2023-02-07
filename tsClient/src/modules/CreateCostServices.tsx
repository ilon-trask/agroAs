import React from "react";
import Dialog, { func } from "../components/Dialog";
import Service from "../components/Service";
import { createOperation, patchOperation } from "../http/requests";
import { createOperProps } from "../pages/TechnologicalMap";

export type ServiceProps = {
  nameOper: string;
  price: string | number;
  unitsOfCost: string | number;
};

const servicesProps = {
  nameOper: "",
  price: "",
  unitsOfCost: "",
};
const createServices: func<ServiceProps> = function (
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
  if (res.nameOper == "" || res.price == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setCell("");
    setRes(servicesProps);
    setIsErr(false);
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

const cell = "costServices";

export default function CreateCostServices({
  open,
  setOpen,
  setCell,
  section,
  setSection,
  res,
  setRes,
  update,
  setUpdate,
}: createOperProps<ServiceProps>) {
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
      func={createServices}
      props={servicesProps}
    >
      <Service res={res} setRes={setRes} />
    </Dialog>
  );
}
