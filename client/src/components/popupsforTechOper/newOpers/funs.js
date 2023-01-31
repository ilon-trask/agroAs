import {
  createTractor,
  createMachine,
  getMachine,
  getTractor,
  patchOperation,
  createOperation,
  patchMachine,
  patchTractor,
} from "../../../http/requests";

export const fiveInputsProps = {
  nameOper: "",
  price: "",
  consumptionPerHectare: "",
  unitsOfCost: "",
  unitsOfConsumption: "",
};
export function fiveInputs(
  id,
  map,
  akkum,
  update,
  res,
  setIsErr,
  setOpen,
  cell,
  setCell,
  setRes,
  akk,
  section
) {
  if (res.nameOper == "" || res.price == "" || res.amount == "") {
    setIsErr(true);
  } else {
    console.log(update);
    setOpen(false);
    setCell("");
    setRes(fiveInputsProps);
    setIsErr(false);
    res.consumptionPerHectare = +res.consumptionPerHectare;
    res.price = +res.price;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id, akkum);
    } else {
      createOperation(map, request, id, akk);
    }
  }
}
export const threeInputsProps = {
  nameOper: "",
  price: "",
  unitsOfCost: "",
};
export function threeInputs(
  id,
  map,
  akkum,
  update,
  res,
  setIsErr,
  setOpen,
  cell,
  setCell,
  setRes,
  akk,
  section
) {
  if (res.nameOper == "" || res.price == "") {
    setIsErr(true);
  } else {
    console.log(update);
    setOpen(false);
    setCell("");
    setRes(threeInputsProps);
    setIsErr(false);
    res.price = +res.price;
    const request = { cell, res, section };

    if (update) {
      patchOperation(map, request, id, akkum);
    } else {
      createOperation(map, request, id, akk);
    }
  }
}

export const MechanicalWorkProps = {
  nameOper: "",
  idMachine: "",
  idTractor: "",
  workingSpeed: "",
  fuelConsumption: "",
};

export function MechanicalWorkFunc(
  id,
  map,
  akkum,
  update,
  res,
  setIsErr,
  setOpen,
  cell,
  setCell,
  setRes,
  akk,
  section
) {
  if (res.nameOper == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setCell("");
    setRes(MechanicalWorkProps);
    setIsErr(false);
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id, akkum);
    } else {
      createOperation(map, request, id, akk);
    }
  }
}

export const createTracProps = {
  nameTractor: "",
  brand: "",
  marketCost: "",
  depreciationPeriod: "",
  enginePower: "",
  fuelConsumption: "",
  numberOfPersonnel: "",
  gradeId: "",
};
export function createTrac(
  id,
  map,
  akkum,
  update,
  res,
  setIsErr,
  setOpen,
  cell,
  setCell,
  setRes,
  akk,
  section
) {
  if (res.nameTractor == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setRes(createTracProps);
    setIsErr(false);
    if (update) {
      patchTractor(map, res);
    } else {
      createTractor(map, res);
    }
  }
}

export const createMachineProps = {
  nameMachine: "",
  brand: "",
  marketCost: "",
  depreciationPeriod: "",
  widthOfCapture: "",
  workingSpeed: "",
  numberOfServicePersonnel: "",
  gradeId: "",
};

export function createMachineFunc(
  id,
  map,
  akkum,
  update,
  res,
  setIsErr,
  setOpen,
  cell,
  setCell,
  setRes,
  akk,
  section
) {
  if (res.nameMachine == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setRes(createMachineProps);
    setIsErr(false);
    if (update) {
      patchMachine(map, res);
    } else {
      createMachine(map, res);
    }
  }
}

export const costHandWorkProps = {
  nameOper: "",
  gradeId: "",
  type: 1,
  productionRateAmount: "",
  productionRateWeight: "",
  yield: "",
  spending: "",
  productionRateTime: "",
};

export function createCostHandWork(
  id,
  map,
  akkum,
  update,
  res,
  setIsErr,
  setOpen,
  cell,
  setCell,
  setRes,
  akk,
  section
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
      patchOperation(map, request, id, akkum);
    } else {
      createOperation(map, request, id, akk);
    }
  }
}
