import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import Input from "../ui/Input/Input";
import { materialsProps, MaterialsProps } from "../modules/CreateCostMaterials";
import style from "./Input.module.css";
import { func, InputProps } from "./Dialog";
import { createOperation, patchOperation } from "../http/requests";
import { Context } from "../main";
import Button from "../ui/Button/Button";
import { useParams } from "react-router-dom";
import { Icell } from "../../../tRPC serv/controllers/OperService";

const createMaterials: func<MaterialsProps> = function (
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
) {
  if (
    res.nameOper == "" ||
    res.price == "" ||
    res.consumptionPerHectare == ""
  ) {
    setIsErr(true);
  } else {
    if (cell == undefined) return;
    console.log(update);
    setOpen(false);
    setCell!("");
    setRes(materialsProps);
    setIsErr(false);
    res.consumptionPerHectare = +res.consumptionPerHectare;
    res.price = +res.price;
    if (cell == "") return;
    const request = { cell, res, section };
    if (update) {
      patchOperation(map, request, id);
    } else {
      createOperation(map, request, id);
    }
  }
};

const Easy = observer(
  ({
    res,
    setRes,
    cell,
    section,
    setCell,
    setIsErr,
    setOpen,
    setSection,
    update,
  }: InputProps<MaterialsProps>) => {
    const { map } = useContext(Context);
    const { id } = useParams();

    return (
      <>
        <h4>Внесіть данні для розрахунку</h4>
        <div className={style.mechanical}>
          <div>
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
          <div>
            <p>Ціна</p>
            <Input
              placeholder="Вкажіть ціну"
              type="number"
              value={res?.price}
              onChange={(e) => {
                setRes({ ...res, price: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Одиниці виміру ціни</p>
            <Input
              placeholder="Вкажіть одиниці"
              type="text"
              value={res?.unitsOfCost}
              onChange={(e) => {
                setRes({ ...res, unitsOfCost: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Розхід/кількість на 1 га</p>
            <Input
              placeholder="Вкажіть розхід"
              type="number"
              value={res?.consumptionPerHectare}
              onChange={(e) => {
                setRes({ ...res, consumptionPerHectare: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Одиниці виміру розходу</p>
            <Input
              placeholder="Вкажіть одиниці"
              type="text"
              value={res?.unitsOfConsumption}
              onChange={(e) => {
                setRes({ ...res, unitsOfConsumption: e.target.value });
              }}
            />
          </div>
        </div>
        <Button
          onClick={() =>
            createMaterials(
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

export default Easy;
