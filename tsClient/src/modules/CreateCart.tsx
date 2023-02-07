import React from "react";
import Dialog, { func } from "../components/Dialog";
import MapInputs from "../components/MapInputs";
import { createCart, updateMap } from "../http/requests";
import { Icart } from "../pages/MapJornal";
export type cartProps = {
  id?: number;
  nameCart: string;
  area: number | "";
  salary: number | "";
  priceDiesel: number | "";
};
const cartProps: cartProps = {
  nameCart: "",
  area: "",
  salary: "",
  priceDiesel: "",
};

const createCartFunc: func<cartProps> = (
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
};
interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  res: cartProps;
  setRes: (res: cartProps | ((res: cartProps) => cartProps)) => void;
}
export default function CreateCart({
  open,
  setOpen,
  update,
  setUpdate,
  res,
  setRes,
}: props) {
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
      <MapInputs res={res} setRes={setRes} />
    </Dialog>
  );
}
