import React, { Dispatch, SetStateAction } from "react";
import Dialog from "../../components/Dialog";
import Sale from "./component/Sale";
export type SaleProp = {
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
};
function CreateSale({ open, setOpen, res, setRes }: props) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      setIsErr={() => {}}
      props={{}}
      res={{}}
      setRes={() => {}}
      update={false}
      setUpdate={() => {}}
    >
      <Sale res={res} setRes={setRes} setOpen={setOpen} />
    </Dialog>
  );
}

export default CreateSale;
