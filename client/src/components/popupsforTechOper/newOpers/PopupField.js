import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../index";
import css from "../../../components/Dialog.module.css";
import { observer } from "mobx-react-lite";

import { createOperation, patchOperation } from "../../../http/requests";
const PopupField = observer(
  ({
    open,
    setOpen,
    cell,
    setCell,
    section,
    akk,
    akkum,
    res,
    setRes,
    update,
    setUpdate,
    children,
    func,
  }) => {
    const { map } = useContext(Context);
    const { id } = useParams();
    const [isErr, setIsErr] = useState(false);
    console.log(res);
    return (
      <div
        style={open ? { display: "flex" } : { display: "none" }}
        className={css.dialog}
        onClick={() => {
          setOpen(false);
          setIsErr(false);
          setUpdate(false);
          setRes({
            nameOper: "",
            price: "",
            amount: "",
            unitsOfCost: "",
            unitsOfConsumption: "",
            nameTractor: "",
            brand: "",
            marketCost: "",
            depreciationPeriod: "",
            enginePower: "",
            fuelConsumption: "",
            numberOfPersonnel: "",
            typeOfWork: "",
          });
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
            <button
              className={css.button}
              onClick={() => {
                func(
                  id,
                  map,
                  akkum,
                  update,
                  res,
                  setIsErr,
                  setOpen,
                  cell,
                  setCell,
                  setRes,
                  akk,
                  section,
                  patchOperation,
                  createOperation
                );
              }}
            >
              Зберегти
            </button>
          </div>
          <p>
            Увага!
            <br />
            Одиниці виміру "ціни" повинні відповідати одиницям виміру "розходу"
            <br />
            Наприклад (грн/кг) відповідає (кг/га) або (грн/шт) відповідає
            (шт/га)
          </p>
        </div>
      </div>
    );
  }
);

export default PopupField;
