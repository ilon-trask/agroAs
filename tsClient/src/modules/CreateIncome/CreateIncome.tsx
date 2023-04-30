import React, { Dispatch, SetStateAction, useState } from "react";
import Dialog from "../../components/Dialog";
import IncomeChooseType from "./components/IncomeChooseType";
import IncomeChooseGroupe from "./components/IncomeChooseGroup";
import { IncomeType } from "../../pages/hook/useIncomeTypes";
import { IncomeGroup } from "../../pages/hook/useIncomeGroup";
import IncomeChoseElem from "./components/IncomeChoseElem";

export type IncomeProp = {
  id?: number;
  type: IncomeType;
  group: IncomeGroup;
  propId: number;
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: IncomeProp;
  setRes: Dispatch<SetStateAction<IncomeProp>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
function CreateIncome({
  open,
  setOpen,
  res,
  setRes,
  setUpdate,
  update,
}: props) {
  const [screen, setScreen] = useState(0);
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
        <IncomeChooseType setScreen={setScreen} res={res} setRes={setRes} />
      ) : screen == 1 ? (
        <IncomeChooseGroupe setScreen={setScreen} res={res} setRes={setRes} />
      ) : screen == 2 ? (
        <IncomeChoseElem
          setScreen={setScreen}
          res={res}
          setRes={setRes}
          setOpen={setOpen}
          update={update}
          setUpdate={setUpdate}
        />
      ) : null}
    </Dialog>
  );
}

export default CreateIncome;
