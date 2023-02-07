import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import { Context } from "../main";
import css from "./Dialog.module.css";

type props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSecondOpen: (open: boolean) => void;
  cell: Icell | "";
  setCell: (cell: Icell | "") => void;
  section: number | "";
  setSection: (section: number | "") => void;
};

function OperSection({
  open,
  setOpen,
  setSecondOpen,
  cell,
  setCell,
  section,
  setSection,
}: props) {
  const [isErr, setIsErr] = useState(false);
  const { map } = useContext(Context);
  return (
    <div
      style={open ? { display: "flex" } : { display: "none" }}
      className={css.dialog}
      onClick={() => {
        setOpen(false);
        setIsErr(false);
        setCell("");
        setSection("");
      }}
    >
      <div
        className={css.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="d-flex gap-5">
          <div className="">
            <h4>Виберіть розділ</h4>
            <div className="d-flex gap-3 ">
              <div>
                <select
                  onChange={(e) => {
                    setSection(+e.target.value);
                  }}
                  value={section}
                >
                  <option selected disabled hidden value="">
                    Виберіть розділ
                  </option>
                  {map.section?.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <h4>Виберіть тип</h4>
            <div className="d-flex gap-3 ">
              <div>
                <select
                  onChange={(e) => {
                    setCell(e.target.value as Icell);
                  }}
                  value={cell}
                  defaultValue={""}
                >
                  <option disabled hidden value="">
                    Виберіть тип
                  </option>
                  <option value="costMechanical">Механізовані роботи</option>
                  <option value="costHandWork">Ручні роботи</option>
                  <option value="costMaterials">Матеріали</option>
                  <option value="costServices">Послуги</option>
                  <option value="costTransport">Транспортування</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h4>Одиниці виміру</h4>
            <div className="d-flex gap-3 ">
              <div>
                <select onChange={(e) => {}} value={cell} defaultValue={""}>
                  <option disabled hidden value="">
                    грн/га
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {isErr ? "Ви не заповнили поля" : ""}
        <div>
          <button
            className={css.button}
            onClick={() => {
              if (cell === "" || section === "") {
                setIsErr(true);
              } else {
                setIsErr(false);
                setOpen(false);
                setSecondOpen(true);
              }
            }}
          >
            Створити
          </button>
        </div>
      </div>
    </div>
  );
}
export default observer(OperSection);
