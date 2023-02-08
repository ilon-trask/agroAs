import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Imachine } from "../../../tRPC serv/models/models";
import { createMachine, patchMachine } from "../http/requests";
import { Context } from "../main";
import { CostHandWorkProps } from "../modules/CreateCostHandWork";
import { machineProps, MachineProps } from "../modules/CreateMachine";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input.js";
import { func, InputProps } from "./Dialog";
import style from "./input.module.css";

const createMachineFunc: func<MachineProps> = function (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes
) {
  if (
    res.nameMachine == "" ||
    res.brand == "" ||
    res.marketCost == "" ||
    res.depreciationPeriod == "" ||
    res.widthOfCapture == "" ||
    res.workingSpeed == ""
  ) {
    setIsErr(true);
  } else {
    setOpen(false);
    setRes(machineProps);
    setIsErr(false);
    res.marketCost = +res.marketCost;
    res.depreciationPeriod = +res.depreciationPeriod;
    res.widthOfCapture = +res.widthOfCapture;
    res.workingSpeed = +res.workingSpeed;
    res.numberOfServicePersonnel = +res.numberOfServicePersonnel;
    res.gradeId = +res.gradeId;
    if (update) {
      patchMachine(map, res as Imachine);
    } else {
      createMachine(map, res as Imachine);
    }
  }
};
type props = {
  res: MachineProps;
  setRes: (
    res: MachineProps | ((res: MachineProps) => MachineProps) | {}
  ) => void;
  setIsErr: (isErr: boolean) => void;
  setOpen: (open: boolean) => void;
  update: boolean;
};
function CreateAgriculturalMachine({
  res,
  setRes,
  setIsErr,
  setOpen,
  update,
}: props) {
  const { map } = useContext(Context);
  const { id } = useParams();
  return (
    <>
      <h4>Внесіть данні для СГ машини</h4>
      <div className={style.machine}>
        <div>
          <p>Назва СГ машини</p>
          <Input
            placeholder="Вкажіть назву"
            type="text"
            value={res?.nameMachine}
            onChange={(e) => {
              setRes({ ...res, nameMachine: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Марка СГ машини</p>
          <Input
            placeholder="Вкажіть марку"
            type="text"
            value={res?.brand}
            onChange={(e) => {
              setRes({ ...res, brand: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Ціна СГ машини грн</p>
          <Input
            placeholder="Вкажіть ціну"
            type="number"
            value={res?.marketCost}
            onChange={(e) => {
              setRes({ ...res, marketCost: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Термін амортизації в роках </p>
          <Input
            placeholder="Вкажіть термін"
            type="number"
            value={res?.depreciationPeriod}
            onChange={(e) => {
              setRes({ ...res, depreciationPeriod: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Ширина захвату</p>
          <Input
            placeholder="Вкажіть потіжність"
            type="number"
            step="0.01"
            value={res?.widthOfCapture}
            onChange={(e) => {
              setRes({ ...res, widthOfCapture: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Робоча швидкість</p>
          <Input
            placeholder="Вкажіть потіжність"
            type="number"
            value={res?.workingSpeed}
            onChange={(e) => {
              setRes({ ...res, workingSpeed: e.target.value });
            }}
          />
        </div>

        <div>
          <p>
            Кількість обслуговуючого
            <br /> персоналу
          </p>
          <Input
            placeholder="Вкажіть кількість"
            type="number"
            value={res?.numberOfServicePersonnel}
            onChange={(e) => {
              setRes({ ...res, numberOfServicePersonnel: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Розряд роботи</p>
          <select
            value={res.gradeId}
            onChange={(e) => {
              setRes({ ...res, gradeId: e.target.value });
            }}
          >
            <option selected disabled hidden value="">
              Виберіть тип роботи
            </option>
            {map.grade.map((el) => (
              <option value={el.id}>{el.indicator}</option>
            ))}
          </select>
        </div>
      </div>
      <Button
        onClick={() =>
          createMachineFunc(+id!, map, update, res, setIsErr, setOpen, setRes)
        }
      >
        Зберегти
      </Button>
    </>
  );
}

export default CreateAgriculturalMachine;
