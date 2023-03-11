import Dialog from "../../components/Dialog";
import MechanicalWork from "./components/MechanicalWork";
import { createOperProps } from "../../pages/TechnologicalMap";
export type MechanicalWorkProps = {
  nameOper: string;
  date: string;
  idMachine: string | number;
  idTractor: string | number;
  workingSpeed: string | number;
  fuelConsumption: string | number;
};
interface CreateCostMechanicalProps
  extends createOperProps<MechanicalWorkProps> {
  setShowAlert: (showAlert: boolean) => void;
}
export const mechanicalWorkProps: MechanicalWorkProps = {
  nameOper: "",
  date: "",
  idMachine: "",
  idTractor: "",
  workingSpeed: "",
  fuelConsumption: "",
};

let cell: "costMechanical" = "costMechanical";

export default function CreateCostMechanical({
  open,
  setOpen,
  setCell,
  section,
  setSection,
  res,
  setRes,
  update,
  setUpdate,
  isErr,
  setIsErr,
  setShowAlert,
}: CreateCostMechanicalProps) {
  return (
    <Dialog
      res={res}
      open={open}
      setOpen={setOpen}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={mechanicalWorkProps}
      isErr={isErr}
      setIsErr={setIsErr}
      errMess={
        <span>
          <b>Увага!</b>
          <br />
          Редагувати можна тільки вибраний трактор або СГ машину
          <br />
          Збільшення розходу палива збільшує суму витрат <br />
          Збільшення робочої швидкості зменшує суму витрат
        </span>
      }
    >
      <MechanicalWork
        res={res as MechanicalWorkProps}
        setRes={setRes}
        cell={cell}
        setCell={setCell}
        section={section}
        setSection={setSection}
        setIsErr={setIsErr}
        setOpen={setOpen}
        update={update}
        setShowAlert={setShowAlert}
      />
    </Dialog>
  );
}
