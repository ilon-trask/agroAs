import React from "react";
import Dialog from "../components/Dialog";
import MapInputs from "../components/MapInputs";
import { createCart, updateMap } from "../http/requests";

const cartProps = {
  nameCart: "",
  area: "",
  salary: "",
  priceDiesel: "",
};

function createCartFunc(
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
  if (
    res.nameCart == "" ||
    res.area == "" ||
    res.salary == "" ||
    res.priceDiesel == ""
  ) {
    setIsErr(true);
  } else {
    setIsErr(false);
    setOpen(false);
    res.area = +res.area;
    res.salary = +res.salary;
    res.priceDiesel = +res.priceDiesel;
    setRes({ nameCart: "", area: "", salary: "", priceDiesel: "" });
    if (update) {
      updateMap(map, res);
    } else {
      createCart(map, res);
    }
  }
}

export default function CreateCart({
  open,
  setOpen,
  update,
  setUpdate,
  res,
  setRes,
}) {
  console.log(open);
  console.log(res);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      func={createCartFunc}
      props={cartProps}
      errMess={" "}
    >
      <MapInputs
        open={open}
        setOpen={setOpen}
        update={update}
        setUpdate={setUpdate}
        res={res}
        setRes={setRes}
      />
    </Dialog>
  );
}
