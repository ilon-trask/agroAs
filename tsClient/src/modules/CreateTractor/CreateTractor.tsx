import React from "react";
import Dialog, { func } from "../../components/Dialog";
import Tractor from "./components/Tractor";
import { createTractor, patchTractor } from "../../http/requests";
import { createOperProps } from "../../pages/TechnologicalMap";

export type TracProps = {
  nameTractor: string;
  brand: string;
  marketCost: string | number;
  depreciationPeriod: string | number;
  enginePower: string | number;
  fuelConsumption: string | number;
  numberOfPersonnel: string | number;
  gradeId: number | "";
};

export const tracProps: TracProps = {
  nameTractor: "",
  brand: "",
  marketCost: "",
  depreciationPeriod: "",
  enginePower: "",
  fuelConsumption: "",
  numberOfPersonnel: "",
  gradeId: "",
};

type props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  res: TracProps;
  setRes: (res: TracProps | ((res: TracProps) => TracProps) | {}) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  isErr: boolean;
  setIsErr: (isErr: boolean) => void;
};
export default function CreateTractor({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
  isErr,
  setIsErr,
}: props) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={tracProps}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <Tractor
        res={res}
        setRes={setRes}
        setIsErr={setIsErr}
        setOpen={setOpen}
        update={update}
      />
    </Dialog>
  );
}
