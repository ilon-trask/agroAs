import React, { Dispatch, SetStateAction, useState } from "react";
import Dialog from "../../components/Dialog";
import Income from "./components/Income";
import Manufacture from "./components/manufacture";

type props = { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> };
function CreateIncome({ open, setOpen }: props) {
  const [screen, setScreen] = useState(0);
  function changeString(screenNum: number) {
    setScreen(screenNum);
  }
  return (
    <Dialog
      isErr={false}
      open={open}
      setOpen={setOpen}
      setRes={setScreen}
      props={0}
      res={0}
      setIsErr={() => {}}
      setUpdate={() => {}}
      update={false}
    >
      {screen == 0 ? (
        <Income changeString={changeString} />
      ) : screen == 1 ? (
        <Manufacture />
      ) : null}
    </Dialog>
  );
}

export default CreateIncome;
