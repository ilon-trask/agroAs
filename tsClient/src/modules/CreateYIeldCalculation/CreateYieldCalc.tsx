import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IyieldCalculation } from "../../../../tRPC serv/models/models";
import Dialog from "../../components/Dialog";
import YieldCalc from "./components/YieldCalc";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  myCalc: IyieldCalculation | undefined;
};
export type yieldCalcProp = {
  numberFruit: number | string;
  fruitWeight: number | string;
  numberFlower: number | string;
  numberSocket: number | string;
  numberPlantsPerHectare: number | string;
};
let prop: yieldCalcProp = {
  numberFruit: "",
  fruitWeight: "",
  numberFlower: "",
  numberSocket: "",
  numberPlantsPerHectare: "",
};
function CreateYieldCalc({ open, setOpen, id, myCalc }: props) {
  const update = !!myCalc;
  const [res, setRes] = useState<yieldCalcProp>({
    numberFruit: "",
    fruitWeight: "",
    numberFlower: "",
    numberSocket: "",
    numberPlantsPerHectare: "",
  });
  useEffect(() => {
    console.log(1);

    if (update) {
      setRes({
        numberFruit: myCalc.numberFruit,
        fruitWeight: myCalc.fruitWeight,
        numberFlower: myCalc.numberFlower,
        numberSocket: myCalc.numberSocket,
        numberPlantsPerHectare: myCalc.numberPlantsPerHectare,
      });
      prop = {
        numberFruit: myCalc.numberFruit,
        fruitWeight: myCalc.fruitWeight,
        numberFlower: myCalc.numberFlower,
        numberSocket: myCalc.numberSocket,
        numberPlantsPerHectare: myCalc.numberPlantsPerHectare,
      };
    } else {
      prop = {
        numberFruit: "",
        fruitWeight: "",
        numberFlower: "",
        numberSocket: "",
        numberPlantsPerHectare: "",
      };
    }
  }, [update]);

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      setIsErr={() => {}}
      props={prop}
      res={res}
      setRes={setRes}
      update={false}
      setUpdate={() => {}}
    >
      <YieldCalc
        res={res}
        setRes={setRes}
        setOpen={setOpen}
        id={id}
        update={update}
      />
    </Dialog>
  );
}

export default CreateYieldCalc;
