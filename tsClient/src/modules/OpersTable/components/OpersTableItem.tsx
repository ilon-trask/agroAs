import React, { useContext } from "react";
import { Icell } from "../../../../../tRPC serv/controllers/OperService";
import { Itech_operation } from "../../../../../tRPC serv/models/models";
import MapStore from "../../../store/MapStore";
import { Tr, Td } from "@chakra-ui/react";
import { Context } from "../../../main";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
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
  const second = map[el.cell].find((mat) => mat.techOperationId == el.id);
  const cart =
    map.maps.find((map) => map.id == el.techCartId) ||
    map.agreeCarts.find((map) => map.id == el.techCartId) ||
    map.businessCarts.find((map) => map.id == el.techCartId);

  if (el.cell == "costMechanical") {
    setRes({
      id: el.id,
      nameOper: el.nameOperation,
      date: el.date,
      fuelConsumption: second.fuelConsumption,
      idTractor: second.tractorId,
      idMachine: second.agriculturalMachineId,
      workingSpeed: second.workingSpeed,
      agriculturalMachineId: second.agriculturalMachineId,
      unitProductionAggregate: second.unitProductionAggregate,
      operId: el.id,
      salary: cart.salary,
      priceDiesel: cart.priceDiesel,
    });
  } else if (el.cell == "costHandWork") {
    setRes({
      id: el.id,
      gradeId: second.gradeId || "",
      nameOper: second.nameOper || "",
      date: el.date,
      pricePerHourPersonnel: +second.pricePerHourPersonnel || "",
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
      salary: cart.salary,
    });
  } else if (el.cell == "costMaterials") {
    setRes({
      id: el.id,
      nameOper: el.nameOperation,
      date: el.date,
      price: second.price,
      unitsOfCost: second.unitsOfCost,
      consumptionPerHectare: second.consumptionPerHectare,
      unitsOfConsumption: second.unitsOfConsumption,
      operId: el.id,
      purposeMaterialId: second.purposeMaterialId || 7,
    });
  } else {
    setRes({
      id: el.id,
      nameOper: el.nameOperation,
      date: el.date,
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
  area: number;
} & (
  | { useIcons: false }
  | {
      useIcons: true;
      setRes: (res: any) => void;
      setSecondOpen: (open: boolean) => void;
      setCell: (cell: Icell | "") => void;
      setUpdate: (update: boolean) => void;
      setShowAlert: (showAlert: boolean) => void;
      setDeleteOpen: (deleteOpen: any) => void;
    }
);

export default function OpersTableItem(props: props) {
  const { map } = useContext(Context);

  return (
    <Tr key={props.el.id!}>
      {props.useIcons && (
        <Td
          onClick={() =>
            patch(
              map,
              props.el,
              props.setRes,
              props.setSecondOpen,
              props.setCell,
              props.setUpdate
            )
          }
        >
          <MyEditIcon />
        </Td>
      )}
      <Td>{props.el.date || 0}</Td>
      <Td>{props.el.nameOperation}</Td>
      <Td>{props.area}</Td>
      <Td>{"га"}</Td>
      <Td>
        {props.area *
          (props.el.costMaterials ||
            props.el.costServices ||
            props.el.costTransport ||
            +props.el.costCars! +
              +props.el.costFuel! +
              +props.el.costHandWork! +
              +props.el.costMachineWork! ||
            props.el.costHandWork!)}
      </Td>
      <Td>{props.el.costCars! * props.area || "0"}</Td>
      <Td>{props.el.costFuel! * props.area || "0"}</Td>
      <Td>{props.el.costMachineWork! * props.area || "0"}</Td>
      <Td>{props.el.costHandWork! * props.area || "0"}</Td>
      <Td>{props.el.costMaterials! * props.area || "0"}</Td>
      <Td>{props.el.costTransport! * props.area || "0"}</Td>
      <Td>{props.el.costServices! * props.area || "0"}</Td>

      {props.useIcons && (
        <Td
          onClick={
            // user.role == ""
            //   ? () => setShowAlert(true)
            //   :
            () => {
              props.setDeleteOpen({
                isOpen: true,
                operId: props.el.id,
                cartId: props.id,
              });
            }
          }
        >
          <MyDeleteIcon />
        </Td>
      )}
    </Tr>
  );
}
