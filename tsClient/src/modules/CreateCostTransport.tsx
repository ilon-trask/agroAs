import React from "react";
import Dialog, { func } from "../components/Dialog";
import Transport from "../components/Transport";
import { createOperation, patchOperation } from "../http/requests";
import { createOperProps } from "../pages/TechnologicalMap";

export type TransportProps = {
  nameOper: string;
  price: string | number;
  unitsOfCost: string | number;
};

const transportProps = {
  nameOper: "",
  price: "",
  unitsOfCost: "",
};
const createTransport: func<TransportProps> = function (
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
    setRes(transportProps);
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

const cell = "costTransport";

export default function CreateCostTransport({
  open,
  setOpen,
  setCell,
  section,
  setSection,
  res,
  setRes,
  update,
  setUpdate,
}: createOperProps<TransportProps>) {
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
      func={createTransport}
      props={transportProps}
    >
      <Transport res={res} setRes={setRes} />
    </Dialog>
  );
}
