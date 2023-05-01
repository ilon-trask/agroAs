import React, { Dispatch, SetStateAction, useState } from "react";
import { Itech_cart } from "../../../tRPC serv/models/models";
import Dialog, { func } from "../components/Dialog";
import MapInputs from "../components/MapInputs";
import { createCart, updateMap } from "../http/requests";
import { Icart } from "../pages/MapJornal";
export type cartProps = {
  id?: number;
  nameCart: string;
  area: number | string;
  salary: number | string;
  isPublic?: boolean;
  priceDiesel: number | string;
  totalCost?: number;
  sectionId?: number | "";
  cultivationTechnologyId?: number;
  cultureId?: number;
};
export const CartProps: cartProps = {
  nameCart: "",
  area: "",
  salary: "",
  isPublic: false,
  priceDiesel: "",
  sectionId: "",
};

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  res: cartProps;
  setRes: (res: cartProps | ((res: cartProps) => cartProps) | {}) => void;
  complex?: boolean;
  setComplex?: Dispatch<SetStateAction<boolean>>;
}
export default function CreateCart({
  open,
  setOpen,
  update,
  setUpdate,
  res,
  setRes,
  complex,
  setComplex,
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
      setComplex={setComplex}
    >
      <MapInputs
        res={res}
        setRes={setRes}
        setIsErr={setIsErr}
        setOpen={setOpen}
        update={update}
        complex={complex}
        setComplex={setComplex}
      />
    </Dialog>
  );
}
