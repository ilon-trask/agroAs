import React, { ReactChild, ReactNode, useEffect } from "react";
import { observer } from "mobx-react-lite";
// import Button from "../ui/Button/Button";
import { FC } from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import MapStore from "../store/MapStore";
import { cartProps } from "../modules/CreateCart";
import { TracProps } from "../modules/CreateTractor/CreateTractor";
import { MachineProps } from "../modules/CreateMachine/CreateMachine";
import { CostHandWorkProps } from "../modules/CreateCostHandWork/CreateCostHandWork";
import { MaterialsProps } from "../modules/CreateCostMaterials/CreateCostMaterials";
import { Modal, ModalOverlay, ModalContent, Center } from "@chakra-ui/react";
import { BusinessProps } from "../modules/CreateBusiness/CreateBusinessPlan";
export type func<T> = (
  id: number,
  map: MapStore,
  update: boolean,
  res: T,
  setIsErr: (isErr: boolean) => void,
  setOpen: (open: boolean) => void,
  setRes: (res: T | ((res: T) => T) | {}) => void,
  cell?: Icell | "",
  seCell?: (cell: Icell | "") => void,
  section?: number | "" | undefined,
  setSection?: (section: number | "") => void
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
  | BusinessProps
  | {};

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  res: resType;
  setRes: (res: any | ((res: any) => any)) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  children: ReactChild | ReactNode;
  props: resType;
  isErr: boolean;
  setIsErr: (isErr: boolean) => void;
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
  }) => {
    // useEffect(() => {
    //   setRes(res);
    //   // console.log(123);
    // }, [res]);
    useEffect(() => {
      if (!update) {
        setRes(props);
      }
    }, [props]);
    return (
      <Modal
        size={"2xl"}
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setIsErr(false);
          setUpdate(false);
          setRes(props);
        }}
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
