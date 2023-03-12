import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Heading,
  Checkbox,
  Button,
  Text,
} from "@chakra-ui/react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { makeCopyMachine } from "../http/requests";

type props = { open: boolean; setOpen: (open: boolean) => void };
function CopyTractorPopUp({ open, setOpen }: props) {
  const [checked, setChecked] = useState(0);
  const { map } = useContext(Context);

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
          Виберіть СГ машину для копіювання
        </Heading>
        <Box width={"60%"} mx={"auto"}>
          {map.copyMachine[0] ? (
            map.copyMachine.map((el) => (
              <Box
                key={el.id}
                display={"flex"}
                gap={"10px"}
                p={"10px"}
                my={"10px"}
                border={"1px"}
                borderRadius={"10px"}
                onClick={() => {
                  setChecked(el.id!);
                }}
                onChange={() => {
                  setChecked(el.id!);
                }}
              >
                <Checkbox isChecked={el.id == checked} />
                <Box>{el.brand}</Box>
              </Box>
            ))
          ) : (
            <Text textAlign={"center"}>
              Немає доступних СГ машин для копіювання
            </Text>
          )}
        </Box>
        <Box ml={"auto"} mr={"20px"} mb={"10px"}>
          <Button
            isActive={checked == 0}
            onClick={() => {
              if (checked != 0) makeCopyMachine(map, checked);
            }}
          >
            Скопіювати
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
}

export default observer(CopyTractorPopUp);
