import React, { Dispatch, SetStateAction, useState } from "react";
import {
  IoutcomeGroup,
  IoutcomeType,
} from "../../../../tRPC serv/controllers/outComeService";
import Dialog from "../../components/Dialog";
import OutcomeElem from "./components/OutcomeElem";
import OutcomeGroup from "./components/OutcomeGroup";
import OutcomeType from "./components/OutcomeType";
type props = { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> };
export type outcomeProps = {
  type: IoutcomeType | "";
  group: IoutcomeGroup | "";
  id: number;
};
function CreateOutcome({ open, setOpen }: props) {
  const [screen, setScreen] = useState(1);
  const [res, setRes] = useState<outcomeProps>({
    group: "",
    id: 0,
    type: "",
  });
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      res={{}}
      setRes={setScreen}
      update={false}
      setUpdate={() => {}}
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
        />
      ) : null}
    </Dialog>
  );
}

export default CreateOutcome;
