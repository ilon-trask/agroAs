import {
  createTractor,
  createMachine,
  getMachine,
} from "../../../http/requests";

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
  section,
  patchOperation,
  createOperation
) {
  if (res.nameOper == "" || res.price == "" || res.amount == "") {
    setIsErr(true);
  } else {
    console.log(update);
    setOpen(false);
    setCell("");
    setRes({
      nameOper: "",
      price: "",
      amount: "",
      unitsOfCost: "",
      unitsOfConsumption: "",
    });
    setIsErr(false);
    res.amount = +res.amount;
    res.price = +res.price;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id, akkum);
    } else {
      createOperation(map, request, id, akk);
    }
  }
}

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
  section,
  patchOperation,
  createOperation
) {
  if (res.nameOper == "" || res.price == "") {
    setIsErr(true);
  } else {
    console.log(update);
    setOpen(false);
    setCell("");
    setRes({
      nameOper: "",
      price: "",
      amount: "",
      unitsOfCost: "",
      unitsOfConsumption: "",
    });
    setIsErr(false);
    res.amount = 0;
    res.price = +res.price;
    const request = { cell, res, section };

    if (update) {
      patchOperation(map, request, id, akkum);
    } else {
      createOperation(map, request, id, akk);
    }
  }
}

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
  section,
  patchOperation,
  createOperation
) {
  if (res.nameOper == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setCell("");
    setRes({
      nameOper: "",
    });
    setIsErr(false);
    res.price = 0;
    res.amount = 0;
    const request = { cell, res, section };
    console.log(request);
    console.log(akk);
    console.log(akkum);
    console.log(id);
    if (update) {
      patchOperation(map, request, id, akkum);
    } else {
      createOperation(map, request, id, akk);
    }
  }
}

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
  section,
  patchOperation,
  createOperation
) {
  console.log(3);
  if (res.nameTractor == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setRes({
      nameTractor: "",
      brand: "",
      marketCost: "",
      depreciationPeriod: "",
      enginePower: "",
      fuelConsumption: "",
      numberOfPersonnel: "",
      typeOfWork: "",
    });
    setIsErr(false);
    createTractor(map, res);
  }
}

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
  section,
  patchOperation,
  createOperation
) {
  console.log(3);
  if (res.nameMachine == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setRes({
      nameMachine: "",
      brand: "",
      marketCost: "",
      depreciationPeriod: "",
      widthOfCapture: "",
      workingSpeed: "",
      numberOfServicePersonnel: "",
      typeOfWork: "",
    });
    setIsErr(false);
    createMachine(map, res);
  }
}
