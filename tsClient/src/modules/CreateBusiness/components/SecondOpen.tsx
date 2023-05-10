import {
  Box,
  Checkbox,
  Heading,
  Input,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../../components/Dialog";
import { Context } from "../../../main";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  //   update: boolean;
  //   setUpdate: Dispatch<SetStateAction<boolean>>;
  res: any;
  setRes: Dispatch<SetStateAction<any>>;
};
const obj = {};
function SecondOpen({ open, setOpen, res, setRes }: props) {
  const { map } = useContext(Context);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      update={false}
      setUpdate={() => {}}
      isErr={false}
      setRes={setRes}
      setIsErr={() => {}}
      props={obj}
      res={obj}
    >
      <Heading textAlign={"center"} size={"md"}>
        Вибір технології та площі
      </Heading>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"80%"}
        mx={"auto"}
      >
        <Text fontWeight={"bold"}>Технології</Text>
        <Text fontWeight={"bold"}>Площа</Text>
      </Box>
      {map.cultivationTechnologies.map((el) => {
        return (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            w={"80%"}
            mx={"auto"}
            mt={3}
          >
            <Checkbox>{el.name}</Checkbox>
            <Input
              type={"number"}
              inputMode={"numeric"}
              w={"200px"}
              placeholder="Вкажіть площу"
            ></Input>
          </Box>
        );
      })}
      <ModalFooter>
        <Button>Зберегти</Button>
      </ModalFooter>
    </Dialog>
  );
}

export default SecondOpen;
