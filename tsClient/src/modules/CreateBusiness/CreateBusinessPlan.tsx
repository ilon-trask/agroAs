import React, { Dispatch, SetStateAction } from "react";
import Dialog from "../../components/Dialog";
import BusinessPlan from "./components/BusinessPlan";
import { createOperProps } from "../../pages/TechnologicalMap";

export type BusinessProps = {
  id?: number;
  name: string;
  businessCategoryId: number | "";
};

export const businessProps: BusinessProps = {
  name: "",
  businessCategoryId: "",
};

export default function CreateBusiness({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
  isErr,
  setIsErr,
}: {
  open: boolean;

  setOpen: (open: boolean) => void;
  res: BusinessProps;
  setRes: (res: BusinessProps) => void;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  isErr: boolean;
  setIsErr: (isErr: boolean) => void;
}) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes as any}
      update={update}
      setUpdate={setUpdate}
      props={businessProps}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <BusinessPlan
        res={res as BusinessProps}
        setRes={setRes as any}
        setOpen={setOpen}
        setIsErr={setIsErr}
        update={update}
        setUpdate={setUpdate}
      />
    </Dialog>
  );
}
