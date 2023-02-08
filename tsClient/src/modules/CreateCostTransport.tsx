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
  isErr,
  setIsErr,
}: createOperProps<TransportProps>) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={transportProps}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <Transport
        res={res as TransportProps}
        setRes={setRes}
        cell={cell}
        setCell={setCell}
        section={section}
        setSection={setSection}
        setOpen={setOpen}
        setIsErr={setIsErr}
        update={update}
      />
    </Dialog>
  );
}
