import React, { useState } from "react";
import { Itech_cart } from "../../../tRPC serv/models/models";
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
  setRes
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
    setRes({});
    if (update) {
      updateMap(map, res);
    } else {
      createCart(map, res as Itech_cart);
    }
  }
};
interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  res: cartProps;
  setRes: (res: cartProps | ((res: cartProps) => cartProps) | {}) => void;
}
export default function CreateCart({
  open,
  setOpen,
  update,
  setUpdate,
  res,
  setRes,
}: props) {
  const [isErr, setIsErr] = useState<boolean>(false);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={cartProps}
      errMess={" "}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <MapInputs
        res={res}
        setRes={setRes}
        setIsErr={setIsErr}
        setOpen={setOpen}
        update={update}
      />
    </Dialog>
  );
}
