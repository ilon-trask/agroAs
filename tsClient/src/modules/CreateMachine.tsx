import React from "react";
import Dialog from "../components/Dialog";
import Machine from "../components/Machine";
import { createMachine, patchMachine } from "../http/requests";

const machineProps = {
  nameMachine: "",
  brand: "",
  marketCost: "",
  depreciationPeriod: "",
  widthOfCapture: "",
  workingSpeed: "",
  numberOfServicePersonnel: "",
  gradeId: "",
};

function createMachineFunc(
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
  if (res.nameMachine == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setRes(machineProps);
    setIsErr(false);
    res.marketCost = +res.marketCost;
    res.depreciationPeriod = +res.depreciationPeriod;
    res.widthOfCapture = +res.widthOfCapture;
    res.workingSpeed = +res.workingSpeed;
    res.numberOfServicePersonnel = +res.numberOfServicePersonnel;
    res.gradeId = +res.gradeId;
    if (update) {
      patchMachine(map, res);
    } else {
      createMachine(map, res);
    }
  }
}

export default function CreateMachine({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
}) {
  console.log(open);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      func={createMachineFunc}
      props={machineProps}
    >
      <Machine res={res} setRes={setRes} />
    </Dialog>
  );
}
