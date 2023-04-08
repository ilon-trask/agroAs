import React, { Dispatch, SetStateAction, useState } from "react";
import Dialog from "../../components/Dialog";
import Income from "./components/Income";

type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export type incProp = {
  cultureId: string | number;
  comment: string;
};
const prop: incProp = { cultureId: "", comment: "" };
function CreateIncome({ open, setOpen }: props) {
  const [res, setRes] = useState<incProp>({ cultureId: "", comment: "" });
  //   console.log(123);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      update={false}
      setUpdate={() => {}}
      setIsErr={() => {}}
      props={prop}
      res={res}
      setRes={setRes}
    >
      <Income res={res} setRes={setRes} setOpen={setOpen} />
    </Dialog>
  );
}

export default CreateIncome;
