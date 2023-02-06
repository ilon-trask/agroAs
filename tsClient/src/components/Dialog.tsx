import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../index";
import css from "./Dialog.module.css";
import { observer } from "mobx-react-lite";
import Button from "../ui/Button/Button";

const Dialog = observer(
  ({
    open,
    setOpen,
    cell,
    setCell,
    section,
    setSection,
    res,
    setRes,
    update,
    setUpdate,
    children,
    func,
    props,
    errMess,
  }) => {
    const { map } = useContext(Context);
    const { id } = useParams();
    const [isErr, setIsErr] = useState(false);
    console.log(res);
    useEffect(() => {
      console.log(res);
      setRes(res);
    }, [res]);
    useEffect(() => {
      if (!update) {
        setRes(props);
      }
    }, [props]);
    return (
      <div
        style={open ? { display: "flex" } : { display: "none" }}
        className={css.dialog}
        onClick={() => {
          setOpen(false);
          setIsErr(false);
          setUpdate(false);
          setRes(props);
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
            <Button
              style={{ marginTop: "10px" }}
              onClick={() => {
                func(
                  id,
                  map,
                  update,
                  res,
                  setIsErr,
                  setOpen,
                  cell,
                  setCell,
                  setRes,
                  section,
                  setSection
                );
              }}
            >
              Зберегти
            </Button>
          </div>
          {errMess || (
            <p>
              Увага!
              <br />
              Одиниці виміру "ціни" повинні відповідати одиницям виміру
              "розходу"
              <br />
              Наприклад (грн/кг) відповідає (кг/га) або (грн/шт) відповідає
              (шт/га)
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default Dialog;
