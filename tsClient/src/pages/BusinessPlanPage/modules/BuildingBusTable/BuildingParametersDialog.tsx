import { Box, Button, FormLabel, Input, ModalFooter } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import Dialog from "src/components/Dialog";
import { patchBuilding, patchBuildingForBusiness } from "src/http/requests";
import { Context } from "src/main";
import { CreateBuildingProps } from "src/modules/CreateBuilding/CreateBuilding";
import MyHeading from "src/ui/MyHeading";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: CreateBuildingProps;
};

export interface BuildingParameterProps {
  introductionDate: string;
  depreciationPeriod: number;
}
function BuildingParametersDialog({ open, setOpen, data }: props) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      introductionDate: "",
      depreciationPeriod: 25,
    },
    values: data,
  });
  const { business } = useContext(Context);
  const onSubmit = (data: CreateBuildingProps) => {
    setOpen(false);
    patchBuildingForBusiness(business, {
      ...data,
      buildId: data.id!,
      depreciationPeriod: +data.depreciationPeriod!,
      startPrice: +data.startPrice,
      businessPlanId: +data.businessPlanId!,
    });
  };
  return (
    <Dialog open={open} setOpen={setOpen}>
      <MyHeading>Розрахунок амортизації</MyHeading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Box>
            <FormLabel>Дата введення в експлуатації</FormLabel>
            <Input {...register("introductionDate")} type="date" />
          </Box>
          <Box>
            <FormLabel>Термін амортизації</FormLabel>
            <Input {...register("depreciationPeriod")} />
          </Box>
        </Box>
        <ModalFooter>
          <Button type="submit">Зберегти</Button>
        </ModalFooter>
      </form>
    </Dialog>
  );
}

export default BuildingParametersDialog;
