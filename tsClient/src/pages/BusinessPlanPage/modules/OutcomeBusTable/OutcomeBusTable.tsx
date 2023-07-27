import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import DeleteAlert, { DeleteProps } from "src/components/DeleteAlert";
import { deleteOutcomeForBusiness } from "src/http/requests";
import { Context } from "src/main";
import getYearFromString from "src/shared/funcs/getYearFromString";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyHeading from "src/ui/MyHeading";
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
      <MyHeading>Витрати постійні</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Рік</Th>
              <Th>Сатті витрат</Th>
              <Th>Сума в місяць</Th>
              <Th>Сума за рік</Th>
              <Th>Налаштування</Th>
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
                    getYearFromString(el.date) == i && el.group == "Постійні"
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
                              });
                            }}
                          />
                        ) : null}
                      </Td>
                      <Td>{getYearFromString(el.date)}</Td>
                      <Td>{el.name}</Td>
                      <Td>{el.costMonth}</Td>
                      <Td>{el.costYear}</Td>
                      <Td>
                        <Button size="sm">Додати</Button>
                      </Td>
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
                          });
                        }}
                      />
                    </Td>
                    <Td>{i}</Td>
                    <Td>Разом:</Td>
                    <Td></Td>
                    <Td>{yearAmount}</Td>
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
      <MyHeading>Витрати загальновиробничі</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Рік</Th>
              <Th>Сатті витрат</Th>
              <Th>Сума в місяць</Th>
              <Th>Сума за рік</Th>
              <Th>Налаштування</Th>
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
                    getYearFromString(el.date) == i &&
                    el.group == "Загально виробничі"
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
                              });
                            }}
                          />
                        ) : null}
                      </Td>
                      <Td>{getYearFromString(el.date)}</Td>
                      <Td>{el.name}</Td>
                      <Td>{el.costMonth}</Td>
                      <Td>{el.costYear}</Td>
                      <Td>
                        <Button size="sm">Додати</Button>
                      </Td>
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
                          });
                        }}
                      />
                    </Td>
                    <Td>{i}</Td>
                    <Td>Разом:</Td>
                    <Td></Td>
                    <Td>{yearAmount}</Td>
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

export default OutcomeBusTable;
