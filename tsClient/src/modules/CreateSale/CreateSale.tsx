import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../components/Dialog";
import SaleInputs from "./component/SaleInputs";
import { Button, Heading, ModalFooter } from "@chakra-ui/react";
import { patchSale } from "../../http/requests";
import { Context } from "../../main";
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
  const { income } = useContext(Context);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      setIsErr={() => {}}
      props={obj}
      res={obj}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
    >
      <Heading textAlign={"center"} fontWeight={"bold"} size={"md"}>
        Дані для розрахунку
      </Heading>
      <SaleInputs res={res} setRes={setRes} isAmount={true} />
      <ModalFooter>
        <Button
          onClick={() => {
            console.log(res);
            if (res.amount && res.date && res.price && res.productionId) {
              if (update) {
                console.log(res);

                patchSale(income, {
                  amount: res.amount,
                  date: res.date,
                  price: res.price,
                  productionId: res.productionId!,
                  saleId: res.id!,
                });
              } else {
                //@ts-ignore
                createSale(income, res);
              }
              setRes({ amount: "", date: "", price: "", productionId: "" });
              setOpen(false);
              setUpdate(false);
            }
          }}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateSale;
