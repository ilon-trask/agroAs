import React, { Dispatch, SetStateAction, useState } from "react";
import Dialog from "../../components/Dialog";
import YieldPlant from "./components/YieldPlant";

type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  res: incProp;
  setRes: Dispatch<SetStateAction<incProp>>;
  plantId: number;
};
export type incProp = {
  cultureId: string | number;
  comment: string;
};
const prop: incProp = { cultureId: "", comment: "" };
function CreateYield({ open, setOpen, update, res, setRes, plantId }: props) {
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
      <YieldPlant
        res={res}
        setRes={setRes}
        setOpen={setOpen}
        update={update}
        plantId={plantId}
      />
    </Dialog>
  );
}

export default CreateYield;
