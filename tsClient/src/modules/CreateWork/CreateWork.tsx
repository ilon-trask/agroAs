import React, { useState } from "react";
import Dialog, { func } from "../../components/Dialog";
import WorkInputs from "./components/WorkInputs";
export type workProps = {
  id?: number;
  nameWork: string;
  area: number | "";
  salary: number | "";
  isPublic?: boolean;
  priceDiesel: number | "";
  totalCost?: number;
  workId?: number;
};
export const WorkProps: workProps = {
  nameWork: "",
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
  res: workProps;
  setRes: (res: workProps | ((res: workProps) => workProps) | {}) => void;
}
export default function CreateWork({
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
      props={WorkProps}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <WorkInputs
        res={res}
        setRes={setRes}
        setIsErr={setIsErr}
        setOpen={setOpen}
        update={update}
      />
    </Dialog>
  );
}
