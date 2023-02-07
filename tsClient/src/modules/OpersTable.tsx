import React from "react";
import { useContext } from "react";
import { Context } from "../main";
import { deleteOper } from "../http/requests";
import style from "./Table.module.css";
import OpersTableItem from "../components/OpersTableItem";
import { Icell } from "../../../tRPC serv/controllers/OperService";

type props = {
  id: number;
  setRes: (res: any) => void;
  setSecondOpen: (open: boolean) => void;
  setCell: (cell: Icell | "") => void;
  setUpdate: (update: boolean) => void;
};

export default function OpersTable({
  id,
  setRes,
  setSecondOpen,
  setCell,
  setUpdate,
}: props) {
  const { map } = useContext(Context);
  let operData = map.opers.filter((el) => el?.techCartId == id);
  operData.sort((a, b) => a.id! - b.id!);
  let [mapData] = map.maps.filter((el) => el.id == id);
  let sum = 0;
  return (
    <div className={style.opersTable}>
      <th className={style.headItem}>Р</th>
      <th className={style.headTextItem}>Технологічна операція</th>
      <th className={style.headTextItem}>Обсяг робіт</th>
      <th className={style.headTextItem}>Одиниця виміру</th>
      <th className={style.headTextItem}>Вартість Техніки</th>
      <th className={style.headTextItem}>Вартість палива</th>
      <th className={style.headTextItem}>ЗП механізована</th>
      <th className={style.headTextItem}>ЗП ручна</th>
      <th className={style.headTextItem}>Вартість матеріалів</th>
      <th className={style.headTextItem}>Вартість транспорту</th>
      <th className={style.headTextItem}>Вартість послуг</th>
      <th className={style.headTextItem}>Разом</th>
      <th className={style.headItem}>В</th>
      {operData?.map((el) => {
        sum +=
          mapData.area *
          (el.costMaterials ||
            el.costServices ||
            el.costTransport ||
            +el.costCars! +
              +el.costFuel! +
              +el.costHandWork! +
              +el.costMachineWork! ||
            el.costHandWork ||
            0);
        return (
          <OpersTableItem
            id={id}
            el={el}
            map={map}
            setRes={setRes}
            setSecondOpen={setSecondOpen}
            setCell={setCell}
            setUpdate={setUpdate}
            mapData={mapData}
          />
        );
      })}

      <td></td>
      <td style={{ fontWeight: "bold" }}>Загальні витрати</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{sum}</td>
      <td></td>
    </div>
  );
}
