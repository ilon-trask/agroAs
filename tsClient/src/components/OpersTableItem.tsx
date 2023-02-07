import React from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import { Itech_cart, Itech_operation } from "../../../tRPC serv/models/models";
import { deleteOper } from "../http/requests";
import MapStore from "../store/MapStore";
import style from "./TableItem.module.css";
type funcProps = (
  map: MapStore,
  el: Itech_operation,
  setRes: (res: any) => void,
  setSecondOpen: (open: boolean) => void,
  setCell: (cell: Icell | "") => void,
  setUpdate: (update: boolean) => void
) => void;
const patch: funcProps = function (
  map,
  el,
  setRes,
  setSecondOpen,
  setCell,
  setUpdate
) {
  //@ts-ignore
  const [second] = map[el.cell].filter((mat) => mat.techOperationId == el.id);

  if (el.cell == "costMechanical") {
    setRes({
      id: el.id,
      nameOper: el.nameOperation,
      fuelConsumption: second.fuelConsumption,
      idTractor: second.tractorId,
      idMachine: second.agriculturalMachineId,
      workingSpeed: second.workingSpeed,
      agriculturalMachineId: second.agriculturalMachineId,
      unitProductionAggregate: second.unitProductionAggregate,
      operId: el.id,
    });
  } else if (el.cell == "costHandWork") {
    setRes({
      id: el.id,
      gradeId: second.gradeId || "",
      nameOper: second.nameOper || "",
      pricePerHourPersonnel: +second.pricePerHourPersonnel || "",
      productionPerShift: +second.productionPerShift || "",
      productionRaeAmount: +second.productionRateAmount || "",
      productionRateTime: +second.productionRateTime || "",
      productionRateWeight: +second.productionRateWeight || "",
      salaryPerShift: +second.salaryPerShift,
      spending: +second.spending || "",
      type: +second.type,
      unitOfMeasurement: second.unitOfMeasurement || "",
      yieldСapacity: +second.yieldСapacity || "",
      operId: el.id,
    });
  } else {
    setRes({
      id: el.id,
      nameOper: el.nameOperation,
      price: second.price,
      unitsOfCost: second.unitsOfCost,
      consumptionPerHectare: second.consumptionPerHectare,
      unitsOfConsumption: second.unitsOfConsumption,
      operId: el.id,
    });
  }
  setSecondOpen(true);
  setCell(el.cell);
  setUpdate(true);
};

type props = {
  id: number;
  el: Itech_operation;
  map: MapStore;
  setRes: (res: any) => void;
  setSecondOpen: (open: boolean) => void;
  setCell: (cell: Icell | "") => void;
  setUpdate: (update: boolean) => void;
  mapData: Itech_cart;
};

export default function OpersTableItem({
  id,
  el,
  map,
  setRes,
  setSecondOpen,
  setCell,
  setUpdate,
  mapData,
}: props) {
  return (
    <>
      <div
        className={style.item}
        onClick={() =>
          patch(map, el, setRes, setSecondOpen, setCell, setUpdate)
        }
      >
        Ред
      </div>
      <div className={style.item}>{el.nameOperation}</div>
      <div className={style.item}>{mapData.area}</div>
      <div className={style.item}>{"0"}</div>
      <div className={style.item}>{el.costCars! * mapData.area || "0"}</div>
      <div className={style.item}>{el.costFuel! * mapData.area || "0"}</div>
      <div className={style.item}>
        {el.costMachineWork! * mapData.area || "0"}
      </div>
      <div className={style.item}>{el.costHandWork! * mapData.area || "0"}</div>
      <div className={style.item}>
        {el.costMaterials! * mapData.area || "0"}
      </div>
      <div className={style.item}>
        {el.costTransport! * mapData.area || "0"}
      </div>
      <div className={style.item}>{el.costServices! * mapData.area || "0"}</div>
      <div className={style.item}>
        {+mapData.area *
          (el.costMaterials ||
            el.costServices ||
            el.costTransport ||
            +el.costCars! +
              +el.costFuel! +
              +el.costHandWork! +
              +el.costMachineWork!)}
      </div>
      <div
        className={style.delete}
        onClick={() => {
          deleteOper(map, el.id!, id);
        }}
      >
        видалити
      </div>
    </>
  );
}
