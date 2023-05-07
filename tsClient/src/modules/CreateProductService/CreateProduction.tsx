import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction } from "react";
import Dialog from "../../components/Dialog";
import ProductService from "./components/Production";
export type productionProp = {
  productId: number | "";
  techCartId: number | "";
  cultureId: number | "";
  year: number | "";
  isPrimary: boolean | "";
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: productionProp;
  setRes: Dispatch<SetStateAction<productionProp>>;
  setProductOpen: Dispatch<SetStateAction<boolean>>;
};
function CreateProductService({
  open,
  setOpen,
  res,
  setRes,
  setProductOpen,
}: props) {
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
      <ProductService
        setOpen={setOpen}
        res={res}
        setRes={setRes}
        setProductOpen={setProductOpen}
      />
    </Dialog>
  );
}

export default observer(CreateProductService);
