import React, { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Icell } from "../../../../tRPC serv/controllers/OperService";
import OperTableSection from "./components/OperTableSection";
import Loader from "../../components/Loader";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import getSectionsOpers from "../../store/GetSectionsOpers";
type props = {
  id: number;
  setRes: (res: any) => void;
  setSecondOpen: (open: boolean) => void;
  setCell: (cell: Icell | "") => void;
  setUpdate: (update: boolean) => void;
  setShowAlert: (showAlert: boolean) => void;
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
};

function OpersTable({
  id,
  setRes,
  setSecondOpen,
  setCell,
  setUpdate,
  setShowAlert,
  deleteOpen,
  setDeleteOpen,
}: props) {
  const { map, user } = useContext(Context);

  const operData = map.opers.filter((el) => el?.techCartId == id);
  operData.sort((a, b) => a.id! - b.id!);
  console.log(operData);

  const sections = useMemo(() => {
    let a = getSectionsOpers(map, id);
    console.log(a);

    return a;
  }, [map.opers, operData]);

  let mapData = map.maps.find((el) => el.id == id);
  if (!mapData) {
    mapData = map.complex.find((el) => el.id == id);
  }
  let sum = 0;
  let technic = 0;
  let fuel = 0;
  let machineWork = 0;
  let handWork = 0;
  let materials = 0;
  let transport = 0;
  let services = 0;
  operData.forEach((el) => {
    sum +=
      mapData?.area! *
      (el.costMaterials ||
        el.costServices ||
        el.costTransport ||
        +el.costCars! +
          +el.costFuel! +
          +el.costHandWork! +
          +el.costMachineWork! ||
        el.costHandWork ||
        0);
    technic += mapData?.area! * +(el.costCars || 0);
    fuel += mapData?.area! * +(el.costFuel || 0);
    machineWork += mapData?.area! * +(el.costMachineWork || 0);
    handWork += mapData?.area! * +(el.costHandWork || 0);
    materials += mapData?.area! * +(el.costMaterials || 0);
    transport += mapData?.area! * +(el.costTransport || 0);
    services += mapData?.area! * +(el.costServices || 0);
  });

  return (
    <TableContainer overflowX={"scroll"} as={"div"}>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            {user.role != "" && <Th></Th>}
            <Th>
              Дата <br />
              початку
            </Th>
            <Th>
              Технологічна <br />
              операція
            </Th>
            <Th>
              Обсяг <br />
              робіт
            </Th>
            <Th>
              Одиниця <br />
              виміру
            </Th>
            <Th>Разом</Th>
            <Th>
              Вартість <br />
              Техніки
            </Th>
            <Th>
              Вартість <br />
              палива
            </Th>
            <Th>
              Оплата праці
              <br /> механізована
            </Th>
            <Th>
              Оплата праці
              <br /> ручна
            </Th>
            <Th>
              Вартість
              <br /> матеріалів
            </Th>
            <Th>
              Вартість
              <br /> транспорту
            </Th>
            <Th>
              Вартість <br />
              послуг
            </Th>
            {user.role != "" && <Th></Th>}
          </Tr>
        </Thead>
        <Tbody>
          {map.isLoading ? <Loader /> : <></>}
          {sections.map((el, ind) => (
            <OperTableSection
              key={ind}
              arr={el.arr}
              title={el.title}
              id={id}
              mapData={mapData!}
              setCell={setCell}
              setOpen={setSecondOpen}
              setRes={setRes}
              setUpdate={setUpdate}
              sum={sum}
              setShowAlert={setShowAlert}
              deleteOpen={deleteOpen}
              setDeleteOpen={setDeleteOpen}
            />
          ))}
        </Tbody>

        <Tfoot fontWeight={"bold"}>
          {user.role != "" && <Td></Td>}
          <Td></Td>
          <Td fontWeight={"bold"}>Загальні витрати</Td>
          <Td></Td>
          <Td></Td>
          <Td px={"10px"}>{sum}</Td>
          <Td>{technic}</Td>
          <Td>{fuel}</Td>
          <Td>{machineWork}</Td>
          <Td>{handWork}</Td>
          <Td>{materials}</Td>
          <Td>{transport}</Td>
          <Td>{services}</Td>
          {user.role != "" && <Td></Td>}
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
export default observer(OpersTable);
