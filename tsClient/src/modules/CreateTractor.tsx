import React from "react";
import Dialog from "../components/Dialog";
import Tractor from "../components/Tractor";
import { createTractor, patchTractor } from "../http/requests";

const tracProps = {
  nameTractor: "",
  brand: "",
  marketCost: "",
  depreciationPeriod: "",
  enginePower: "",
  fuelConsumption: "",
  numberOfPersonnel: "",
  gradeId: "",
};
function createTrac(
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
}

export default function CreateTractor({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
}) {
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
