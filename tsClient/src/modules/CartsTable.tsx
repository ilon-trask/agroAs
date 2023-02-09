import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../main";
import CartsTableItem from "../components/CartsTableItem";
import style from "./Table.module.css";
import { cartProps } from "./CreateCart";

interface props {
  setRes: (res: cartProps) => void;
  setOpen: (open: boolean) => void;
  setUpdate: (update: boolean) => void;
}

const Table = observer(({ setRes, setOpen, setUpdate }: props) => {
  const { map, user } = useContext(Context);

  return (
    <div className={style.cartsTable}>
      <th className={style.headItem}></th>
      <th className={style.headTextItem}>Назва культури</th>
      <th className={style.headTextItem}>Площа (га)</th>
      <th className={style.headTextItem}>Загальна вартість (грн)</th>
      <th className={style.headTextItem}>Витрати на (грн на 1 га)</th>
      <th className={style.headItem}></th>
      <th className={style.headItem}>{user.role == "ADMIN" ? "опуб" : ""}</th>
      {map.maps.map((e) => (
        <CartsTableItem
          e={e}
          setOpen={setOpen}
          setRes={setRes}
          setUpdate={setUpdate}
        />
      ))}
    </div>
  );
});

export default Table;
