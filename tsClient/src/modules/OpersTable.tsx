import React, { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { Context } from "../main";
import { deleteOper } from "../http/requests";
import style from "./Table.module.css";
import OpersTableItem from "../components/OpersTableItem";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import OperTableSection from "../components/OperTableSection";
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
type props = {
  id: number;
  setRes: (res: any) => void;
  setSecondOpen: (open: boolean) => void;
  setCell: (cell: Icell | "") => void;
  setUpdate: (update: boolean) => void;
  setShowAlert: (showAlert: boolean) => void;
};

export default function OpersTable({
  id,
  setRes,
  setSecondOpen,
  setCell,
  setUpdate,
  setShowAlert,
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
    { arr: soilPreparation, tittle: "Підготовка ґрунту" },
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
            <Th></Th>
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
            <Th>Разом</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {sections.map((el) => (
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
              setShowAlert={setShowAlert}
            />
          ))}
        </Tbody>

        <Tfoot>
          <Td></Td>
          <Td style={{ fontWeight: "bold" }}>Загальні витрати</Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td className={style.headItem}>{sum}</Td>
          <Td></Td>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
