import React, { Dispatch, SetStateAction } from "react";
import Dialog from "../../components/Dialog";
import ProductService from "./components/Production";
export type productionProp = {
  productId: number | "";
  techCartId: number | "";
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: productionProp;
  setRes: Dispatch<SetStateAction<productionProp>>;
};
function CreateProductService({ open, setOpen, res, setRes }: props) {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      setIsErr={() => {}}
      props={{}}
      res={{}}
      setRes={() => {}}
      setUpdate={() => {}}
      update={false}
    >
      <ProductService setOpen={setOpen} res={res} setRes={setRes} />
    </Dialog>
  );
}

export default CreateProductService;
