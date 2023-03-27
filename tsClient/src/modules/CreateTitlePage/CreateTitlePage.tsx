import React, { Dispatch, SetStateAction } from "react";
import Dialog, { func } from "../../components/Dialog";
import Title from "./components/Title";
import { createOperProps } from "../../pages/TechnologicalMap";
export type CostHandWorkProps = {
  nameOper: string;
  date: string;
  gradeId: number | string;
  type: number | string;
  productionRateAmount: number | string;
  productionRateWeight: number | string;
  yieldСapacity: number | string;
  spending: number | string;
  productionRateTime: number | string;
};

export const costHandWorkProps: CostHandWorkProps = {
  nameOper: "",
  date: "",
  gradeId: "",
  type: 1,
  productionRateAmount: "",
  productionRateWeight: "",
  yieldСapacity: "",
  spending: "",
  productionRateTime: "",
};

const cell = "costHandWork";

function CreateCostHandWork({
  open,
  setOpen,
}: // section,
// setSection,
// setRes,
// update,
// setUpdate,
// isErr,
// setIsErr,
{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={{}}
      setRes={() => {}}
      update={false}
      setUpdate={() => {}}
      props={costHandWorkProps}
      isErr={false}
      setIsErr={() => {}}
    >
      <Title
        setOpen={setOpen}
        // res={res}
        // setRes={setRes}
        // setOpen={setOpen}
        // cell={cell}
        // setCell={setCell}
        // update={update}
        // section={section}
        // setSection={setSection}
        // setIsErr={setIsErr}
      />
    </Dialog>
  );
}

export default CreateCostHandWork;
