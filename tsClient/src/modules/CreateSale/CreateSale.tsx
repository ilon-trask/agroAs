import React, { Dispatch, SetStateAction } from "react";
import Dialog from "../../components/Dialog";
import Sale from "./component/Sale";
export type SaleProp = {
  id?: number;
  date: string;
  price: number | "";
  amount: number | "";
  productionId: number | "";
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: SaleProp;
  setRes: Dispatch<SetStateAction<SaleProp>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
const obj = {};
function CreateSale({ open, setOpen, res, setRes, setUpdate, update }: props) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      setIsErr={() => {}}
      props={obj}
      res={obj}
      setRes={setRes}
      update={false}
      setUpdate={() => {}}
    >
      <Sale
        res={res}
        setRes={setRes}
        setOpen={setOpen}
        update={update}
        setUpdate={setUpdate}
      />
    </Dialog>
  );
}

export default CreateSale;
