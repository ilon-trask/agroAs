import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  Radio,
  Select,
  Text,
  ModalFooter,
} from "@chakra-ui/react";
import { refStructEnhancer } from "mobx/dist/internal";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Dialog from "../../components/Dialog";
import { createBusinessPlan, patchBusinessPlan } from "../../http/requests";
import { Context } from "../../main";
import BusinessInputs from "./components/BusinessInputs";
export type CreateBusinessProp = {
  planId?: number;
  name: string;
  initialAmount: number | "";
  cultureIds: { id: number; tech: { techId: number; area: number }[] }[];
  enterpriseId: number | "";
  dateStart: string;
  realizationTime: number | "";
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
  cultureIds: [],
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
      <BusinessInputs res={res} setRes={setRes} isEnterprise={true} />
      <ModalFooter>
        <Button
          onClick={() => {
            if (res) {
              res.initialAmount = +res.initialAmount;
              res.realizationTime = +res.realizationTime;
              res.cultureIds.forEach((el) => {
                el.tech.forEach((e) => {
                  e.techId = +e.techId;
                  e.area = +e.area;
                });
              });
              if (update) {
                //@ts-ignore
                patchBusinessPlan(map, business, res);
              } else {
                //@ts-ignore
                createBusinessPlan(map, business, res);
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
