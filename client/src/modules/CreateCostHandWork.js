import React from "react";
import Dialog from "../components/Dialog";
import HandWork from "../components/HandWork";
import { createOperation, patchOperation } from "../http/requests";

const costHandWorkProps = {
  nameOper: "",
  gradeId: "",
  type: 1,
  productionRateAmount: "",
  productionRateWeight: "",
  yield: "",
  spending: "",
  productionRateTime: "",
};

function createCostHandWork(
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
  if (res.nameOper == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setCell("");
    setRes({});
    setIsErr(false);
    res.price = 0;
    res.amount = 0;
    console.log(res.type);
    res.spending = +res.spending;
    res.productionRateAmount = +res.productionRateAmount;
    res.yieldСapacity = +res.yieldСapacity;
    res.gradeId = +res.gradeId;
    res.productionRateTime = +res.productionRateTime;
    res.productionRateWeight = +res.productionRateWeight;
    res.productionPerShift = +res.productionPerShift;

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
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
}

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
}) {
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
      func={createCostHandWork}
      props={costHandWorkProps}
    >
      <HandWork res={res} setRes={setRes} />
    </Dialog>
  );
}

export default CreateCostHandWork;
