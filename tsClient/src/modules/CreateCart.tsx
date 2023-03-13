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
  isPublic?: boolean;
  priceDiesel: number | "";
  totalCost?: number;
};
export const CartProps: cartProps = {
  nameCart: "",
  area: "",
  salary: "",
  isPublic: false,
  priceDiesel: "",
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
      props={CartProps}
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
