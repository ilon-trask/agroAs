import React from "react";
import { useContext } from "react";
import { Context } from "../index";

export default function GeneralDataTable({
  id,
  setMapOpen,
  setUpdate,
  setRes,
}) {
  let th = { fontSize: "18px", padding: "0 10px " };
  const { map } = useContext(Context);
  let [mapData] = map.maps.filter((el) => el.id == id);
  return (
    <table style={{ marginTop: "15px", marginBottom: "15px" }}>
      <thead>
        <tr>
          <th style={th}></th>
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
            Площа
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Розрахункова ЗП
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Вартість ДП
          </th>
          <th style={{ ...th }}></th>
        </tr>
      </thead>
      <tbody>
        {
          <tr key={mapData?.id}>
            <th
              onClick={() => {
                setMapOpen(true);
                setUpdate(true);
                setRes({
                  id: mapData.id,
                  nameCart: mapData.nameCart,
                  area: mapData.area,
                  salary: mapData.salary,
                  priceDiesel: mapData.priceDiesel,
                });
              }}
            >
              ред
            </th>
            <th
              style={{
                border: "1px solid",
                ...th,
              }}
            >
              {mapData?.nameCart}
            </th>
            <th
              style={{
                border: "1px solid",
                ...th,
              }}
            >
              {mapData?.area}
            </th>
            <th
              style={{
                border: "1px solid",
                ...th,
              }}
            >
              {mapData?.salary}
            </th>
            <th
              style={{
                border: "1px solid",
                ...th,
              }}
            >
              {mapData?.priceDiesel}
            </th>
            <th></th>
          </tr>
        }
      </tbody>
    </table>
  );
}
