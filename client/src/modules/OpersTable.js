import React from "react";
import { useContext } from "react";
import { Context } from "../index";
import { deleteOper } from "../http/requests";

export default function OpersTable({
  id,
  setRes,
  setSecondOpen,
  setCell,
  setUpdate,
}) {
  const { map } = useContext(Context);
  let operData = map.opers.filter((el) => el?.techCartId == id);
  operData.sort((a, b) => a.id - b.id);
  let [mapData] = map.maps.filter((el) => el.id == id);
  const th = { fontSize: "18px", padding: "0 10px " };
  let sum = 0;
  return (
    <table>
      <thead>
        <tr>
          <th style={{ ...th }}>Р</th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Технологічна операція
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Обсяг робіт
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Одиниця виміру
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Вартість Техніки
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Вартість палива
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            ЗП механізована
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            ЗП ручна
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Вартість матеріалів
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Вартість транспорту
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Вартість послуг
          </th>
          <th
            style={{
              border: "1px solid",
              ...th,
            }}
          >
            Разом
          </th>
          <th style={{ ...th }}>В</th>
        </tr>
      </thead>
      <tbody>
        {operData?.map((el) => {
          sum +=
            mapData.area *
            (el.costMaterials ||
              el.costServices ||
              el.costTransport ||
              +el.costCars +
                +el.costFuel +
                +el.costHandWork +
                +el.costMachineWork ||
              el.costHandWork);
          return (
            <tr key={el.id}>
              <td
                onClick={() => {
                  console.log(map[el.cell]);
                  const [second] = map[el.cell]?.filter(
                    (mat) => mat.techOperationId == el.id
                  );

                  console.log(second);
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
                      pricePerHourPersonnel:
                        +second.pricePerHourPersonnel || "",
                      productionPerShift: +second.productionPerShift || "",
                      productionRateAmount: +second.productionRateAmount || "",
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
                }}
              >
                Ред
              </td>
              <td>{el.nameOperation}</td>
              <td>{mapData.area}</td>
              <td>{"0"}</td>
              <td>{el.costCars * mapData.area || "0"}</td>
              <td>{el.costFuel * mapData.area || "0"}</td>
              <td>{el.costMachineWork * mapData.area || "0"}</td>
              <td>{el.costHandWork * mapData.area || "0"}</td>
              <td>{el.costMaterials * mapData.area || "0"}</td>
              <td>{el.costTransport * mapData.area || "0"}</td>
              <td>{el.costServices * mapData.area || "0"}</td>
              <td>
                {+mapData.area *
                  (el.costMaterials ||
                    el.costServices ||
                    el.costTransport ||
                    +el.costCars +
                      +el.costFuel +
                      +el.costHandWork +
                      +el.costMachineWork)}
              </td>
              <td
                className="delet"
                onClick={() => {
                  deleteOper(map, el.id, id);
                }}
              >
                видалити
              </td>
            </tr>
          );
        })}

        <tr>
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
        </tr>
      </tbody>
    </table>
  );
}
