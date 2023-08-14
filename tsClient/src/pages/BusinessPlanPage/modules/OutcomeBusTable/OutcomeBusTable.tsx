import {
  AccordionItem,
  AccordionPanel,
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
import { deleteOutcomeForBusiness } from "src/http/requests";
import { Context } from "src/main";
import { CartNamesData } from "src/pages/TechnologicalMap";
import getYearFromString from "src/shared/funcs/getYearFromString";
import BusHeading from "src/ui/BusHeading";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyAccordionButton from "src/ui/MyAccordionButton";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { getMonthAmountFromBusinessPlan } from "../../BusinessPlanPage";
import CreateOutcome, { CreateOutcomeProps } from "./module/CreateOutcome";

function OutcomeBusTable({
  end,
  start,
  myBusiness,
}: {
  myBusiness: resBusinessPlan;
  end: number;
  start: number;
}) {
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState<CreateOutcomeProps>();
  const [deleteData, setDeleteData] = useState<DeleteProps>({
    func: () => {},
    isOpen: false,
    text: "витрату",
  });
  const { business } = useContext(Context);
  return (
    <>
      <AccordionItem>
        <MyAccordionButton>
          <BusHeading>Витрати прямі</BusHeading>
        </MyAccordionButton>
        <AccordionPanel>
          <MyTableContainer>
            <Table size="sm">
              <Thead whiteSpace={"pre-wrap"}>
                <Tr>
                  <Th>Назва карти</Th>
                  {CartNamesData.map((el) => (
                    <Th key={el.name}>{el.name}</Th>
                  ))}
                  <Th>ЄСВ-22 ВЗ-1.5</Th>
                  <Th>Разом</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(() => {
                  const res = [];
                  for (let i = start; i <= end; i++) {
                    let sum = 0;
                    const busProd = myBusiness.busProds.filter(
                      (el) => el.year == i - start
                    );

                    busProd.forEach(({ id, tech_cart, area }) => {
                      const ESV = +(
                        ((tech_cart?.totalCostMachineWork || 0) +
                          (tech_cart?.totalCostHandWork || 0)) *
                        0.235
                      ).toFixed(2);
                      const hectare = +(
                        (tech_cart?.costHectare || 0) * area +
                        ESV
                      ).toFixed(2);
                      sum += hectare;
                      res.push(
                        <Tr key={id}>
                          <Td>{tech_cart?.nameCart}</Td>
                          {CartNamesData.map((el) => (
                            <Td key={el.name}>
                              {
                                //@ts-ignore
                                +((tech_cart[el.label] || 0) * area).toFixed(2)
                              }
                            </Td>
                          ))}
                          <Td>{ESV}</Td>
                          <Td>{hectare}</Td>
                        </Tr>
                      );
                    });
                    res.push(
                      <Tr key={i} fontWeight={"bold"}>
                        <Td>{i}</Td>
                        {CartNamesData.map((el) => (
                          <Td key={el.name}></Td>
                        ))}
                        <Td></Td>
                        <Td>{+sum.toFixed(2)}</Td>
                      </Tr>
                    );
                  }
                  return res;
                })()}
              </Tbody>
            </Table>
          </MyTableContainer>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <MyAccordionButton>
          <BusHeading>Витрати постійні</BusHeading>
        </MyAccordionButton>
        <AccordionPanel>
          <MyTableContainer>
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Рік</Th>
                  <Th>Сатті витрат</Th>
                  <Th>Сума в місяць</Th>
                  <Th>Сума за рік</Th>
                  {/* <Th>Налаштування</Th> */}
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {(() => {
                  const res = [];
                  let sum = 0;
                  for (let i = start; i <= end; i++) {
                    const outcomes = myBusiness.outcomes.filter(
                      (el) => el.year == i - start && el.group == "Постійні"
                    );
                    const monthAmount = getMonthAmountFromBusinessPlan(
                      myBusiness.dateStart,
                      i,
                      start
                    );
                    res.push(
                      outcomes.map((el) => (
                        <Tr key={el.id}>
                          <Td>
                            {!el.isDefault ? (
                              <MyEditIcon
                                onClick={() => {
                                  setOpen(true);
                                  setRes({
                                    id: el.id!,
                                    costMonth: el.costMonth!,
                                    date: el.date,
                                    group: el.group,
                                    name: el.name,
                                    businessPlanId: el.businessPlanId,
                                    year: i - start,
                                  });
                                }}
                              />
                            ) : null}
                          </Td>
                          <Td>{i}</Td>
                          <Td>{el.name}</Td>
                          <Td>{el.costMonth}</Td>
                          <Td>{el.costYear}</Td>
                          {/* <Td>
                            <Button size="sm">Додати</Button>
                          </Td> */}
                          <Td>
                            {!el.isDefault ? (
                              <MyDeleteIcon
                                onClick={() => {
                                  setDeleteData({
                                    func: () => {
                                      setDeleteData((prev) => ({
                                        ...prev,
                                        isOpen: false,
                                      }));
                                      deleteOutcomeForBusiness(business, {
                                        busId: myBusiness.id!,
                                        id: el.id!,
                                      });
                                    },
                                    isOpen: true,
                                    text: "витрату",
                                  });
                                }}
                              />
                            ) : null}
                          </Td>
                        </Tr>
                      ))
                    );
                    const yearAmount = +outcomes.reduce(
                      (p, c) => p + (c.costYear || 0),
                      0
                    );
                    sum += yearAmount;
                    res.push(
                      <Tr key={i} fontWeight={"bold"}>
                        <Td>
                          <MyAddIcon
                            onClick={() => {
                              setOpen(true);
                              setRes({
                                costMonth: "",
                                date: i + "-01-01",
                                group: "Постійні",
                                name: "",
                                businessPlanId: myBusiness.id!,
                                year: i - start,
                              });
                            }}
                          />
                        </Td>
                        <Td>{i}</Td>
                        <Td>Разом:</Td>
                        <Td></Td>
                        <Td>{yearAmount.toFixed(2)}</Td>
                        <Td></Td>
                        <Td></Td>
                      </Tr>
                    );
                  }
                  res.push(
                    <Tr key={end + 1} fontWeight={"bold"}>
                      <Td></Td>
                      <Td colSpan={2}>ВСЕ РАЗОМ:</Td>
                      <Td></Td>
                      <Td>{sum}</Td>
                      <Td></Td>
                      <Td></Td>
                    </Tr>
                  );
                  return res;
                })()}
              </Tbody>
            </Table>
          </MyTableContainer>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <MyAccordionButton>
          <BusHeading>Витрати загальновиробничі</BusHeading>
        </MyAccordionButton>
        <AccordionPanel>
          <MyTableContainer>
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Рік</Th>
                  <Th>Сатті витрат</Th>
                  <Th>Сума в місяць</Th>
                  <Th>Сума за рік</Th>
                  {/* <Th>Налаштування</Th> */}
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {(() => {
                  const res = [];
                  let sum = 0;
                  for (let i = start; i <= end; i++) {
                    const outcomes = myBusiness.outcomes.filter(
                      (el) =>
                        el.year == i - start && el.group == "Загально виробничі"
                    );
                    const monthAmount = getMonthAmountFromBusinessPlan(
                      myBusiness.dateStart,
                      i,
                      start
                    );
                    res.push(
                      outcomes.map((el) => (
                        <Tr key={el.id}>
                          <Td>
                            {!el.isDefault ? (
                              <MyEditIcon
                                onClick={() => {
                                  setOpen(true);
                                  setRes({
                                    id: el.id!,
                                    costMonth: el.costMonth!,
                                    date: el.date,
                                    group: el.group,
                                    name: el.name,
                                    businessPlanId: el.businessPlanId,
                                    year: el.year,
                                  });
                                }}
                              />
                            ) : null}
                          </Td>
                          <Td>{i}</Td>
                          <Td>{el.name}</Td>
                          <Td>{el.costMonth}</Td>
                          <Td>{el.costYear}</Td>
                          {/* <Td>
                            <Button size="sm">Додати</Button>
                          </Td> */}
                          <Td>
                            {!el.isDefault ? (
                              <MyDeleteIcon
                                onClick={() => {
                                  setDeleteData({
                                    func: () => {
                                      setDeleteData((prev) => ({
                                        ...prev,
                                        isOpen: false,
                                      }));
                                      deleteOutcomeForBusiness(business, {
                                        busId: myBusiness.id!,
                                        id: el.id!,
                                      });
                                    },
                                    isOpen: true,
                                    text: "витрату",
                                  });
                                }}
                              />
                            ) : null}
                          </Td>
                        </Tr>
                      ))
                    );
                    const yearAmount = +outcomes.reduce(
                      (p, c) => p + (c.costYear || 0),
                      0
                    );
                    sum += yearAmount;
                    res.push(
                      <Tr key={i} fontWeight={"bold"}>
                        <Td>
                          <MyAddIcon
                            onClick={() => {
                              setOpen(true);
                              setRes({
                                costMonth: "",
                                date: i + "-01-01",
                                group: "Загально виробничі",
                                name: "",
                                businessPlanId: myBusiness.id!,
                                year: i - start,
                              });
                            }}
                          />
                        </Td>
                        <Td>{i}</Td>
                        <Td>Разом:</Td>
                        <Td></Td>
                        <Td>{yearAmount.toFixed(2)}</Td>
                        <Td></Td>
                        <Td></Td>
                      </Tr>
                    );
                  }
                  res.push(
                    <Tr key={end + 1} fontWeight={"bold"}>
                      <Td></Td>
                      <Td colSpan={2}>ВСЕ РАЗОМ:</Td>
                      <Td></Td>
                      <Td>{sum}</Td>
                      <Td></Td>
                      <Td></Td>
                    </Tr>
                  );
                  return res;
                })()}
              </Tbody>
            </Table>
          </MyTableContainer>
        </AccordionPanel>
      </AccordionItem>
      {open && <CreateOutcome open={open} setOpen={setOpen} data={res!} />}
      {deleteData.isOpen ? (
        <DeleteAlert
          isOpen={deleteData.isOpen}
          func={deleteData.func}
          setOpen={setDeleteData}
          text={deleteData.text}
        />
      ) : null}
    </>
  );
}

export default React.memo(OutcomeBusTable);
