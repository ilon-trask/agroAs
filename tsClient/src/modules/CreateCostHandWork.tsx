import React from "react";
import Dialog, { func } from "../components/Dialog";
import HandWork from "../components/HandWork";
import { createOperProps } from "../pages/TechnologicalMap";
export type CostHandWorkProps = {
  nameOper: string;
  gradeId: number | string;
  type: number | string;
  productionRateAmount: number | string;
  productionRateWeight: number | string;
  yieldСapacity: number | string;
  spending: number | string;
  productionRateTime: number | string;
};

export const costHandWorkProps: CostHandWorkProps = {
  nameOper: "",
  gradeId: "",
  type: 1,
  productionRateAmount: "",
  productionRateWeight: "",
  yieldСapacity: "",
  spending: "",
  productionRateTime: "",
};

const cell = "costHandWork";

function CreateCostHandWork({
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
}: createOperProps<CostHandWorkProps>) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={costHandWorkProps}
      isErr={isErr}
      setIsErr={setIsErr}
      errMess={" "}
    >
      <HandWork
        res={res as CostHandWorkProps}
        setRes={setRes}
        setOpen={setOpen}
        cell={cell}
        setCell={setCell}
        update={update}
        section={section}
        setSection={setSection}
        setIsErr={setIsErr}
      />
    </Dialog>
  );
}

export default CreateCostHandWork;
