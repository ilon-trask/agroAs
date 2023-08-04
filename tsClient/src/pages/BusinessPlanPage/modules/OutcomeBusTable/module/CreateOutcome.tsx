import { Box, Input, Text, ModalFooter, Button } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import Dialog from "src/components/Dialog";
import {
  createOutcomeForBusiness,
  patchOutcomeForBusiness,
} from "src/http/requests";
import { Context } from "src/main";
import MyHeading from "src/ui/MyHeading";
import { IoutcomeGroup } from "../../../../../../../tRPC serv/controllers/outComeService";
const obj = {};
export interface CreateOutcomeProps {
  id?: number;
  date: string;
  name: string;
  costMonth: number | string;
  group: IoutcomeGroup | "";
  businessPlanId?: number;
  year: number;
}
function CreateOutcome({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: CreateOutcomeProps;
}) {
  const { business } = useContext(Context);
  const { register, handleSubmit } = useForm<CreateOutcomeProps>({
    values: data,
  });
  const onSubmit = (data: CreateOutcomeProps) => {
    if (data.group) {
      if (data.id) {
        patchOutcomeForBusiness(business, {
          ...data,
          costMonth: +data.costMonth,
          group: data.group,
          outcomeId: data.id!,
          businessPlanId: data.businessPlanId!,
        });
      } else {
        createOutcomeForBusiness(business, {
          ...data,
          costMonth: +data.costMonth,
          group: data.group,
          businessPlanId: data.businessPlanId!,
        });
      }
      setOpen(false);
    }
  };
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      update={false}
      setUpdate={() => {}}
      isErr={false}
      setIsErr={() => {}}
      res={obj}
      props={obj}
      setRes={() => {}}
    >
      <MyHeading>Впишіть дані для розрахунку витрат</MyHeading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box>
            <Text>Назва витрати</Text>
            <Input
              {...register("name", { required: true })}
              placeholder="Введіть данні"
            />
          </Box>
          <Box>
            <Text>Сума за місяць</Text>
            <Input {...register("costMonth", { required: true })} />
          </Box>
        </Box>
        <ModalFooter>
          <Button type={"submit"}>Зберегти</Button>
        </ModalFooter>
      </form>
    </Dialog>
  );
}

export default CreateOutcome;
