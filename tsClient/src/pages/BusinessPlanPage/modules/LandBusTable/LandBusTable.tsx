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
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import DeleteAlert, { DeleteProps } from "src/components/DeleteAlert";
import { deleteLandForBusiness } from "src/http/requests";
import { Context } from "src/main";
import CreateLand from "src/modules/CreateLand";
import { CreateLandProps } from "src/modules/CreateLand/CreateLand";
import getYearFromString from "src/shared/funcs/getYearFromString";
import BusHeading from "src/ui/BusHeading";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyAccordionButton from "src/ui/MyAccordionButton";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
type LandProps = {
  start: number;
  end: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<any>>;
  setDeleteData: Dispatch<SetStateAction<DeleteProps>>;
  myBusiness: resBusinessPlan;
};
function LandTable({
  end,
  start,
  setData,
  setDeleteData,
  setOpen,
  myBusiness,
}: LandProps) {
  const { business } = useContext(Context);
  return (
    <MyTableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Рік</Th>
            <Th>Права</Th>
            <Th>Кадастровий номер</Th>
            <Th>Площа</Th>
            <Th>Ставка</Th>
            <Th>Плата за землю</Th>
            <Th>Власність</Th>
            <Th>Налаштування</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const lands = myBusiness.lands.filter(
                (el) => getYearFromString(el.date) == i
              );
              res.push(
                lands.map((el) => (
                  <Tr key={el.id!}>
                    <Td>
                      <MyEditIcon
                        onClick={() => {
                          setOpen(true);
                          setData({
                            area: el.area,
                            cadastreNumber: el.cadastreNumber,
                            date: el.date,
                            name: el.name,
                            rightOfUse: el.rightOfUse as any,
                            businessPlanId: el.businessPlanId!,
                            landId: el.id!,
                            ownership: el.ownership,
                            rate: el.rate,
                          });
                        }}
                      />
                    </Td>
                    <Td>{i}</Td>
                    <Td>{el.rightOfUse}</Td>
                    <Td>{+el.cadastreNumber! || "Не вказано"}</Td>
                    <Td>{el.area}</Td>
                    <Td>{el.rate}</Td>
                    <Td>{el.area * el.rate}</Td>
                    <Td>{el.ownership}</Td>
                    <Td>
                      <Button size={"sm"}>Додати</Button>
                    </Td>
                    <Td>
                      <MyDeleteIcon
                        onClick={() =>
                          setDeleteData({
                            func: () => {
                              setDeleteData((prev) => ({
                                ...prev,
                                isOpen: false,
                              }));
                              deleteLandForBusiness(business, {
                                busId: myBusiness.id!,
                                id: el.id!,
                              });
                            },
                            isOpen: true,
                            text: "земельну ділянку",
                          })
                        }
                      />
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
                        setData({
                          area: "",
                          cadastreNumber: "",
                          date: i + "-01-01",
                          name: "",
                          businessPlanId: myBusiness.id,
                          rightOfUse: "",
                          ownership: "",
                          rate: "",
                        });
                      }}
                    />
                  </Td>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td></Td>
                  <Td>{lands.reduce((p, c) => p + c.area, 0)}</Td>
                  <Td></Td>
                  <Td>{lands.reduce((p, c) => p + c.area * c.rate, 0)}</Td>
                </Tr>
              );
            }
            return res;
          })()}
        </Tbody>
      </Table>
    </MyTableContainer>
  );
}
const MemoedLandTable = React.memo(LandTable);
function LandBusTable({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan;
  end: number;
  start: number;
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<CreateLandProps>({
    area: "",
    enterpriseId: 0,
    name: "",
    date: "",
    rightOfUse: "",
    ownership: "",
    rate: "",
  });

  const [deleteData, setDeleteData] = useState<DeleteProps>({
    func: () => {},
    isOpen: false,
    text: "земельну ділянку",
  });
  const businessData = useMemo(
    () => myBusiness,
    [myBusiness.id, JSON.stringify(myBusiness.lands)]
  );
  return (
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Земельні ділянки</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
        <MemoedLandTable
          end={end}
          start={start}
          setData={setData}
          setDeleteData={setDeleteData}
          setOpen={setOpen}
          myBusiness={businessData}
        />
        {open ? <CreateLand data={data} open={open} setOpen={setOpen} /> : null}
        {deleteData?.isOpen ? (
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

export default React.memo(LandBusTable);
