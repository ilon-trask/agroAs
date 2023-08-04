import {
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import DeleteAlert, { DeleteProps } from "src/components/DeleteAlert";
import { deleteBuildingForBusiness } from "src/http/requests";
import { Context } from "src/main";
import CreateBuilding from "src/modules/CreateBuilding";
import { CreateBuildingProps } from "src/modules/CreateBuilding/CreateBuilding";
import getYearFromString from "src/shared/funcs/getYearFromString";
import BusHeading from "src/ui/BusHeading";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyAccordionButton from "src/ui/MyAccordionButton";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";

function BuildingBusTable({
  end,
  start,
  myBusiness,
}: {
  myBusiness: resBusinessPlan;
  start: number;
  end: number;
}) {
  const [res, setRes] = useState<CreateBuildingProps>({
    description: "",
    date: "",
    name: "",
    startPrice: "",
    businessPlanId: myBusiness.id!,
    year: 0,
  });
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const { business } = useContext(Context);
  const [deleteData, setDeleteData] = useState<DeleteProps>({
    func: () => {},
    isOpen: false,
    text: "будівлю",
  });
  return (
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Будівництво будівель і споруд</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
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
                let sum = 0;
                for (let i = start; i <= end; i++) {
                  const building = myBusiness.buildings.filter(
                    (el) => el.year == i - start
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
                                year: el.year,
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
                          <MyDeleteIcon
                            onClick={() => {
                              setDeleteData({
                                func: () => {
                                  setDeleteData((prev) => ({
                                    ...prev,
                                    isOpen: false,
                                  }));
                                  deleteBuildingForBusiness(business, {
                                    busId: myBusiness.id!,
                                    id: el.id!,
                                  });
                                },
                                isOpen: true,
                                text: "будівлю",
                              });
                            }}
                          />
                        </Td>
                      </Tr>
                    ))
                  );
                  const yearCost = building?.reduce(
                    (p, c) => p + +c.startPrice,
                    0
                  );
                  sum += yearCost;
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
                              businessPlanId: myBusiness.id!,
                              year: i - start,
                            });
                          }}
                        />
                      </Td>
                      <Td>{i}</Td>
                      <Td>Разом:</Td>
                      <Td>{yearCost}</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                    </Tr>
                  );
                }
                res.push(
                  <Tr key={end + 1} fontWeight={"bold"}>
                    <Td></Td>
                    <Td colSpan={2}>ВСЕ РАЗОМ:</Td>

                    <Td>{sum}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                );
                return res;
              })()}
            </Tbody>
          </Table>
        </MyTableContainer>
        {open ? (
          <CreateBuilding
            data={res}
            open={open}
            setOpen={setOpen}
            setUpdate={setUpdate}
            update={update}
          />
        ) : null}
        {deleteData.isOpen ? (
          <DeleteAlert
            func={deleteData.func}
            isOpen={deleteData.isOpen}
            setOpen={setDeleteData}
            text={deleteData.text}
          />
        ) : null}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default React.memo(BuildingBusTable);
