import React, {
  ReactChild,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../main";
import css from "./Dialog.module.css";
import { observer } from "mobx-react-lite";
// import Button from "../ui/Button/Button";
import { FC } from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import MapStore from "../store/MapStore";
import { cartProps } from "../modules/CreateCart";
import { TracProps } from "../modules/CreateTractor";
import { MachineProps } from "../modules/CreateMachine";
import { CostHandWorkProps } from "../modules/CreateCostHandWork";
import { MaterialsProps } from "../modules/CreateCostMaterials";
import {
  Box,
  Heading,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Center,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
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
  | {};

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  res: resType;
  setRes: (res: resType | ((res: resType) => resType)) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  children: ReactChild | ReactNode;
  props: resType;
  errMess?: " " | JSX.Element;
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
    errMess,
    isErr,
    setIsErr,
  }) => {
    useEffect(() => {
      setRes(res);
    }, [res]);
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
          <Center>{isErr ? "Ви не заповнили поля" : ""}</Center>

          {errMess ? (
            <Text w={"590px"} mx={"auto"} paddingBottom={"10px"}>
              {errMess}
            </Text>
          ) : (
            <Text w={"590px"} mx={"auto"}>
              <b>Увага!</b>
              <br />
              Одиниці виміру "ціни" повинні відповідати одиницям виміру
              "розходу"
              <br />
              Наприклад (грн/кг) відповідає (кг/га) або (грн/шт) відповідає
              (шт/га)
            </Text>
          )}
        </ModalContent>
      </Modal>
    );
  }
);

export default Dialog;
