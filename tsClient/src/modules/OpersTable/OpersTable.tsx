import React, { useMemo } from "react";
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
import { resTechOperation } from "../../../../tRPC serv/controllers/TechCartService";

export function OpersTableHead({ useIcons }: { useIcons: boolean }) {
  return (
    <Tr>
      {useIcons && <Th></Th>}
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
      {useIcons && <Th></Th>}
    </Tr>
  );
}
type props = {
  id: number;
  area: number;
  opers?: resTechOperation[] | undefined;
} & (
  | {
      useIcons: false;
    }
  | {
      useIcons: true;
      setRes: (res: any) => void;
      setSecondOpen: (open: boolean) => void;
      setCell: (cell: Icell | "") => void;
      setUpdate: (update: boolean) => void;
      setShowAlert: (showAlert: boolean) => void;
      deleteOpen: boolean;
      setDeleteOpen: (open: boolean) => void;
    }
);
function OpersTable(props: props) {
  const { map } = useContext(Context);

  const operData =
    props.opers || map.opers.filter((el) => el?.techCartId == props.id);
  operData.sort((a, b) => a.id! - b.id!);
  console.log(operData);

  const sections = useMemo(() => {
    let a = getSectionsOpers(map, props.id, operData);

    return a;
  }, [map.opers, operData]);

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
      props.area! *
      (el.costMaterials ||
        el.costServices ||
        el.costTransport ||
        +el.costCars! +
          +el.costFuel! +
          +el.costHandWork! +
          +el.costMachineWork! ||
        el.costHandWork ||
        0);
    technic += props.area! * +(el.costCars || 0);
    fuel += props.area! * +(el.costFuel || 0);
    machineWork += props.area! * +(el.costMachineWork || 0);
    handWork += props.area! * +(el.costHandWork || 0);
    materials += props.area! * +(el.costMaterials || 0);
    transport += props.area! * +(el.costTransport || 0);
    services += props.area! * +(el.costServices || 0);
  });

  return (
    <TableContainer overflowX={"scroll"} as={"div"}>
      <Table size={"sm"}>
        <Thead>
          <OpersTableHead useIcons={props.useIcons} />
        </Thead>
        <Tbody>
          {map.isLoading ? <Loader /> : <></>}
          {sections.map((el, ind) => (
            <React.Fragment key={ind}>
              {props.useIcons ? (
                <OperTableSection
                  useIcons={props.useIcons}
                  key={ind}
                  arr={el.arr}
                  title={el.title}
                  id={props.id}
                  area={props.area}
                  setCell={props.setCell}
                  setOpen={props.setSecondOpen}
                  setRes={props.setRes}
                  setUpdate={props.setUpdate}
                  setShowAlert={props.setShowAlert}
                  deleteOpen={props.deleteOpen}
                  setDeleteOpen={props.setDeleteOpen}
                />
              ) : (
                <OperTableSection
                  useIcons={props.useIcons}
                  arr={el.arr}
                  title={el.title}
                  id={props.id}
                  area={props.area}
                />
              )}
            </React.Fragment>
          ))}
        </Tbody>

        <Tfoot fontWeight={"bold"}>
          {props.useIcons && <Td></Td>}
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
          {props.useIcons && <Td></Td>}
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
export default observer(OpersTable);
