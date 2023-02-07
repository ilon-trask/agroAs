import React from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import { Icost_hand_work } from "../../../tRPC serv/models/models";
import Dialog, { func } from "../components/Dialog";
import HandWork from "../components/HandWork";
import { createOperation, patchOperation } from "../http/requests";
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

const costHandWorkProps: CostHandWorkProps = {
  nameOper: "",
  gradeId: "",
  type: 1,
  productionRateAmount: "",
  productionRateWeight: "",
  yieldСapacity: "",
  spending: "",
  productionRateTime: "",
};

const createCostHandWorkFunc: func<CostHandWorkProps> = (
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
) => {
  if (res.nameOper == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setCell("");
    setRes({});
    setIsErr(false);
    console.log(res.type);
    res.spending = +res.spending!;
    res.yieldСapacity = +res.yieldСapacity!;
    res.gradeId = +res.gradeId!;
    res.productionRateAmount = +res.productionRateAmount!;
    res.productionRateTime = +res.productionRateTime!;
    res.productionRateWeight = +res.productionRateWeight!;

    if (res.type == 1) {
      res.productionRateAmount = 0;
      res.productionRateWeight = 0;
      res.yieldСapacity = 0;
      res.spending = 0;
    } else if (res.type == 2) {
      res.productionRateAmount = 0;
      res.productionRateTime = 0;
      res.spending = 0;
    } else if (res.type == 3) {
      res.productionRateTime = 0;
      res.productionRateWeight = 0;
      res.yieldСapacity = 0;
    }
    if (cell == "") return;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
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
}: createOperProps<CostHandWorkProps>) {
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
      func={createCostHandWorkFunc}
      props={costHandWorkProps}
    >
      <HandWork res={res} setRes={setRes} />
    </Dialog>
  );
}

export default CreateCostHandWork;
