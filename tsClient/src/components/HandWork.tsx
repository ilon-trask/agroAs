import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Icost_hand_work } from "../../../tRPC serv/models/models";
import { Context } from "../main";
import { CostHandWorkProps } from "../modules/CreateCostHandWork";
import Input from "../ui/Input/Input";
import style from "./Input.module.css";

type props = {
  res: CostHandWorkProps;
  setRes: (res: CostHandWorkProps) => void;
};

const HandWork = observer(({ res, setRes }: props) => {
  const { map } = useContext(Context);
  return (
    <>
      <div className={style.mechanical}>
        <div>
          <p>Назва операції</p>
          <Input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRes({ ...res, nameOper: e.target.value });
            }}
            value={res.nameOper}
            placeholder="Вкажіть назву операції"
          />
        </div>
        <div>
          <p>Розряд робіт</p>
          <select
            value={res.gradeId}
            onChange={(e) => {
              setRes({ ...res, gradeId: +e.target.value });
            }}
          >
            <option value="" selected disabled hidden>
              Виберіть розряд робіт
            </option>
            {map.grade.map((el) => (
              <option value={el.id}>{el.indicator}</option>
            ))}
          </select>
        </div>
      </div>
      <form>
        <div className={style.hand}>
          <input
            type="radio"
            checked={res.type == 1}
            onClick={() => {
              setRes({
                ...res,
                type: 1,
                productionRateAmount: "",
                productionRateWeight: "",
                yieldСapacity: "",
                spending: "",
              });
            }}
          />
          <div
            onClick={() => {
              setRes({
                ...res,
                type: 1,
                productionRateAmount: "",
                productionRateWeight: "",
                yieldСapacity: "",
                spending: "",
              });
            }}
          >
            <p>Норма виробітку годин</p>
            <div className={style.hand}>
              <Input
                value={res.productionRateTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRes({ ...res, productionRateTime: e.target.value });
                }}
                type="number"
                disabled={res.type !== 1}
              />
              <p>м²/год</p>
            </div>
          </div>
        </div>
        <div
          className={style.hand}
          onClick={() => {
            setRes({
              ...res,
              type: 2,
              productionRateAmount: "",
              productionRateTime: "",
              spending: "",
            });
          }}
        >
          <input
            type="radio"
            checked={res.type == 2}
            onClick={() => {
              setRes({
                ...res,
                type: 2,
                productionRateAmount: "",
                productionRateTime: "",
                spending: "",
              });
            }}
          />
          <div>
            <div className={style.hand}>
              <div>
                <p>Норма виробітку ваги</p>
                <div className={style.hand}>
                  <Input
                    value={res.productionRateWeight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRes({ ...res, productionRateWeight: e.target.value });
                    }}
                    type="number"
                    disabled={res.type !== 2}
                  />
                  <p>кг/год</p>
                </div>
              </div>
              <div>
                <p>Урожайність з 1 га</p>
                <div className={style.hand}>
                  <Input
                    value={res.yieldСapacity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRes({ ...res, yieldСapacity: e.target.value });
                    }}
                    type="number"
                    disabled={res.type !== 2}
                  />
                  <p>кг/га</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={style.hand}
          onClick={() => {
            setRes({
              ...res,
              type: 3,
              productionRateTime: "",
              productionRateWeight: "",
              yieldСapacity: "",
            });
          }}
        >
          <input
            type="radio"
            checked={res.type == 3}
            onClick={() => {
              setRes({
                ...res,
                type: 3,
                productionRateTime: "",
                productionRateWeight: "",
                yieldСapacity: "",
              });
            }}
          />
          <div>
            <div className={style.hand}>
              <div>
                <p>Норма виробітку кількість</p>
                <div className={style.hand}>
                  <Input
                    value={res.productionRateAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRes({ ...res, productionRateAmount: e.target.value });
                    }}
                    type="number"
                    disabled={res.type !== 3}
                  />
                  <p>шт/год</p>
                </div>
              </div>
              <div>
                <p>Розхід на 1 га</p>
                <div className={style.hand}>
                  <Input
                    value={res.spending}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRes({ ...res, spending: e.target.value });
                    }}
                    type="number"
                    disabled={res.type !== 3}
                  />
                  <p>шт/га</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
});

export default HandWork;
