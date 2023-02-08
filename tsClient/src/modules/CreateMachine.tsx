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

export const machineProps: MachineProps = {
  nameMachine: "",
  brand: "",
  marketCost: "",
  depreciationPeriod: "",
  widthOfCapture: "",
  workingSpeed: "",
  numberOfServicePersonnel: "",
  gradeId: "",
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
  isErr: boolean;
  setIsErr: (isErr: boolean) => void;
};
export default function CreateMachine({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
  isErr,
  setIsErr,
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
      props={machineProps}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <Machine
        res={res as MachineProps}
        setRes={setRes}
        setOpen={setOpen}
        update={update}
        setIsErr={setIsErr}
      />
    </Dialog>
  );
}
