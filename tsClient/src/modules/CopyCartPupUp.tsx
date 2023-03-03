import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  Text,
  Box,
  Heading,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Itech_cart } from "../../../tRPC serv/models/models";
import { makeCopyCarts } from "../http/requests";

type props = { open: boolean; setOpen: (open: boolean) => void };
function CopyCartPupUp({ open, setOpen }: props) {
  const [checked, setChecked] = useState(0);
  const { map } = useContext(Context);
  function checkedSetter(el: Itech_cart) {
    setChecked(el.id!);
  }
  return (
    <Modal
      size={"2xl"}
      isOpen={open}
      onClose={() => {
        setOpen(false);
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Виберіть карти для копіювання
        </Heading>
        <Box width={"60%"} mx={"auto"}>
          {map.copyCarts.map((el) => (
            <Box
              display={"flex"}
              gap={"10px"}
              p={"10px"}
              my={"10px"}
              border={"1px"}
              borderRadius={"10px"}
              onClick={() => {
                checkedSetter(el);
              }}
              onChange={() => {
                checkedSetter(el);
              }}
            >
              <Checkbox isChecked={el.id == checked} />
              <Box>{el.nameCart}</Box>
            </Box>
          ))}
        </Box>
        <Box ml={"auto"} mr={"20px"} mb={"10px"}>
          <Button
            isActive={checked == 0}
            onClick={() => {
              makeCopyCarts(checked);
            }}
          >
            Скопіювати
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
}

export default observer(CopyCartPupUp);
