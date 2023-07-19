import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateBuilding from "src/modules/CreateBuilding";
import { CreateBuildingProps } from "src/modules/CreateBuilding/CreateBuilding";
import getYearFromString from "src/shared/funcs/getYearFromString";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";

function BuildingBusTable({
  id,
  end,
  start,
  myBusiness,
}: {
  myBusiness: resBusinessPlan | undefined;
  id: number;
  start: number;
  end: number;
}) {
  const [res, setRes] = useState<CreateBuildingProps>({
    description: "",
    date: "",
    name: "",
    startPrice: "",
    businessPlanId: id,
  });
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <>
      <MyHeading>Будівництво будівель і споруд</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Рік</Th>
              <Th>Назва</Th>
              <Th>Вартість</Th>
              <Th>Опис</Th>
              <Th>Налаштування</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {(() => {
              const res = [];
              for (let i = start; i <= end; i++) {
                const building = myBusiness?.buildings.filter(
                  (el) => getYearFromString(el.date) == i
                );
                res.push(
                  building.map((el) => (
                    <Tr key={el.id}>
                      <Td>
                        <MyEditIcon
                          onClick={() => {
                            setOpen(true);
                            setUpdate(true);
                            setRes({
                              id: el.id,
                              businessPlanId: el.businessPlanId,
                              date: el.date,
                              description: el.description,
                              name: el.name,
                              startPrice: el.startPrice,
                            });
                          }}
                        />
                      </Td>
                      <Td>{getYearFromString(el.date)}</Td>
                      <Td>{el.name}</Td>
                      <Td>{el.startPrice}</Td>
                      <Td>{el.description}</Td>
                      <Td>
                        <Button size={"sm"}>Додати</Button>
                      </Td>
                      <Td>
                        <MyDeleteIcon />
                      </Td>
                    </Tr>
                  ))
                );
                res.push(
                  <Tr key={i} fontWeight={"bold"}>
                    <Td>
                      <MyAddIcon
                        onClick={() => {
                          setOpen(true);
                          setRes({
                            description: "",
                            date: i + "-01-01",
                            name: "",
                            startPrice: "",
                            businessPlanId: id,
                          });
                        }}
                      />
                    </Td>
                    <Td>{i}</Td>
                    <Td></Td>
                    <Td>{building?.reduce((p, c) => p + +c.startPrice, 0)}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                );
              }
              return res;
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
      <CreateBuilding
        data={res}
        open={open}
        setOpen={setOpen}
        setUpdate={setUpdate}
        update={update}
      />
    </>
  );
}

export default BuildingBusTable;
