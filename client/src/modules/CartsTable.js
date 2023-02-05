import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../index";
import { TEHMAP_ROUTER } from "../utils/consts";

import { deleteCart } from "../http/requests";

const Table = observer(({ data, setRes, setOpen, setUpdate }) => {
  const { map } = useContext(Context);
  let th = { fontSize: "18px", padding: "0 10px 0 10px" };

  return (
    <table>
      <thead>
        <tr>
          <th style={{ ...th }}></th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Назва культури
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Площа (га)
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Загальна вартість (грн)
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Витрати на (грн на 1 га)
          </th>
          <th style={{ ...th }}></th>
        </tr>
      </thead>
      <tbody>
        {map.maps.map((e) => (
          <tr key={e.id}>
            <td
              onClick={() => {
                setUpdate(true);
                setOpen(true);
                setRes({
                  id: e.id,
                  nameCart: e.nameCart,
                  area: e.area,
                  salary: e.salary,
                  priceDiesel: e.priceDiesel,
                });
              }}
            >
              Ред
            </td>
            <td>
              <Link to={TEHMAP_ROUTER + `/${e.id}`}>{e.nameCart}</Link>
            </td>
            <td>{e.area}</td>
            <td>{Math.round(10 * (e.totalCost * e.area)) / 10 || "0"}</td>
            <td>{e.totalCost || "0"}</td>
            <td
              className="delet"
              onClick={() => {
                deleteCart(map, +e.id);
              }}
            >
              видалити
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default Table;
