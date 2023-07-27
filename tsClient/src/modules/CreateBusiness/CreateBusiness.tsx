import { Button, ModalFooter } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../components/Dialog";
import { createBusinessPlan, patchBusinessPlan } from "../../http/requests";
import { Context } from "../../main";
import BusinessInputs from "./components/BusinessInputs";
export type CreateBusinessProp = {
  planId?: number;
  name: string;
  initialAmount: number | "";
  dateStart: string;
  realizationTime: number | "";
  topic: string;
  enterpriseId?: number | string;
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: CreateBusinessProp;
  setRes: Dispatch<SetStateAction<CreateBusinessProp>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
const obj = {};
const prop = {
  name: "",
  dateStart: "",
  enterpriseId: "",
  initialAmount: "",
  realizationTime: "",
};
function CreateBusiness({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
}: props) {
  const { map, business } = useContext(Context);

  console.log(res);

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      setRes={setRes}
      isErr={false}
      props={prop}
      res={obj}
      setIsErr={() => {}}
      setUpdate={setUpdate}
      update={update}
    >
      <BusinessInputs res={res} setRes={setRes} />
      <ModalFooter>
        <Button
          onClick={() => {
            if (res) {
              if (update) {
                patchBusinessPlan(map, business, {
                  ...res,
                  initialAmount: +res.initialAmount,
                  realizationTime: +res.realizationTime,
                  planId: res.planId!,
                  enterpriseId: res.enterpriseId ? +res.enterpriseId : null,
                });
              } else {
                createBusinessPlan(map, business, {
                  ...res,
                  initialAmount: +res.initialAmount,
                  realizationTime: +res.realizationTime,
                  enterpriseId: res.enterpriseId ? +res.enterpriseId : null,
                });
              }
              setOpen(false);
              setUpdate(false);
              //@ts-ignore
              setRes({});
            }
          }}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateBusiness;
