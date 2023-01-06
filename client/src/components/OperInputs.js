import React, { useState } from "react";
import { useParams } from "react-router-dom";
import css from "../components/Dialog.module.css";

export default function FormDataCalc({
  open,
  setOpen,
  cell,
  setCell,
  getData,
}) {
  const URL = "http://localhost:5000/api/cart/:id";
  const id = useParams();
  const [res, setRes] = useState({});
  function createOperation(arr) {
    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id.id, arr }),
    }).then(getData);
  }
  return (
    <div
      style={open ? { display: "flex" } : { display: "none" }}
      className={css.dialog}
      onClick={() => {
        setOpen(false);
      }}
    >
      <div
        className={css.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4>Внесіть данні для розрахунку</h4>
        <div className="d-flex gap-3 ">
          <div>
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
          <div>
            <p>Ціна</p>
            <input
              placeholder="Вкажіть ціну"
              type="text"
              value={res?.price}
              onChange={(e) => {
                setRes({ ...res, price: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Одиниці виміру</p>
            <input
              placeholder="Вкажіть одиниці виміру ціни"
              type="text"
              value={res?.unitsOfCost}
              onChange={(e) => {
                setRes({ ...res, unitsOfCost: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Розхід на 1 га</p>
            <input
              placeholder="Вкажіть розхід"
              type="text"
              value={res?.consumption}
              onChange={(e) => {
                setRes({ ...res, consumption: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Одиниця виміру розходу</p>
            <input
              placeholder="Вкажіть одиниці виміру розходу"
              type="text"
              value={res?.unitsOfConsumption}
              onChange={(e) => {
                console.log(res);
                setRes({ ...res, unitsOfConsumption: e.target.value });
              }}
            />
          </div>
        </div>
        <div>
          <button
            className={css.button}
            onClick={() => {
              console.log(12);
              setOpen(false);
              const request = { cell, res };
              console.log(request);
              createOperation(request);
              getData();
            }}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}
