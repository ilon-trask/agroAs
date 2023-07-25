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
export type IdeleteHeading =
  | "карту"
  | "операцію"
  | "бізнес-план"
  | "планування"
  | "продаж"
  | "прибуток"
  | "кредит"
  | "інвестицію"
  | "державну допомогу"
  | "грант"
  | "покупку техніки"
  | "адміністрування"
  | "виробинцтво"
  | "земельну ділянку"
  | "будівлю"
  | "спеціалізацію"
  | "фінансування"
  | "техніку"
  | "будівлю"
  | "витрату"
  | "МШП"
  | "підприємство";
export type DeleteProps = {
  isOpen: boolean;
  text: IdeleteHeading;
  func: any;
};
type prop = {
  isOpen: boolean;
  setOpen: any;
  text: IdeleteHeading;
  func: any;
};
export default function DeleteAlert({ isOpen, setOpen, text, func }: prop) {
  return (
    //@ts-ignore
    <AlertDialog onClose={() => setOpen(false)} isOpen={isOpen} isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Видалити {text}?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>Ви дійсно хочете видалити {text}</AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={() => setOpen({ isOpen: false })}>Ні</Button>
          <Button colorScheme="red" ml={3} onClick={func}>
            Так
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
