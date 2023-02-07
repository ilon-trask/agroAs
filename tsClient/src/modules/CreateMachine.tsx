import React from "react";
import Dialog, { func } from "../components/Dialog";
import Machine from "../components/Machine";
import { createMachine, patchMachine } from "../http/requests";

export type MachineProps = {
  nameMachine: string;
  brand: string;
  marketCost: number | string;
  depreciationPeriod: number | string;
  widthOfCapture: number | string;
  workingSpeed: number | string;
  numberOfServicePersonnel: number | string;
  gradeId: number | string;
};

const machineProps: MachineProps = {
  nameMachine: "",
  brand: "",
  marketCost: "",
  depreciationPeriod: "",
  widthOfCapture: "",
  workingSpeed: "",
  numberOfServicePersonnel: "",
  gradeId: "",
};

const createMachineFunc: func<MachineProps> = function (
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
};
type props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  res: MachineProps;
  setRes: (
    res: MachineProps | ((res: MachineProps) => MachineProps) | {}
  ) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
};
export default function CreateMachine({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
}: props) {
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
