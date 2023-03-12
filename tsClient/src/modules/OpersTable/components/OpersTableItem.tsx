import React, { useContext } from "react";
import { Icell } from "../../../../../tRPC serv/controllers/OperService";
import {
  Itech_cart,
  Itech_operation,
} from "../../../../../tRPC serv/models/models";
import { deleteOper } from "../../../http/requests";
import MapStore from "../../../store/MapStore";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Button,
  Box,
  Container,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Context } from "../../../main";
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
  const [cart] = map.maps.filter((map) => map.id == el.techCartId);

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
      productionRaeAmount: +second.productionRateAmount || "",
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
  setRes: (res: any) => void;
  setSecondOpen: (open: boolean) => void;
  setCell: (cell: Icell | "") => void;
  setUpdate: (update: boolean) => void;
  mapData: Itech_cart;
  setShowAlert: (showAlert: boolean) => void;
  deleteOpen: boolean;
  setDeleteOpen: (deleteOpen: any) => void;
};

export default function OpersTableItem({
  id,
  el,
  setRes,
  setSecondOpen,
  setCell,
  setUpdate,
  mapData,
  setShowAlert,
  deleteOpen,
  setDeleteOpen,
}: props) {
  const { map, user } = useContext(Context);
  return (
    <Tr key={el.id!}>
      <Td
        onClick={() =>
          patch(map, el, setRes, setSecondOpen, setCell, setUpdate)
        }
      >
        <EditIcon color={"blue.400"} w={"20px"} h={"auto"} cursor={"pointer"} />
      </Td>
      <Td>{el.date || 0}</Td>
      <Td>{el.nameOperation}</Td>
      <Td>{mapData.area}</Td>
      <Td>{"га"}</Td>
      <Td>
        {+mapData.area *
          (el.costMaterials ||
            el.costServices ||
            el.costTransport ||
            +el.costCars! +
              +el.costFuel! +
              +el.costHandWork! +
              +el.costMachineWork! ||
            el.costHandWork!)}
      </Td>
      <Td>{el.costCars! * mapData.area || "0"}</Td>
      <Td>{el.costFuel! * mapData.area || "0"}</Td>
      <Td>{el.costMachineWork! * mapData.area || "0"}</Td>
      <Td>{el.costHandWork! * mapData.area || "0"}</Td>
      <Td>{el.costMaterials! * mapData.area || "0"}</Td>
      <Td>{el.costTransport! * mapData.area || "0"}</Td>
      <Td>{el.costServices! * mapData.area || "0"}</Td>

      <Td
        textAlign={"center"}
        cursor={"pointer"}
        color={"red"}
        onClick={
          user.role == ""
            ? () => setShowAlert(true)
            : () => {
                setDeleteOpen({ isOpen: true, operId: el.id, cartId: id });
              }
        }
      >
        <DeleteIcon w={"20px"} h={"auto"} />
      </Td>
    </Tr>
  );
}
