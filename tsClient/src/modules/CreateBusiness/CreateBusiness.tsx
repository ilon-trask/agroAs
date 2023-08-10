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
  goal: string | null | undefined;
  responsiblePerson: string | null | undefined;
  city: string | null | undefined;
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
  const onSubmit = (data: CreateBusinessProp) => {
    if (data) {
      if (update) {
        patchBusinessPlan(map, business, {
          ...data,
          initialAmount: +data.initialAmount,
          realizationTime: +data.realizationTime,
          planId: data.planId!,
          enterpriseId: data.enterpriseId ? +data.enterpriseId : null,
        });
      } else {
        createBusinessPlan(map, business, {
          ...data,
          initialAmount: +data.initialAmount,
          realizationTime: +data.realizationTime,
          enterpriseId: data.enterpriseId ? +data.enterpriseId : null,
        });
      }
      setOpen(false);
      setUpdate(false);
      //@ts-ignore
      setRes({});
    }
  };
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      setRes={setRes}
      props={prop}
      res={obj}
      setUpdate={setUpdate}
      update={update}
    >
      <BusinessInputs res={res} func={onSubmit} buttonText={"Зберегти"} />
    </Dialog>
  );
}

export default CreateBusiness;
