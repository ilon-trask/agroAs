import React, { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { Context } from "../main";
import { deleteOper } from "../http/requests";
import style from "./Table.module.css";
import OpersTableItem from "../components/OpersTableItem";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import OperTableSection from "../components/OperTableSection";
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

  const operData = map.opers.filter((el) => el?.techCartId == id);
  operData.sort((a, b) => a.id! - b.id!);
  const soilPreparation = operData.filter((el) => el.sectionId == 1);
  const landing = operData.filter((el) => el.sectionId == 2);
  const care = operData.filter((el) => el.sectionId == 3);
  const feeding = operData.filter((el) => el.sectionId == 4);
  const monitoring = operData.filter((el) => el.sectionId == 5);

  const protection = operData.filter((el) => el.sectionId == 6);
  const gathering = operData.filter((el) => el.sectionId == 7);
  const storage = operData.filter((el) => el.sectionId == 8);
  const sections = [
    { arr: soilPreparation, tittle: "підготовка ґрунту" },
    { arr: landing, tittle: "Посадка" },
    { arr: care, tittle: "Догляд" },
    { arr: feeding, tittle: "Живлення" },
    { arr: monitoring, tittle: "Моніторинг" },
    { arr: protection, tittle: "Захист" },
    { arr: gathering, tittle: "Збір" },
    { arr: storage, tittle: "Зберігання" },
  ];
  const [mapData] = map.maps.filter((el) => el.id == id);
  let sum = 0;
  operData.forEach((el) => {
    console.log(1);
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
  });
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
      {useMemo(
        () =>
          sections.map((el) => (
            <OperTableSection
              arr={el.arr}
              title={el.tittle}
              id={id}
              mapData={mapData}
              setCell={setCell}
              setOpen={setSecondOpen}
              setRes={setRes}
              setUpdate={setUpdate}
              sum={sum}
            />
          )),
        [sections]
      )}
      {/* {operData?.map((el) => {
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
      })} */}

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
      <td className={style.headItem}>{sum}</td>
      <td></td>
    </div>
  );
}
