import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Itractor } from "../../../tRPC serv/models/models";
import { createTractor, patchTractor } from "../http/requests";
import { Context } from "../main";
import { TracProps } from "../modules/CreateTractor";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input.js";
import { func } from "./Dialog";
import style from "./input.module.css";

const createTrac: func<TracProps> = function (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes
) {
  if (
    res.nameTractor == "" ||
    res.marketCost == "" ||
    res.depreciationPeriod == "" ||
    res.enginePower == "" ||
    res.fuelConsumption == "" ||
    res.numberOfPersonnel == ""
  ) {
    setIsErr(true);
  } else {
    res.marketCost = +res.marketCost;
    res.depreciationPeriod = +res.depreciationPeriod;
    res.enginePower = +res.enginePower;
    res.fuelConsumption = +res.fuelConsumption;
    res.numberOfPersonnel = +res.numberOfPersonnel;
    res.gradeId = +res.gradeId;
    setOpen(false);
    setRes({});
    setIsErr(false);
    if (update) {
      patchTractor(map, res as Itractor);
    } else {
      createTractor(map, res as Itractor);
    }
  }
};

type props = {
  res: TracProps;
  setRes: (res: TracProps | ((res: TracProps) => TracProps) | {}) => void;
  setIsErr: (isErr: boolean) => void;
  setOpen: (open: boolean) => void;
  update: boolean;
};
const CreateTractor = ({ res, setRes, setIsErr, setOpen, update }: props) => {
  const { map } = useContext(Context);
  const { id } = useParams();
  return (
    <>
      <h4>Внесіть данні для трактора</h4>
      <div className={style.machine}>
        <div>
          <p>Назва трактора</p>
          <Input
            placeholder="Вкажіть назву"
            type="text"
            value={res?.nameTractor}
            onChange={(e) => {
              setRes({ ...res, nameTractor: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Марка трактора</p>
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
          <p>Ціна трактора грн</p>
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
          <p>Термін амортизації в роках</p>
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
          <p>Потужність двигуна кВт</p>
          <Input
            placeholder="Вкажіть потіжність"
            type="number"
            value={res?.enginePower}
            onChange={(e) => {
              setRes({ ...res, enginePower: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Розхід палива на 1 год</p>
          <Input
            placeholder="Вкажіть розхід"
            type="number"
            value={res?.fuelConsumption}
            onChange={(e) => {
              setRes({ ...res, fuelConsumption: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Кількість персоналу</p>
          <Input
            placeholder="Вкажіть кількість"
            type="number"
            value={res?.numberOfPersonnel}
            onChange={(e) => {
              setRes({ ...res, numberOfPersonnel: e.target.value });
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
          createTrac(+id!, map, update, res, setIsErr, setOpen, setRes)
        }
      >
        Зберегти
      </Button>
    </>
  );
};

export default CreateTractor;
