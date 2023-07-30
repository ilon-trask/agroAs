import React, {
  Dispatch,
  ReactChild,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import MapStore from "../store/MapStore";
import { cartProps } from "../modules/CreateCart";
import { TracProps } from "../modules/CreateTractor/CreateTractor";
import { MachineProps } from "../modules/CreateMachine/CreateMachine";
import { CostHandWorkProps } from "../modules/CreateCostHandWork/CreateCostHandWork";
import { MaterialsProps } from "../modules/CreateCostMaterials/CreateCostMaterials";
import { Modal, ModalOverlay, ModalContent, Center } from "@chakra-ui/react";
export type func<T> = (
  id: number,
  map: MapStore,
  update: boolean,
  res: T,
  setIsErr: (isErr: boolean) => void,
  setOpen: (open: boolean) => void,
  setRes: Dispatch<SetStateAction<T>>,
  cell?: Icell | "",
  seCell?: (cell: Icell | "") => void,
  section?: number | "" | undefined,
  setSection?: (section: number | "") => void,
  setUpdate?: Dispatch<SetStateAction<boolean>>,
  complex?: boolean,
  setComplex?: Dispatch<SetStateAction<boolean>>
) => void;

export type InputProps<T> = {
  res: T;
  setRes: (res: T | ((res: T) => T) | {}) => void;
  update: boolean;
  cell?: Icell;
  setCell?: (cell: Icell | "") => void;
  setOpen: (open: boolean) => void;
  section: number | "";
  setSection: (section: number | "") => void;
  setIsErr: (isErr: boolean) => void;
};

export type resType =
  | cartProps
  | TracProps
  | MachineProps
  | CostHandWorkProps
  | MaterialsProps
  | MachineProps
  | {};

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  res?: resType;
  setRes?: (res: any | ((res: any) => any)) => void;
  update?: boolean;
  setUpdate?: (update: boolean) => void;
  children: ReactChild | ReactNode;
  props?: resType;
  isErr?: boolean;
  setIsErr?: (isErr: boolean) => void;
  setComplex?: Dispatch<SetStateAction<boolean>>;
  size?:
    | "2xl"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xs"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
  onClose?: () => void;
}
const Dialog: FC<props> = observer(
  ({
    open,
    setOpen,
    res,
    setRes,
    update,
    setUpdate,
    children,
    props,
    isErr,
    setIsErr,
    setComplex,
    size,
    onClose,
  }) => {
    // useEffect(() => {
    //   setRes(res);
    //   // console.log(123);
    // }, [res]);
    useEffect(() => {
      if (!update) {
        if (setRes) setRes(props);
      }
    }, [props]);
    return (
      <Modal
        size={size || "2xl"}
        isOpen={open}
        onClose={() => {
          setOpen(false);
          if (setIsErr) setIsErr(false);
          if (setUpdate) setUpdate(false);
          if (setRes) setRes(props);
          if (setComplex) setComplex(false);
          if (onClose) onClose();
        }}
        onCloseComplete={() => {}}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          {children}
          <Center>{isErr ? "Ви не заповнили поля" : null}</Center>
        </ModalContent>
      </Modal>
    );
  }
);

export default Dialog;
