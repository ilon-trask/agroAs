import React, { Dispatch, SetStateAction } from "react";
import Dialog from "../../components/Dialog";
import TEJ from "./components/TEJ";
import { createOperProps } from "../../pages/TechnologicalMap";

export type TEJProps = {
  id?: number;
  cartId: number | "";
  comment: string;
};

export const tejProps: TEJProps = {
  cartId: "",
  comment: "",
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
  res: TEJProps;
  setRes: (res: TEJProps) => void;
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
      props={tejProps}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <TEJ
        res={res as TEJProps}
        setRes={setRes as any}
        setOpen={setOpen}
        setIsErr={setIsErr}
        update={update}
        setUpdate={setUpdate}
      />
    </Dialog>
  );
}
