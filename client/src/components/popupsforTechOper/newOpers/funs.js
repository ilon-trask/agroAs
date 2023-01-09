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
    const request = { cell, res, section };
    if (update) {
      console.log("upd");
      console.log(akk);
      patchOperation(map, request, id, akkum);
    } else {
      console.log(3);
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
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id, akkum);
    } else {
      createOperation(map, request, id, akk);
    }
  }
}
