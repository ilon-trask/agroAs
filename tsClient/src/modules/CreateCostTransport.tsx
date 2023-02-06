import React from "react";
import Dialog from "../components/Dialog";
import Transport from "../components/Transport";
import { createOperation, patchOperation } from "../http/requests";

const transportProps = {
  nameOper: "",
  price: "",
  unitsOfCost: "",
};
function createTransport(
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  cell,
  setCell,
  setRes,
  section
) {
  if (res.nameOper == "" || res.price == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setCell("");
    setRes(transportProps);
    setIsErr(false);
    res.price = +res.price;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
}

const cell = "costTransport";

export default function CreateCostTransport({
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
      func={createTransport}
      props={transportProps}
    >
      <Transport res={res} setRes={setRes} />
    </Dialog>
  );
}
