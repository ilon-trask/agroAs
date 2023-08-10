import {
  Box,
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { reSplitAlphaNumeric } from "@tanstack/react-table";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import Dialog from "src/components/Dialog";
import { createUpdateAmortization } from "src/http/requests";
import { Context } from "src/main";
import getYearFromString from "src/shared/funcs/getYearFromString";
import MyHeading from "src/ui/MyHeading";

export interface amortizationProps {
  id?: number | null;
  introductionDate: string;
  depreciationPeriod: number | string;
  // amount: number | string;
  mainAmount: number;
  buildingId?: number;
  buyingMachineId?: number;
  busId: number;
}
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: amortizationProps;
  businessYear: number;
};
function AmortizationDialog({ data, open, setOpen, businessYear }: props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: data,
  });
  const { business } = useContext(Context);
  const onSubmit = (res: amortizationProps) => {
    setOpen(false);
    createUpdateAmortization(business, {
      ...res,
      amount: +res.mainAmount,
      year: getYearFromString(res.introductionDate) - businessYear,
      depreciationPeriod: +res.depreciationPeriod,
    });
  };

  return (
    <Dialog open={open} setOpen={setOpen}>
      <MyHeading>Розрахунок амортизації</MyHeading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Box>
            <FormLabel>Дата введення в експлуатації</FormLabel>
            <Input
              {...register("introductionDate", { required: true })}
              type="date"
            />
          </Box>
          <Box>
            <FormLabel>Термін амортизації</FormLabel>
            <Input
              {...register("depreciationPeriod", { required: true })}
              type={"number"}
              inputMode={"numeric"}
            />
          </Box>
          {data.mainAmount != 1 ? (
            <Box>
              <FormLabel>Кільксть</FormLabel>
              <Input disabled={true} value={data.mainAmount} />
            </Box>
          ) : null}
        </Box>
        <ModalFooter>
          <Button type="submit">Зберегти</Button>
        </ModalFooter>
      </form>
    </Dialog>
  );
}

export default AmortizationDialog;
