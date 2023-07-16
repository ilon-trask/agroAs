import {
  Box,
  Button,
  Select,
  Text,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import Dialog from "src/components/Dialog";
import { Context } from "src/main";
interface props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function ChoseEnterprise({ open, setOpen }: props) {
  const { enterpriseStore } = useContext(Context);
  const { register, handleSubmit } = useForm({ mode: "onBlur" });
  const onSubmit = (data: any) => {};
  return (
    <></>
    // <Dialog open={open} setOpen={setOpen} setRes={() => {}} size={"md"}>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <label>
    //       <Text>Виберіть підприємство</Text>
    //       <Select {...register("enterpriseId", { required: true })}>
    //         <option value="" hidden defaultChecked>
    //           Виберіть опцію
    //         </option>
    //         {enterpriseStore.enterprise.map((el) => (
    //           <option value={el.id}>{el.name}</option>
    //         ))}
    //       </Select>
    //     </label>
    //     <ModalFooter>
    //       <Input type={"submit"}>Зберегти</Input>
    //     </ModalFooter>
    //   </form>
    // </Dialog>
  );
}

export default ChoseEnterprise;
