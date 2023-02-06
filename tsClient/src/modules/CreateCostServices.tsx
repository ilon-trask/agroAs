import React from "react";
import Dialog from "../components/Dialog";
import Service from "../components/Service";
import { createOperation, patchOperation } from "../http/requests";

const servicesProps = {
  nameOper: "",
  price: "",
  unitsOfCost: "",
};
function createServices(
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
    setRes(servicesProps);
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

const cell = "costServices";

export default function CreateCostServices({
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
      func={createServices}
      props={servicesProps}
    >
      <Service res={res} setRes={setRes} />
    </Dialog>
  );
}
