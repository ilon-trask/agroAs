import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { DeleteProps } from "src/components/DeleteAlert";
import { deleteBuilding } from "src/http/requests";
import { Context } from "src/main";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import { Ibuilding } from "../../../../tRPC serv/models/models";
import { CreateBuildingProps } from "../CreateBuilding/CreateBuilding";

function BuildingTable({
  setData,
  setDeleteOpen,
  setOpen,
  setUpdate,
  arr,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<CreateBuildingProps>>;
  setDeleteOpen: Dispatch<SetStateAction<DeleteProps>>;
  arr: Ibuilding[];
}) {
  const { enterpriseStore } = useContext(Context);
  return (
    <Table size={"sm"}>
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Назва</Th>
          <Th>
            Початкова <br /> вартість
          </Th>
          <Th>
            Початок <br /> експлуатації
          </Th>
          <Th>
            Термін <br /> амортищації
          </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {arr.map((el) => (
          <Tr>
            <Td
              onClick={() => {
                setOpen(true);
                setUpdate(true);
                setData({
                  id: el.id!,
                  date: el.date,
                  description: el.description,
                  enterpriseId: el.enterpriseId!,
                  name: el.name,
                  startPrice: el.startPrice + "",
                  businessPlanId: el.businessPlanId!,
                  year: el.year,
                });
              }}
            >
              <MyEditIcon />
            </Td>
            <Td>{el.name}</Td>
            <Td>{el.startPrice}</Td>
            <Td>{}</Td>
            <Td>{el.amortization?.depreciationPeriod}</Td>
            <Td
              onClick={() =>
                setDeleteOpen({
                  isOpen: true,
                  text: "будівлю",
                  func() {
                    deleteBuilding(enterpriseStore, { buildId: el.id! });
                    //@ts-ignore
                    setDeleteOpen({ isOpen: false });
                  },
                })
              }
            >
              <MyDeleteIcon />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default BuildingTable;
