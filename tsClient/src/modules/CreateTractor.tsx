import React from "react";
import Dialog, { func } from "../components/Dialog";
import Tractor from "../components/Tractor";
import { createTractor, patchTractor } from "../http/requests";
import { createOperProps } from "../pages/TechnologicalMap";

export type TracProps = {
  nameTractor: string;
  brand: string;
  marketCost: string | number;
  depreciationPeriod: string | number;
  enginePower: string | number;
  fuelConsumption: string | number;
  numberOfPersonnel: string | number;
  gradeId: string | number;
};

const tracProps: TracProps = {
  nameTractor: "",
  brand: "",
  marketCost: "",
  depreciationPeriod: "",
  enginePower: "",
  fuelConsumption: "",
  numberOfPersonnel: "",
  gradeId: "",
};
const createTrac: func<TracProps> = function (
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
    res.nameTractor == "" ||
    res.marketCost == "" ||
    res.depreciationPeriod == "" ||
    res.enginePower == "" ||
    res.fuelConsumption == "" ||
    res.numberOfPersonnel == ""
  ) {
    setIsErr(true);
  } else {
    res.marketCost = +res.marketCost;
    res.depreciationPeriod = +res.depreciationPeriod;
    res.enginePower = +res.enginePower;
    res.fuelConsumption = +res.fuelConsumption;
    res.numberOfPersonnel = +res.numberOfPersonnel;
    res.gradeId = +res.gradeId;
    setOpen(false);
    setRes(tracProps);
    setIsErr(false);
    if (update) {
      patchTractor(map, res);
    } else {
      createTractor(map, res);
    }
  }
};
type props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  res: TracProps;
  setRes: (res: TracProps | ((res: TracProps) => TracProps) | {}) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
};
export default function CreateTractor({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
}: props) {
  console.log(setOpen);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      func={createTrac}
      props={tracProps}
    >
      <Tractor res={res} setRes={setRes} />
    </Dialog>
  );
}
