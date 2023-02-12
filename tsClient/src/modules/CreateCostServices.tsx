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

export const servicesProps: ServiceProps = {
  nameOper: "",
  price: "",
  unitsOfCost: "",
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
  isErr,
  setIsErr,
}: createOperProps<ServiceProps>) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={servicesProps}
      isErr={isErr}
      setIsErr={setIsErr}
      errMess={
        <span>
          <b>Увага!</b>
          <br />
          Одиниця виміру "ціни" тільки "грн/га"
        </span>
      }
    >
      <Service
        res={res as ServiceProps}
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
