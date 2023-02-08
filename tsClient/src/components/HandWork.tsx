import { loggerLink } from "@trpc/client";
import { observer } from "mobx-react-lite";
import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import { Icost_hand_work } from "../../../tRPC serv/models/models";
import { createOperation, patchOperation } from "../http/requests";
import { Context } from "../main";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import { func, InputProps } from "./Dialog";
import style from "./Input.module.css";

export type CostHandWorkProps = {
  nameOper: string;
  gradeId: number | string;
  type: number | string;
  productionRateAmount: number | string;
  productionRateWeight: number | string;
  yieldСapacity: number | string;
  spending: number | string;
  productionRateTime: number | string;
};

const costHandWorkProps: CostHandWorkProps = {
  nameOper: "",
  gradeId: "",
  type: 1,
  productionRateAmount: "",
  productionRateWeight: "",
  yieldСapacity: "",
  spending: "",
  productionRateTime: "",
};

const createCostHandWorkFunc: func<CostHandWorkProps> = (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes,
  cell,
  setCell,
  section,
  setSection
) => {
  if (
    res.nameOper == "" ||
    (res.productionRateTime == "" &&
      (res.productionRateWeight == "" || res.yieldСapacity == "") &&
      (res.productionRateAmount == "" || res.spending == "")) ||
    res.gradeId == ""
  ) {
    setIsErr(true);
  } else {
    if (cell == undefined) return;
    setOpen(false);
    setCell!("");
    setRes(costHandWorkProps);
    setSection!("");
    setIsErr(false);
    console.log(res.type);
    res.spending = +res.spending!;
    res.yieldСapacity = +res.yieldСapacity!;
    res.gradeId = +res.gradeId!;
    res.productionRateAmount = +res.productionRateAmount!;
    res.productionRateTime = +res.productionRateTime!;
    res.productionRateWeight = +res.productionRateWeight!;

    if (res.type == 1) {
      res.productionRateAmount = 0;
      res.productionRateWeight = 0;
      res.yieldСapacity = 0;
      res.spending = 0;
    } else if (res.type == 2) {
      res.productionRateAmount = 0;
      res.productionRateTime = 0;
      res.spending = 0;
    } else if (res.type == 3) {
      res.productionRateTime = 0;
      res.productionRateWeight = 0;
      res.yieldСapacity = 0;
    }
    if (cell == "") return;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
};

const HandWork = observer(
  ({
    res,
    setRes,
    update,
    cell,
    setCell,
    setOpen,
    section,
    setSection,
    setIsErr,
  }: InputProps<CostHandWorkProps>) => {
    const { map } = useContext(Context);
    const { id } = useParams();

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
              value={res?.nameOper}
              placeholder="Вкажіть назву операції"
            />
          </div>
          <div>
            <p>Розряд робіт</p>
            <select
              value={res?.gradeId}
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
              checked={res?.type == 1}
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
                        setRes({
                          ...res,
                          productionRateWeight: e.target.value,
                        });
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
                        setRes({
                          ...res,
                          productionRateAmount: e.target.value,
                        });
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
        <Button
          onClick={() =>
            createCostHandWorkFunc(
              +id!,
              map,
              update,
              res,
              setIsErr,
              setOpen,
              setRes,
              cell!,
              setCell!,
              section,
              setSection
            )
          }
        >
          Зберегти
        </Button>
      </>
    );
  }
);

export default HandWork;
