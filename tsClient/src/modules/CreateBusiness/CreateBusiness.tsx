import { Button, Heading, Input, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Dialog from "../../components/Dialog";
import { createBusinessPlan } from "../../http/requests";
import { Context } from "../../main";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
function CreateBusiness({ open, setOpen }: props) {
  const { map, business } = useContext(Context);
  const [res, setRes] = useState("");
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      setRes={() => {}}
      isErr={false}
      props={{}}
      res={{}}
      setIsErr={() => {}}
      setUpdate={() => {}}
      update={false}
    >
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Внесіть дані для розрахунку
      </Heading>
      <Text>Вкажіть назву</Text>
      <Input placeholder="Впишіть назву" />
      <Button
        onClick={() => {
          if (res) {
            createBusinessPlan(map, business, { name: res });
          }
        }}
      >
        Зберегти
      </Button>
    </Dialog>
  );
}

export default CreateBusiness;
