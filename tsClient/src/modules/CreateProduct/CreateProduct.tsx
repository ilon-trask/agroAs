import {
  Box,
  Input,
  Select,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../components/Dialog";
import { createProduct } from "../../http/requests";
import { Context } from "../../main";
import ProductInputs from "./components/ProductInputs";
type props = {
  res: CreateProductProps;
  setRes: Dispatch<SetStateAction<CreateProductProps>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const obj = {};
export type CreateProductProps = {
  name: string;
  cultureId: number | "";
};
function CreateProduct({ open, setOpen, res, setRes }: props) {
  const { map } = useContext(Context);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      props={obj}
      res={obj}
      setRes={setRes}
      setIsErr={() => {}}
      setUpdate={() => {}}
      update={false}
    >
      <ProductInputs res={res} setRes={setRes} />
      <ModalFooter>
        <Button
          isDisabled={!res.name || !res.cultureId}
          onClick={() => {
            if (res.name && res.cultureId) {
              //@ts-ignore
              createProduct(map, res);
              setOpen(false);
              //@ts-ignore
              setRes({});
            }
          }}
        >
          Збегерти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateProduct;
