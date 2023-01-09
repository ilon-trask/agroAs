import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../..";
import css from "../../../components/Dialog.module.css";
import { createOperation, patchOperation } from "../../../http/requests";

const MechanicalWork = ({
  open,
  setOpen,
  cell,
  setCell,
  section,
  setSection,
  akk,
  akkum,
  res,
  setRes,
  update,
  setUpdate,
}) => {
  const { map } = useContext(Context);
  const { id } = useParams();
  const [isErr, setIsErr] = useState(false);
  return (
    <div
      style={open ? { display: "flex" } : { display: "none" }}
      className={css.dialog}
      onClick={() => {
        setOpen(false);
        setIsErr(false);
        if (update) {
          setUpdate(false);
          setRes({
            nameOper: "",
            price: "",
            amount: "",
            unitsOfCost: "",
            unitsOfConsumption: "",
          });
        }
      }}
    >
      <div
        className={css.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4>Внесіть данні для розрахунку</h4>
        <div className="">
          <div className="d-flex ">
            <p>Назва операції</p>
            <input
              placeholder="Вкажіть назву"
              type="text"
              value={res?.nameOper}
              onChange={(e) => {
                setRes({ ...res, nameOper: e.target.value });
              }}
            />
          </div>
          <div className="d-flex gap-3">
            <div>
              <p>Марка трактора</p>
              <select
              //   value={res?.nameOper}
              //   onChange={(e) => {
              //     setRes({ ...res, nameOper: e.target.value });
              //   }}
              >
                <option value="">вибрати трактор</option>
              </select>
            </div>
            <div>
              <p>Розхід палива на 1 год</p>
              <input
              // placeholder="Вкажіть ціну"
              // type="number"
              // value={res?.price}
              // onChange={(e) => {
              //   setRes({ ...res, price: e.target.value });
              // }}
              />
            </div>
            <div>
              <button className="mt-4">додати трактор</button>
            </div>
          </div>
          <div className="d-flex gap-3">
            <div>
              <p>Марка СГ машини</p>
              <select
              // value={res?.nameOper}
              // onChange={(e) => {
              //   setRes({ ...res, nameOper: e.target.value });
              // }}
              >
                <option value="">вибрати СГ машину</option>
              </select>
            </div>
            <div>
              <p>Робоча швидкість км/год</p>
              <input
              // placeholder="Вкажіть ціну"
              // type="number"
              // value={res?.price}
              // onChange={(e) => {
              //   setRes({ ...res, price: e.target.value });
              // }}
              />
            </div>
            <div>
              <button className="mt-4">додати СГ машину</button>
            </div>
          </div>
        </div>
        {isErr ? "Ви не заповнили поля" : ""}
        <div>
          <button
            className={css.button}
            onClick={() => {
              if (res.nameOper == "") {
                setIsErr(true);
              } else {
                setOpen(false);
                setCell("");
                setRes({
                  nameOper: "",
                });
                setIsErr(false);
                res.price = 1;
                res.amount = 2;
                const request = { cell, res, section };
                if (update) {
                  console.log("upd");
                  console.log(akk);
                  patchOperation(map, request, id, akkum);
                } else {
                  console.log(3);
                  createOperation(map, request, id, akk);
                }
              }
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
          Наприклад (грн/кг) відповідає (кг/га) або (грн/шт) відповідає (шт/га)
        </p>
      </div>
    </div>
  );
};

export default MechanicalWork;
