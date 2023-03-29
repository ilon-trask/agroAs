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

  const [mapData] = map.maps.filter((el) => el.id == id);
  let sum = 0;
  operData.forEach((el) => {
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
    <TableContainer overflowX={"scroll"}>
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
              ЗП
              <br /> механізована
            </Th>
            <Th>
              ЗП
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
          {sections.map((el) => (
            <OperTableSection
              key={id}
              arr={el.arr}
              title={el.title}
              id={id}
              mapData={mapData}
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

        <Tfoot>
          {user.role != "" && <Td></Td>}
          <Td></Td>
          <Td fontWeight={"bold"}>Загальні витрати</Td>
          <Td></Td>
          <Td></Td>
          <Td px={"10px"} fontWeight={"bold"}>
            {sum}
          </Td>
          {user.role != "" && <Td></Td>}
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
export default observer(OpersTable);
