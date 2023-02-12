import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

type props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  text: "карту" | "операцію";
  func: any;
};

export default function DeleteAlert({ open, setOpen, text, func }: props) {
  return (
    //@ts-ignore
    <AlertDialog onClose={() => setOpen(false)} isOpen={open} isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Видалити {text}?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>Ви дійсно хочете видалити {text}</AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={() => setOpen(false)}>Ні</Button>
          <Button colorScheme="red" ml={3} onClick={func}>
            Так
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
