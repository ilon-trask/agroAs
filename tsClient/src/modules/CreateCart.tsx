import React, { Dispatch, SetStateAction, useState } from "react";
import { Itech_cart } from "../../../tRPC serv/models/models";
import Dialog, { func } from "../components/Dialog";
import MapInputs from "../components/MapInputs";
import { createCart, updateMap } from "../http/requests";
import { VegetationYearsType } from "../shared/hook/useVegetationYears";
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
  cultivationTechnologyId?: number | "";
  cultureId?: number | "";
  year: VegetationYearsType | "";
  isBasic: boolean | null;
};
export const CartProps: cartProps = {
  nameCart: "",
  area: "",
  salary: "",
  isPublic: false,
  priceDiesel: "",
  sectionId: "",
  year: "",
  isBasic: null,
};
let obj = {};
interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  res: cartProps;
  setRes: Dispatch<SetStateAction<cartProps>>;
  complex?: boolean;
  setComplex?: Dispatch<SetStateAction<boolean>>;
  isCul?: boolean;
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
  isCul,
}: props) {
  const [isErr, setIsErr] = useState<boolean>(false);
  console.log(update);
  console.log(res);

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={obj}
      isErr={isErr}
      setIsErr={setIsErr}
      setComplex={setComplex}
      //@ts-ignore
      onClose={() => setRes((prev) => ({ isBasic: prev.isBasic }))}
    >
      <MapInputs
        res={res}
        setRes={setRes}
        setIsErr={setIsErr}
        setOpen={setOpen}
        update={update}
        setUpdate={setUpdate}
        complex={complex}
        setComplex={setComplex}
        isCul={isCul}
      />
    </Dialog>
  );
}
