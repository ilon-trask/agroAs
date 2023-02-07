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
import Button from "../ui/Button/Button";
import { FC } from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import MapStore from "../store/MapStore";
import { cartProps } from "../modules/CreateCart";
import { TracProps } from "../modules/CreateTractor";
import { MachineProps } from "../modules/CreateMachine";
import { CostHandWorkProps } from "../modules/CreateCostHandWork";
import { MaterialsProps } from "../modules/CreateCostMaterials";
export type func<T> = (
  id: number,
  map: MapStore,
  update: boolean,
  res: T,
  setIsErr: (isErr: boolean) => void,
  setOpen: (open: boolean) => void,
  cell: Icell | "",
  seCell: (cell: Icell | "") => void,
  setRes: (res: T | ((res: T) => T) | {}) => void,
  section: number | "" | undefined,
  setSection: (section: number) => void
) => void;

type resType =
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
  cell?: Icell | "";
  setCell?: (cell: Icell | "") => void;
  section?: number | "";
  setSection?: (section: number) => void;
  res: resType;
  setRes: (res: resType | ((res: resType) => resType)) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  children: ReactChild | ReactNode;
  func: func<resType>;
  props: resType;
  errMess: " " | JSX.Element;
}
const Dialog: FC<props> = observer(
  ({
    open,
    setOpen,
    cell,
    setCell,
    section,
    setSection,
    res,
    setRes,
    update,
    setUpdate,
    children,
    func,
    props,
    errMess,
  }) => {
    const { map } = useContext(Context);
    const { id } = useParams();
    const [isErr, setIsErr] = useState<boolean>(false);
    console.log(res);
    useEffect(() => {
      console.log(res);
      setRes(res);
    }, [res]);
    useEffect(() => {
      if (!update) {
        setRes(props);
      }
    }, [props]);
    return (
      <div
        style={open ? { display: "flex" } : { display: "none" }}
        className={css.dialog}
        onClick={() => {
          setOpen(false);
          setIsErr(false);
          setUpdate(false);
          setRes(props);
        }}
      >
        <div
          className={css.container}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
          {isErr ? "Ви не заповнили поля" : ""}
          <div>
            <Button
              style={{ marginTop: "10px" }}
              onClick={() => {
                func(
                  +id!,
                  map,
                  update,
                  res,
                  setIsErr,
                  setOpen,
                  cell!,
                  setCell!,
                  setRes,
                  section,
                  setSection!
                );
              }}
            >
              Зберегти
            </Button>
          </div>
          {errMess || (
            <p>
              Увага!
              <br />
              Одиниці виміру "ціни" повинні відповідати одиницям виміру
              "розходу"
              <br />
              Наприклад (грн/кг) відповідає (кг/га) або (грн/шт) відповідає
              (шт/га)
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default Dialog;
