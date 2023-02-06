import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../index";
import CartsTableItem from "../components/CartsTableItem";
import style from "./Table.module.css";

const Table = observer(({ setRes, setOpen, setUpdate }) => {
  const { map } = useContext(Context);

  return (
    <div className={style.cartsTable}>
      <th className={style.headItem}></th>
      <th className={style.headTextItem}>Назва культури</th>
      <th className={style.headTextItem}>Площа (га)</th>
      <th className={style.headTextItem}>Загальна вартість (грн)</th>
      <th className={style.headTextItem}>Витрати на (грн на 1 га)</th>
      <th className={style.headItem}></th>
      {map.maps.map((e) => (
        <CartsTableItem
          e={e}
          setOpen={setOpen}
          setRes={setRes}
          setUpdate={setUpdate}
          map={map}
        />
      ))}
    </div>
  );
});

export default Table;
