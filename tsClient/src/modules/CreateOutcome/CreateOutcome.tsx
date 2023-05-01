import React, { Dispatch, SetStateAction, useState } from "react";
import {
  IoutcomeGroup,
  IoutcomeType,
} from "../../../../tRPC serv/controllers/outComeService";
import Dialog from "../../components/Dialog";
import OutcomeElem from "./components/OutcomeElem";
import OutcomeGroup from "./components/OutcomeGroup";
import OutcomeType from "./components/OutcomeType";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: outcomeProps;
  setRes: Dispatch<SetStateAction<outcomeProps>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
export type outcomeProps = {
  outId?: number;
  type: IoutcomeType | "";
  group: IoutcomeGroup | "";
  id: number;
};
function CreateOutcome({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
}: props) {
  const [screen, setScreen] = useState(1);

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      res={{}}
      setRes={setScreen}
      update={false}
      setUpdate={setUpdate}
      props={1}
      setIsErr={() => {}}
    >
      {screen == 1 ? (
        <OutcomeType setScreen={setScreen} res={res} setRes={setRes} />
      ) : screen == 2 ? (
        <OutcomeGroup setScreen={setScreen} res={res} setRes={setRes} />
      ) : screen == 3 ? (
        <OutcomeElem
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

export default CreateOutcome;
