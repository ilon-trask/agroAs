import React, { useState, useContext, ChangeEvent } from "react";
import { Context } from "../main";
import style from "./Input.module.css";
import CreateTractor, { TracProps } from "../modules/CreateTractor";
import CreateMachine, { MachineProps } from "../modules/CreateMachine";
import { observer } from "mobx-react-lite";
import Input from "../ui/Input/Input";
import { MechanicalWorkProps } from "../modules/CreateCostMechanical";

type props = {
  res: MechanicalWorkProps;
  setRes: (
    res:
      | MechanicalWorkProps
      | ((res: MechanicalWorkProps) => MechanicalWorkProps)
  ) => void;
};

const MechanicalWork = observer(({ res, setRes }: props) => {
  const [inRes, setInRes] = useState<TracProps | MachineProps | {}>({});
  //   {
  //   nameTractor: "",
  //   brand: "",
  //   marketCost: "",
  //   depreciationPeriod: "",
  //   enginePower: "",
  //   fuelConsumption: "",
  //   numberOfPersonnel: "",
  //   gradeId: "",
  // }
  // const [machineRes, setMachineRes] = useState({});
  //   {
  //   nameMachine: "",
  //   brand: "",
  //   marketCost: "",
  //   depreciationPeriod: "",
  //   widthOfCapture: "",
  //   workingSpeed: "",
  //   numberOfServicePersonnel: "",
  //   gradeId: "",
  // }
  const [tractorOpen, setTractorOpen] = useState(false);
  const [agriculturalOpen, setAgriculturalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const { map } = useContext(Context);
  return (
    <div>
      <h4>Внесіть данні для розрахунку</h4>
      <div>
        <div className={style.mechanical}>
          <p>Назва операції</p>
          <Input
            placeholder="Вкажіть назву"
            type="text"
            value={res?.nameOper}
            onChange={(e) => {
              setRes({ ...res, nameOper: e.target.value });
            }}
          />
        </div>
        <div className={style.mechanical}>
          <div style={{ height: "min-content", margin: "auto 0 0" }}>
            <button
              onClick={() => {
                if (res.idTractor) {
                  let [second] = map.tractor.filter(
                    (el) => el.id == res.idTractor
                  );
                  setInRes(second);
                  setUpdate(true);
                  setTractorOpen(true);
                }
              }}
            >
              Ред вибраний трактор
            </button>
            <select
              value={res.idTractor}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setRes(() => {
                  const [tractor] = map.tractor.filter(
                    (el) => el.id! == +e.target.value
                  );
                  return {
                    ...res,
                    fuelConsumption: tractor.fuelConsumption,
                  };
                });
                setRes((prev) => ({ ...prev, idTractor: e.target.value }));
              }}
            >
              <option value="" hidden>
                вибрати трактор
              </option>
              {map.tractor.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.nameTractor}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Розхід палива на 1 год</p>

            <Input
              placeholder="Вкажіть ціну"
              type="number"
              value={res?.fuelConsumption}
              onChange={(e) => {
                setRes(() => {
                  return { ...res, fuelConsumption: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <button
              className="mt-4"
              onClick={() => {
                setTractorOpen(true);
              }}
            >
              додати трактор
            </button>
          </div>
        </div>
        <div className={style.mechanical}>
          <div style={{ height: "min-content", margin: "auto 0 0" }}>
            <button
              onClick={() => {
                if (res.idMachine) {
                  let [second] = map.machine.filter(
                    (el) => el.id == res.idMachine
                  );
                  //@ts-ignore
                  setInRes(second);
                  setUpdate(true);
                  setAgriculturalOpen(true);
                }
              }}
            >
              Ред вибрану СГ машину
            </button>
            <select
              value={res.idMachine}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setRes(() => {
                  const machine = map.machine.filter(
                    (el) => el.id! == +e.target.value
                  );
                  return { ...res, workingSpeed: machine[0].workingSpeed };
                });
                setRes((prev) => ({ ...prev, idMachine: e.target.value }));
              }}
            >
              <option value="" hidden>
                вибрати СГ машину
              </option>
              {map?.machine?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.nameMachine}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Робоча швидкість км/год</p>
            <Input
              placeholder="Вкажіть швидкість"
              type="number"
              value={res?.workingSpeed}
              onChange={(e) => {
                setRes({ ...res, workingSpeed: e.target.value });
              }}
            />
          </div>
          <div>
            <button
              className="mt-4"
              onClick={() => {
                setAgriculturalOpen(true);
              }}
            >
              додати СГ машину
            </button>
          </div>
        </div>
      </div>
      <CreateTractor
        open={tractorOpen}
        setOpen={setTractorOpen}
        res={inRes as TracProps}
        setRes={setInRes}
        update={update}
        setUpdate={setUpdate}
      />
      <CreateMachine
        open={agriculturalOpen}
        setOpen={setAgriculturalOpen}
        res={inRes as MachineProps}
        setRes={setInRes}
        update={update}
        setUpdate={setUpdate}
      />
    </div>
  );
});

export default MechanicalWork;
